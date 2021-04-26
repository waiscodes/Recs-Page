import React, { useRef, useState, useCallback } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { db } from "../fire";
import debounce from "lodash.debounce";
import { useHistory } from "react-router";
import "../css/Recommend.css";

const RecommendPage = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const recRef = useRef();
  const reasonRef = useRef();
  const [result, setResult] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [selectBook, setSelectBook] = useState(false);
  const [highlightedBook, setHighlightedBook] = useState(false);
  const [error, setError] = useState("");
  const history = useHistory();
  // const [border, setBorder] = useState(false);

  const pickBook = (e) => {
    setShowForm(true);
    setTitle(e.target.attributes.getNamedItem("data-title").value);
    if (e.target.attributes.getNamedItem("data-authors")) {
      setAuthor(e.target.attributes.getNamedItem("data-authors").value);
    } else {
      setAuthor("Unknown");
    }
    setThumbnail(e.target.attributes.getNamedItem("data-thumbnail").value);

    // e.target.classList.toggle("picked-book");
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
      setAuthor(false);
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
          setAuthor(false);
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

  const highlightCSS = {
    border: "solid rgba(255, 0, 0, 0.534) 2px",
    borderRadius: "3px",
  };

  return (
    <>
      <Container>
        {selectBook && (
          <div>
            <p>Select book</p>
            {author && (
              <Alert variant='success'>
                Selected: {title} by {author}
              </Alert>
            )}
          </div>
        )}
        <div className='books-result d-flex'>
          {result &&
            result.map((book) => (
              <div
                key={book.id}
                onClick={() => setHighlightedBook(book.id)}
                style={highlightedBook === book.id ? highlightCSS : null}
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
                  id='recommender'
                  autoFocus
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
