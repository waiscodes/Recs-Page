import React from "react";
import { CloseButton } from "react-bootstrap";
import { likeThisBook } from "../../utilities/PostBooks";
import { useAuth } from "../../contexts/AuthContext";

const BookDetails = ({ book, close }) => {
  const { currentUser } = useAuth();
  const likeBook = (e) => {
    likeThisBook(book, currentUser.uid);
  };

  const takeBook = () => {
    console.log("book added to your TBR");
  };
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
            <i className='fas fa-book' onClick={takeBook}></i>
            <i className='far fa-heart' onClick={likeBook}></i>
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
