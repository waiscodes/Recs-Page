import React, { useState } from "react";
import { db } from "../fire";
import { Card, CloseButton } from "react-bootstrap";
import BookDetails from "./BookDetails.jsx";
import BookPreview from "./BookPreview.jsx";
import "../css/Book.css";

const Book = (props) => {
  const book = props.bookObj;
  const [bookSelected, setBookSelected] = useState();
  const [bookLiked, setBookLiked] = useState(true);

  const likeBook = (bookId, bookRating) => {
    setBookLiked(!bookLiked);
    if (isNaN(bookRating)) {
      bookRating = 0;
    }
    if (bookRating <= 0) {
      setBookLiked(true);
    }
    db.collection("books")
      .doc(bookId)
      .update({
        upvotes: bookLiked ? bookRating + 1 : bookRating - 1,
      });
  };

  const closeDetails = () => {
    setBookSelected(null);
  };

  const selected = {
    width: "400px",
    // display: "flex",
    // flexDirection: "row",
  };
  return (
    <>
      <Card
        className='ind-book'
        style={bookSelected === book.id ? selected : null}
        onDoubleClick={() => likeBook(book.id, book.upvotes)}
      >
        <BookPreview book={book} />

        {bookSelected === book.id ? (
          <BookDetails book={book} close={closeDetails} />
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Book;
