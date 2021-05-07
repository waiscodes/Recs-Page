import React, { useRef, useState, useCallback, useEffect } from "react";
import { Card, Form, Button, Alert, ProgressBar } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import debounce from "lodash.debounce";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";

const EditProfile = () => {
  const usernameRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const aviRef = useRef();
  const [user, setUser] = useState();
  const [avi, setAvi] = useState();
  const [progress, setProgress] = useState(false);
  const [aviLink, setAviLink] = useState();
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        setUser(snap.data());
      });
  };

  const updateWithAvi = (aviURL) => {
    const name = nameRef.current.value || user.name;
    const username = usernameRef.current.value.toLowerCase() || user.username;
    const bio = bioRef.current.value || user.bio;

    db.collection("users")
      .doc(currentUser.uid)
      .update({
        name: name,
        username: username,
        bio: bio,
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
    const name = nameRef.current.value || user.name;
    const username = usernameRef.current.value.toLowerCase() || user.username;
    const bio = bioRef.current.value || user.bio;

    db.collection("users")
      .doc(currentUser.uid)
      .update({
        name: name,
        username: username,
        bio: bio,
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
          if (
            snap.docs &&
            snap.docs[0].data() &&
            snap.docs[0].data().uid !== currentUser.uid
          ) {
            setError("username is already taken. Please pick a different one");
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
    } else if (e.target.value?.includes(" ")) {
      setError("This must not contain any spaces");
    } else {
      setError(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!error) {
      if (avi) {
        const storageRef = storage
          .ref("users/" + currentUser.uid + "/" + "Avi")
          .put(avi);

        storageRef.on(
          "state_changed",
          (snapshot) => {
            let percentage =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(percentage);
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
          <h2>Edit Profile</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Display Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                defaultValue={user?.name}
                autoComplete='cc-name'
                ref={nameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                ref={usernameRef}
                defaultValue={user?.username}
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
            {progress && (
              <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
            )}
            <Button type='Submit' disabled={loading}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default EditProfile;
