import React, { useState } from "react";
import { db } from "../fire";
import { Card, CloseButton } from "react-bootstrap";
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
        <div className='img-div'>
          <img
            src={book.thumbnail}
            alt=''
            onClick={() => setBookSelected(book.id)}
          />
        </div>
        {bookSelected === book.id ? (
          ""
        ) : (
          <div className='ind-book-desc'>
            <p>
              {book.title.length > 30
                ? book.title.substr(0, 25) + "..."
                : book.title}
            </p>
            <p className='recBy text-muted'>
              Rec by{" "}
              {book.recBy.length > 10
                ? book.recBy.substr(0, 10) + "..."
                : book.recBy}
            </p>
          </div>
        )}
        {bookSelected === book.id ? (
          <div className='book-desc'>
            <CloseButton onClick={() => setBookSelected(null)}>
              Close
            </CloseButton>
            <h4>{book.title}</h4>
            <p>
              <span className='desc'>Author: </span>
              {book.author}
            </p>
            <p>
              <span className='desc'>Rec by: </span>
              {book.recBy}
            </p>
            <p>
              <span className='desc'>Reason: </span>
              {book.reason}
            </p>
            <p>
              <span className='desc'>Upvotes: </span>
              {isNaN(book?.rating) ? 0 : book?.rating}{" "}
              <span className='double-tap'>Double Tap to Like</span>
            </p>
          </div>
        ) : (
          ""
        )}
      </Card>
    </>
  );
};

export default Book;
