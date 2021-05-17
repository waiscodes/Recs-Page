import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;
  const [bookSelected, setBookSelected] = useState(null);

  const closeDetails = () => {
    // TODO:Fix close button problem because apparently this doesn't work.
    setBookSelected(null);
  };

  const selectBook = (bookId) => {
    setBookSelected(bookId);
  };

  return (
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
  );
};

export default BookMap;
