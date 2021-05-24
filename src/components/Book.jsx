import React from "react";
import { Card } from "react-bootstrap";
import BookPreview from "./BookPreview.jsx";
import "../css/Book.css";

const Book = ({ book, show }) => {
  return (
    <>
      <Card className='ind-book'>
        <BookPreview book={book} show={show} />
      </Card>
    </>
  );
};

export default Book;
