import React from "react";

const BookPreview = ({ book }) => {
  return (
    <>
      <div className='thumbnail-container'>
        <img src={book?.thumbnail} alt={book?.title} className='thumbnail' />
      </div>
      <div className='ind-book-desc'>
        {/* <p>
          {book?.title.length > 30
            ? book?.title.substr(0, 25) + "..."
            : book?.title}
        </p>
        <p className='recBy text-muted'>
          Rec by{" "}
          {book?.recBy.length > 10
            ? book?.recBy.substr(0, 10) + "..."
            : book?.recBy}
        </p> */}
      </div>
    </>
  );
};

export default BookPreview;
