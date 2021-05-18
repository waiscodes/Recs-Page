import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";
import DisplayModal from "./DisplayModal";

const BookMap = (props) => {
  const books = props.books;
  const [showModal, setShowModal] = useState(false);
  const [displayBook, setDisplayBook] = useState(null);

  const handleClose = () => {
    setShowModal(null);
  };

  const handleShow = (bookId) => {
    const book = books.filter((book) => {
      return book.id === bookId;
    });
    setDisplayBook(book[0]);
    setShowModal(true);
  };

  return (
    <>
      <DisplayModal
        show={showModal}
        displayBook={displayBook}
        handleShow={handleShow}
        handleClose={handleClose}
      />
      <Container className='book-map'>
        {books?.map((book) => (
          <Book key={book.id} book={book} show={handleShow} className='book' />
        ))}
      </Container>
    </>
  );
};

export default BookMap;
