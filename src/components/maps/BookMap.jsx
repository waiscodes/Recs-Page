import React, { useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import Book from "../books/Book";
import "../../css/BookMap.css";
import DisplayModal from "../DisplayModal";
import BookDetails from "../books/BookDetails";

const BookMap = ({ books, isBookFinished, children }) => {
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
      {!books && (
        <div className='spinner'>
          <Spinner animation='border' />
        </div>
      )}

      {/* This is the recommend component coming from profilePage && dashboard */}
      {children}

      <DisplayModal show={showModal} handleClose={handleClose}>
        <BookDetails
          book={displayBook}
          close={handleClose}
          isBookFinished={isBookFinished}
        />
      </DisplayModal>

      <h6>
        {/* { months && months.map((book) => monthNames[book.createdAt.toDate().getMonth()])} */}
      </h6>
      <Container className='book-map'>
        {books?.map((book) => (
          <Book key={book?.id} book={book} show={handleShow} className='book' />
        ))}
      </Container>
    </>
  );
};

export default BookMap;
