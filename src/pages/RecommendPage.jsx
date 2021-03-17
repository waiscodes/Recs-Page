import React, { useRef, useState } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { db } from "../fire";

const RecommendPage = () => {
  const [title, setTitle] = useState();
  const [book, setBook] = useState();
  const recRef = useRef();
  const reasonRef = useRef();
  const [result, setResult] = useState([]);

  const pickBook = (e) => {
    setTitle(e.target.attributes.getNamedItem("data-book").value);
    setBook(e.target.attributes.getNamedItem("data-book").value);
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
    axios
      .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
      .then((res) => {
        setResult(res.data.items.slice(0, 3));
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    db.collection("book").add({
      title: title,
      book: book,
      recBy: recRef,
      reason: reasonRef,
    });
  };

  return (
    <>
      <Container>
        <div className='d-flex'>
          {result.map((book) => (
            <div
              className='m-1'
              key={
                book.volumeInfo.imageLinks &&
                book.volumeInfo.imageLinks.thumbnail
              }
            >
              <img
                src={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
                alt=''
                data-book={book.volumeInfo.title}
                onClick={pickBook}
              />
            </div>
          ))}
        </div>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Title'
              onChange={handleChange}
              value={title}
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
