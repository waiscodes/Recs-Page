import React from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;

  return (
    <Container className='book-map'>
      {books?.map((book) => (
        <Book key={book.id} bookObj={book} />
      ))}
    </Container>
  );
};

export default BookMap;
