import React, { useRef, useState } from "react";
import { Container, Form } from "react-bootstrap";

const AddBook = () => {
  const [title, setTitle] = useState();
  const recRef = useRef();
  const reasonRef = useRef();

  const handleChange = (e) => {
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Container>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control type='text' onChange={handleChange} />
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
