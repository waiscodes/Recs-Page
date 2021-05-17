import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;
  const [bookSelected, setBookSelected] = useState();

  const selectBook = (bookId) => {
    console.log(bookId);
  };

  const closeDetails = (bookId) => {
    console.log(bookId);
  };

  return (
    <Container className='book-map'>
      {books?.map((book) => (
        <Book
          key={book.id}
          book={book}
          selectBook={selectBook}
          closeDetails={closeDetails}
          className='book'
        />
      ))}
    </Container>
  );
};

export default BookMap;
