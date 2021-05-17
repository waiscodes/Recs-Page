import React, { useState } from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;
  const [bookSelected, setBookSelected] = useState();

  const selectBook = (param) => {
    console.log(param);
  };

  return (
    <Container className='book-map'>
      {books?.map((book) => (
        <Book key={book.id} book={book} click={selectBook} className='book' />
      ))}
    </Container>
  );
};

export default BookMap;
