import React from "react";
import { CloseButton } from "react-bootstrap";

const BookDetails = ({ book, close }) => {
  return (
    <>
      <div className='book-desc'>
        <CloseButton onClick={close}>Close</CloseButton>
        <h4>{book?.title}</h4>
        <p>
          <span className='desc'>Author: </span>
          {book?.author}
        </p>
        <p>
          <span className='desc'>Rec by: </span>
          {book?.recBy}
        </p>
        <p>
          <span className='desc'>Reason: </span>
          {book?.reason}
        </p>
        <p>
          <span className='desc'>Upvotes: </span>
          {isNaN(book?.rating) ? 0 : book?.rating}{" "}
          {/* <span className='double-tap'>Double Tap to Like</span> */}
        </p>
      </div>
    </>
  );
};

export default BookDetails;
