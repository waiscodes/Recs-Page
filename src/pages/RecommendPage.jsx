import React, { useRef, useState, useCallback } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { db } from "../fire";
import debounce from "lodash.debounce";
import { useHistory } from "react-router";

const RecommendPage = () => {
  const [title, setTitle] = useState();
  const [author, setAuthor] = useState();
  const [thumbnail, setThumbnail] = useState();
  const recRef = useRef();
  const reasonRef = useRef();
  const [result, setResult] = useState([]);
  const [error, setError] = useState("");
  const history = useHistory();

  const pickBook = (e) => {
    setTitle(e.target.attributes.getNamedItem("data-title").value);
    setAuthor(e.target.attributes.getNamedItem("data-authors").value);
    setThumbnail(e.target.attributes.getNamedItem("data-thumbnail").value);
  };

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounce((title) => {
      axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=${title}`)
        .then((res) => {
          setResult(res.data.items.slice(0, 3));
        });
    }, 1000),
    []
  );

  const handleChange = (e) => {
    setTitle(e.target.value);
    debounceSearch(e.target.value);
  };

  const addToFirestore = () => {
    try {
      db.collection("books").add({
        title: title,
        author: author,
        thumbnail: thumbnail,
        recBy: recRef.current.value,
        reason: reasonRef.current.value,
      });
      history.goBack();
    } catch {
      setError("Failed to add book");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToFirestore();
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
                data-title={book.volumeInfo.title}
                data-authors={book.volumeInfo.authors}
                data-thumbnail={
                  book.volumeInfo.imageLinks &&
                  book.volumeInfo.imageLinks.thumbnail
                }
                onClick={pickBook}
              />
            </div>
          ))}
        </div>
        {error && <Alert variant='danger'>{error}</Alert>}
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