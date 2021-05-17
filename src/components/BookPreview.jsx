import React from "react";

const BookPreview = ({ book, open }) => {
  return (
    <>
      <div className='thumbnail-container'>
        <img
          src={book?.thumbnail}
          onClick={() => {
            open(book?.id);
          }}
          alt={book?.title}
          className='thumbnail'
        />
      </div>
    </>
  );
};

export default BookPreview;
