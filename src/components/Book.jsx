import React, { useState } from "react";
import { db } from "../fire";
import { Card } from "react-bootstrap";
import BookDetails from "./BookDetails.jsx";
import BookPreview from "./BookPreview.jsx";
import "../css/Book.css";

const Book = ({ book, click }) => {
  const closeDetails = () => {
    // setBookSelected(null);
  };

  return (
    <>
      <Card className='ind-book' onClick={click}>
        <BookPreview book={book} />
        <BookDetails book={book} close={closeDetails} />
      </Card>
    </>
  );
};

export default Book;
