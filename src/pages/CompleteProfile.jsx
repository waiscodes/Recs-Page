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
  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const addToFirestore = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .update({
        username: username.current.value,
        bio: bioRef.current.value,
        avi: aviRef.current.value,
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
      console.log(username);
    }, 500),
    []
  );

  const handleChange = (e) => {
    const longEnough = e.target.value.length > 4;

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
    addToFirestore();

    storage
      .ref("users/" + currentUser.uid + "/" + "Avi")
      .put(avi)
      .then((res) => console.log(res))
      .catch((error) => console.log(error));
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
            <Button type='Submit' disabled={loading}>
              Update Profile
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompleteProfile;
