import React, { useRef, useState } from "react";
import { Container, Form, Button, Card } from "react-bootstrap";
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
        setResult(res.data.items.slice(0, 3));
      });
  };

  return (
    <>
      <Container>
        <div>
          {result.map((book) => (
            <img
              src={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
              key={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
              alt=''
              data-book={book.volumeInfo.title}
            />
          ))}
        </div>
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
          <Button type='submit'>Submit</Button>
        </Form>
      </Container>
    </>
  );
};

export default RecommendPage;
