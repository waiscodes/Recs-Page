import React, { useState } from "react";
import { db } from "../fire";
import { Card } from "react-bootstrap";
import BookDetails from "./BookDetails.jsx";
import BookPreview from "./BookPreview.jsx";
import "../css/Book.css";

const Book = ({ book, selectBook, closeDetails, bookSelected }) => {
  return (
    <>
      <Card className='ind-book'>
        {bookSelected == book?.id ? (
          <BookDetails book={book} close={closeDetails} />
        ) : (
          <BookPreview book={book} open={selectBook} />
        )}
      </Card>
    </>
  );
};

export default Book;
