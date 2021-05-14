import React from "react";
import { Container } from "react-bootstrap";
import Book from "./Book";
import "../css/BookMap.css";

const BookMap = (props) => {
  const books = props.books;

  return (
    <Container className='book-map'>
      {books?.map((book) => (
        <div key={book.id} className='grid-item'>
          <Book key={book.id} bookObj={book} className='grid-item' />
        </div>
      ))}
    </Container>
  );
};

export default BookMap;
