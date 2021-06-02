import React from "react";

const BookPreview = ({ book, show }) => {
  return (
    <>
      <div className='thumbnail-container'>
        <img
          src={book?.thumbnail}
          onClick={() => {
            show(book?.id);
          }}
          alt={book?.title}
          className='thumbnail'
        />
      </div>
    </>
  );
};

export default BookPreview;
