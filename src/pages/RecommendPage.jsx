import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

const RecommendPage = () => {
  const [title, setTitle] = useState();
  const recRef = useRef();
  const reasonRef = useRef();
  const [result, setResult] = useState([]);

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then((res) => {
        console.log(res.data.items.slice(0, 3));
      });
  };

  return (
    <>
      <Modal.Dialog className='bootstrap-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Title'
                  onChange={handleChange}
                />
                <Form.Text className='text-muted'>
                  Search and Click on Thumbnail
                </Form.Text>
              </Form.Group>
              <Form.Group>
                <Form.Label>Recommender</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Who recommended it?'
                  ref={recRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Reason</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Reason. Why should I read read it'
                  ref={reasonRef}
                />
              </Form.Group>
            </Form>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary'>Close</Button>
          <Button variant='primary'>Add Rec</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default RecommendPage;
