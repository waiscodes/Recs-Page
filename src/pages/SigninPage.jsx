import React from "react";
import { Card, Form, Button } from "react-bootstrap";

const SigninPage = () => {
  return (
    <>
      <Card>
        <Card className='body'>
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
              <Form.Label className='d-none'>Password</Form.Label>
              <Form.Control
                type='password'
                autoComplete='new-password'
                placeholder='Password'
                required
              />
            </Form.Group>
            <Button type='Submit'>Sign In</Button>
          </Form>
        </Card>
      </Card>
    </>
  );
};

export default SigninPage;
