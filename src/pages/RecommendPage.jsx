import React, { useRef, useState, useCallback } from "react";
import { Container, Form, Button } from "react-bootstrap";
import axios from "axios";
import { db } from "../fire";
import debounce from "lodash.debounce";
import { useHistory } from "react-router";
import "../css/Recommend.css";

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
  // const [border, setBorder] = useState(false);

  const pickBook = (e) => {
    setShowForm(true);
    setTitle(e.target.attributes.getNamedItem("data-title").value);
    setAuthor(e.target.attributes.getNamedItem("data-authors").value);
    setThumbnail(e.target.attributes.getNamedItem("data-thumbnail").value);
    // setBorder(!border);
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
    if (e.target.value.length < 1) {
      setSelectBook(false);
      setResult([]);
    }

    setTitle(e.target.value);
    debounceSearch(e.target.value);
  };

  const addToFirestore = () => {
    try {
      db.collection("books")
        .add({
          title: title,
          author: author,
          thumbnail: thumbnail,
          recBy: recRef.current.value,
          reason: reasonRef.current.value,
          rating: 0,
          uid: props.uid,
          // createdAt: serverTimestamp(),
        })
        .then(() => {
          console.log("success");
          setShowForm(false);
          setSelectBook(false);
          setResult(false);
        });
    } catch {
      console.log("Failed to add book");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addToFirestore();
    setTitle("");
  };

  return (
    <>
      <Container>
        {selectBook && <p>Select book</p>}
        <div className='d-flex'>
          {result &&
            result.map((book) => (
              <div
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
                  // className={border ? "selected-book" : ""}
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
              placeholder='Add Book Recommendation'
              onChange={handleChange}
              value={title}
              required
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
                  required
                />
              </Form.Group>
              <Form.Group>
                <Form.Label className='d-none'>Reason</Form.Label>
                <Form.Control
                  as='textarea'
                  rows={3}
                  placeholder='Reason. Why should I read read it'
                  ref={reasonRef}
                  required
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
