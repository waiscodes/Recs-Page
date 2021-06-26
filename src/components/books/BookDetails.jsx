import React, { useState, useEffect } from "react";
import { CloseButton } from "react-bootstrap";
import {
  likeThisBook,
  grabThisRec,
  addToFinishedList,
  deleteThisRec,
} from "../../utilities/PostBooks";
import { db } from "../../fire";
import { useAuth } from "../../contexts/AuthContext";

const BookDetails = ({ book, close }) => {
  const { currentUser } = useAuth();
  const [isBookLiked, setIsBookLiked] = useState(false);

  useEffect(() => {
    checkIfBookIsLiked();
    // eslint-disable-next-line
  }, []);

  const checkIfBookIsLiked = () => {
    const likeId = book.id + currentUser.uid;

    db.collection("likes")
      .doc(likeId)
      .get()
      .then((snap) => {
        if (snap.data()) {
          setIsBookLiked(true);
        } else {
          setIsBookLiked(false);
        }
      });
  };

  const likeBook = () => {
    // check if book is already liked or not
    if (isBookLiked) {
      // Unlike this book
    } else {
      likeThisBook(book, currentUser.uid);
    }
  };

  const grabRec = () => {
    grabThisRec(book, currentUser.uid);
  };

  const finishedBook = () => {
    addToFinishedList(book, currentUser.uid);
  };

  const deleteRec = () => {
    deleteThisRec(book);
    close();
  };

  return (
    <>
      <CloseButton onClick={close}>Close</CloseButton>
      <h4 className='book-title'>{book?.title}</h4>
      <div className='book-detail' onDoubleClick={likeBook}>
        <div className='thumbnail-div'>
          <img src={book?.thumbnail} alt='' />
          <div className='icons'>
            {!book?.userId && (
              <div className='icon' onClick={grabRec}>
                <i className='far fa-hand-rock'></i>
                <p className='text-muted'>Grab</p>
              </div>
            )}
            <div className='icon' onClick={likeBook}>
              {isBookLiked ? (
                <i className='fas fa-heart'></i>
              ) : (
                <i className='far fa-heart'></i>
              )}
              <span> {book?.upvotes}</span>
              <p className='text-muted'>Like</p>
            </div>
            {book?.userId && (
              <div className='icon' onClick={finishedBook}>
                <i className='far fa-check-square'></i>
                <p className='text-muted'>Done</p>
              </div>
            )}
            {book?.userId && (
              <div className='icon' onClick={deleteRec}>
                <i className='far fa-trash-alt'></i>
                <p className='text-muted'>Delete</p>
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
        </div>
      </div>
    </>
  );
};

export default BookDetails;
