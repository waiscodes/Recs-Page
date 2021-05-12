import React from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";

const BookMap = (props) => {
  const books = props.books;

  return (
    <Container className='d-flex flex-wrap'>
      {books?.map((book) => (
        <Book key={book.id} bookObj={book} />
      ))}
    </Container>
  );
};

export default BookMap;
