import React, { useState } from "react";
import { Container, Modal, Button } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;
  const [bookSelected, setBookSelected] = useState();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeDetails = () => {
    setBookSelected(null);
  };

  const selectBook = (bookId) => {
    setBookSelected(bookId);
  };

  return (
    <>
      <div>
        <Button variant='primary' onClick={handleShow}>
          Launch demo modal
        </Button>
        <Modal show={show} onHide={handleClose} animation={false}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={handleClose}>
              Close
            </Button>
            <Button variant='primary' onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <Container className='book-map'>
        {books?.map((book) => (
          <Book
            key={book.id}
            book={book}
            bookSelected={bookSelected}
            selectBook={selectBook}
            closeDetails={closeDetails}
            className='book'
          />
        ))}
      </Container>
    </>
  );
};

export default BookMap;
