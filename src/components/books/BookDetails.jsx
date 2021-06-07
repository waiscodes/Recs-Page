import React from "react";
import { CloseButton } from "react-bootstrap";

const BookDetails = ({ book, close }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <>
      <CloseButton onClick={close}>Close</CloseButton>
      <h4 className='book-title'>{book?.title}</h4>
      <div className='book-detail'>
        <div className='thumbnail-div'>
          <img src={book?.thumbnail} alt='' />
          <div className='icons'>
            <i className='fas fa-book'></i>
            <i className='far fa-heart'></i>
          </div>
        </div>
        <div className='book-desc'>
          <p>
            <span className='text-muted'>by: </span>
            {book?.author}
          </p>
          <p>
            <span className='text-muted'>Rec from: </span>
            {book?.recBy}
          </p>
          <p>
            <span className='text-muted'>Reason: </span>
            {book?.reason}
          </p>
          <p>{months[book?.createdAt.toDate().getMonth()]}</p>
        </div>
      </div>
    </>
  );
};

export default BookDetails;
