import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const SignupPage = () => {
  const emailRef = useRef();
  const nameRef = useRef();
  const usernameRef = useRef();
  const passwordRef = useRef();
  const conPasswordRef = useRef();
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(emailRef.current.value, passwordRef.current.value);
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2>Sign in</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label className='d-none'>Email</Form.Label>
              <Form.Control
                type='email'
                autoComplete='username'
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
                required
                ref={nameRef}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control
                type='text'
                placeholder='Username'
                autoComplete='username'
                required
                ref={usernameRef}
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
            <Button type='Submit'>Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>Have an account? Sign In</Card.Body>
      </Card>
    </>
  );
};

export default SignupPage;
