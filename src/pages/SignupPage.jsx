import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const SignupPage = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <h2>Sign in</h2>
          <Form>
            <Form.Group>
              <Form.Label className='d-none'>Email</Form.Label>
              <Form.Control
                type='email'
                autoComplete='username'
                placeholder='Email'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Full Name</Form.Label>
              <Form.Control type='text' placeholder='Full Name' required />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Username</Form.Label>
              <Form.Control type='text' placeholder='Username' required />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Password'
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className='d-none'>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Confirm Password'
                required
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
