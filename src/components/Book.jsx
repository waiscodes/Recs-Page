import React, { useState } from "react";
import { db } from "../fire";
import { Card } from "react-bootstrap";
import BookDetails from "./BookDetails.jsx";
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
