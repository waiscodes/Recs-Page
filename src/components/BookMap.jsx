import React, { useState, useEffect } from "react";
import { db } from "../fire";
import { Card, Button, Container, CloseButton } from "react-bootstrap";

const BookMap = (props) => {
  const books = props.books;
  const [bookSelected, setBookSelected] = useState();

  const likeBook = (bookId, bookRating) => {
    db.collection("books")
      .doc(bookId)
      .update({
        rating: bookRating + 1,
      });
  };

  const selected = {
    width: "400px",
    display: "flex",
    flexDirection: "row",
  };

  return (
    <>
      {books &&
        books.map((book) => (
          <Card
            key={book.id}
            className='ind-book'
            style={bookSelected === book.id ? selected : null}
            onDoubleClick={() => likeBook(book.id, book.rating)}
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
                    ? book.title.substr(0, 30) + "..."
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
                  <span className='desc'>Rating: </span>
                  {book?.rating}{" "}
                  <span className='double-tap'>Double Tap to Like</span>
                </p>
              </div>
            ) : (
              ""
            )}
          </Card>
        ))}
    </>
  );
};

export default BookMap;
