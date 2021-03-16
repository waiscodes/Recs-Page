import React from "react";
import { Container, Form, Input } from "react-bootstrap";

const AddBook = () => {
  return (
    <>
      <Container>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' />
            <Form.Text className='text-muted'>
              Search and Click on Thumbnail
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Recommender</Form.Label>
            <Form.Control type='text' placeholder='Who recommended it?' />
          </Form.Group>
          <Form.Group>
            <Form.Label>Reason</Form.Label>
            <Form.Control as='textarea' rows={3} />
          </Form.Group>
        </Form>
      </Container>
    </>
  );
};

export default AddBook;
