import React, { useRef, useState, useCallback } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import debounce from "lodash.debounce";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";

const CompleteProfile = () => {
  const username = useRef();
  const bioRef = useRef();
  const aviRef = useRef();
  const [avi, setAvi] = useState();
  const [aviLink, setAviLink] = useState();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const updateWithAvi = (aviURL) => {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        username: username.current.value.toLowerCase(),
        bio: bioRef.current.value,
        avi: aviURL,
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateWithoutAvi = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        username: username.current.value.toLowerCase(),
        bio: bioRef.current.value,
      })
      .then(() => {
        history.push("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // eslint-disable-next-line
  const debounceUsername = useCallback(
    debounce((username) => {
      db.collection("users")
        .where("username", "==", username)
        .get()
        .then((snap) => {
          if (snap.docs && snap.docs[0].data()) {
            setError("username is already taken");
          }
        })
        .catch(() => {});
    }, 500),
    []
  );

  const handleChange = (e) => {
    const longEnough = e.target.value.length >= 4;

    if (e.target.value && !e.target.value.includes(" ")) {
      setError(false);
      if (longEnough) {
        setError(false);
        debounceUsername(e.target.value);
        // Send error that characters must be over 4. Debounce?
      } else {
        setError("Username must be 4 more of characters");
      }
    } else {
      setError("This must not contain any spaces");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!error) {
      if (avi) {
        const storageRef = storage
          .ref("users/" + currentUser.uid + "/" + "Avi")
          .put(avi);

        storageRef.on(
          "state_changed",
          (snapshot) => {
            let progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
          },
          (error) => {
            console.log(error);
          },
          () => {
            storageRef.snapshot.ref.getDownloadURL().then((aviURL) => {
              updateWithAvi(aviURL);
            });
          }
        );
      } else {
        updateWithoutAvi();
      }
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Complete Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                required
                ref={username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Bio</Form.Label>
              <Form.Control
                as='textarea'
                rows={3}
                placeholder='Add your bio here'
                ref={bioRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className=''>Profile Picture</Form.Label>
              <Form.Control
                type='file'
                rows={3}
                ref={aviRef}
                onChange={(e) => setAvi(e.target.files[0])}
              />
            </Form.Group>
            <Button type='Submit' disabled={error}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompleteProfile;
