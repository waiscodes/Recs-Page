import React from "react";
import { CloseButton, Button } from "react-bootstrap";
import {
  likeThisBook,
  grabThisRec,
  addToFinishedList,
} from "../../utilities/PostBooks";
import { useAuth } from "../../contexts/AuthContext";

const BookDetails = ({ book, close }) => {
  const { currentUser } = useAuth();

  const likeBook = (e) => {
    likeThisBook(book, currentUser.uid);
  };

  const grabRec = () => {
    grabThisRec(book, currentUser.uid);
  };

  const finishedBook = () => {
    addToFinishedList(book, currentUser.uid);
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
            <div className='icon'>
              <i className='far fa-hand-rock' onClick={grabRec}></i>
              <p className='text-muted'>Grab</p>
            </div>
            <div className='icon'>
              <i className='far fa-heart' onClick={likeBook}></i>
              <p className='text-muted'>Like</p>
            </div>
            {book?.userId && (
              <div className='icon'>
                <i className='far fa-check-square' onClick={finishedBook}></i>
                <p className='text-muted'>Done</p>
              </div>
            )}
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
