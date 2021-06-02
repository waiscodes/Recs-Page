import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Book from "../books/Book";
import "../../css/BookMap.css";
import DisplayModal from "../DisplayModal";
import BookDetails from "../books/BookDetails";

const BookMap = ({ books, children }) => {
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

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <>
      {!books && (
        <div className='spinner'>
          <Spinner animation='border' />
        </div>
      )}

      {/* This is the recommend component coming from profilePage && dashboard */}
      {children}

      <DisplayModal show={showModal} handleClose={handleClose}>
        <BookDetails book={displayBook} close={handleClose} />
      </DisplayModal>

      <h5>{months[books && books[0]?.createdAt.toDate().getMonth()]}</h5>
      <Container className='book-map'>
        {books?.map((book) => (
          <Book key={book?.id} book={book} show={handleShow} className='book' />
        ))}
      </Container>
    </>
  );
};

export default BookMap;
