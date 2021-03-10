import React, { useRef } from "react";
import { Card, Form, Button } from "react-bootstrap";

const SigninPage = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(passwordRef.current.value);
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
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Password'
                required
                ref={passwordRef}
              />
            </Form.Group>
            <Button type='Submit'>Sign In</Button>
          </Form>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body>Don't have an account? Sign up</Card.Body>
      </Card>
    </>
  );
};

export default SigninPage;
