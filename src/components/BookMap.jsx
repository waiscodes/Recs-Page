import React from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;

  const bookSelected = () => {
    console.log("soemthing");
  };

  return (
    <Container className='book-map'>
      {books?.map((book) => (
        <Book key={book.id} book={book} click={bookSelected} className='book' />
      ))}
    </Container>
  );
};

export default BookMap;
