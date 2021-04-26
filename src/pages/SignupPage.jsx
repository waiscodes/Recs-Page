import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

const SignupPage = () => {
  const emailRef = useRef();
  const nameRef = useRef();
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

    try {
      setError("");
      setLoading(true);
      await signup(
        nameRef.current.value,
        emailRef.current.value,
        passwordRef.current.value
      );
      setLoading(false);
      history.push("/complete-profile");
    } catch {
      setError("Failed to create account");
      setLoading(false);
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Sign up</h2>
          {error && <Alert variant='danger'>{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Email</Form.Label>
              <Form.Control
                type='email'
                autoComplete='email'
                placeholder='Email'
                required
                ref={emailRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Full Name</Form.Label>
              <Form.Control
                type='text'
                placeholder='Full Name'
                autoComplete='cc-name'
                required
                ref={nameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Password'
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Confirm Password'
                required
                ref={conPasswordRef}
              />
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

export default SignupPage;
