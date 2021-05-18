import React from "react";

const BookDetails = ({ book }) => {
  return (
    <>
      <div className='book-desc'>
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
