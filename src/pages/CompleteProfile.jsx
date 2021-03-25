import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const CompleteProfile = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const bioRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordRef.current.value !== conPasswordRef.current.value) {
      return setError("Passwords do not match");
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
              <Form.Label className='d-none'>Display Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                required
                ref={nameRef}
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
              <Form.Control type='file' rows={3} ref={bioRef} />
            </Form.Group>
            <Button type='Submit' disabled={loading}>
              Sign up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>
          Have an account? <Link to='/signin'>Sign in</Link>
        </Card.Body>
      </Card>
    </>
  );
};

export default CompleteProfile;
