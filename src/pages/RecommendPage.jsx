import React, { useRef, useState, useCallback } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { db } from "../fire";
import debounce from "lodash.debounce";
import { useHistory } from "react-router";

// TODO: Hide book recommendation full form until the book is selected. This will improve the customer experience.

const RecommendPage = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const recRef = useRef();
  const reasonRef = useRef();
  const [result, setResult] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectBook, setSelectBook] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();

  const pickBook = (e) => {
    setShowForm(true);
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
    }, 500),
    []
  );

  const handleChange = (e) => {
    if (e.target.value.length > 1) {
      setSelectBook(true);
    }

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
        rating: 0,
        uid: props.uid,
      });
      console.log("success");
    } catch {
      console.log("Failed to add book");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToFirestore();
  };

  return (
    <>
      <Container>
        {selectBook && <p>Select book</p>}
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
        {/* {error && <Alert variant='danger'>{error}</Alert>} */}
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label className='d-none'>Title</Form.Label>
            <Form.Control
              type='text'
              placeholder='Recommend Book'
              onChange={handleChange}
              value={title}
            />
            {/* <Form.Text className='text-muted'>
              Search and Click on Thumbnail
            </Form.Text> */}
          </Form.Group>
          {showForm && (
            <div>
              <Form.Group>
                <Form.Label className='d-none'>Recommender</Form.Label>
                <Form.Control
                  type='text'
                  placeholder="Who's recommending it?"
                  ref={recRef}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='d-none'>Reason</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Reason. Why should I read read it'
                  ref={reasonRef}
                />
              </Form.Group>
              <Button type='submit'>Submit</Button>
            </div>
          )}
        </Form>
      </Container>
    </>
  );
};

export default RecommendPage;
