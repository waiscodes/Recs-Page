import { db } from "../fire";
import firebase from "firebase";

const recBook = (book) => {
  let upvotes;
  if (book.upvotes) {
    upvotes = book.upvotes;
  } else {
    upvotes = 0;
  }
  try {
    db.collection("books").add({
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      recBy: book.recBy,
      reason: book.reason,
      upvotes: upvotes,
      uid: book.uid,
      createdAt: new Date(),
    });
  } catch (e) {
    console.log(e);
  }
};

const likeThisBook = (
  book,
  currentUser,
  likeId,
  setIsBookLiked,
  setLikesCount
) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  try {
    db.collection("likes")
      .doc(likeId)
      .set({
        bookLiked: book.id,
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        recBy: book.recBy,
        reason: book.reason,
        upvotes: increment,
        uid: book.uid,
        createdAt: new Date(),
        // Liked by section
        likedBy: currentUser,
        likedOn: new Date(),
      })
      .then(() => {
        setIsBookLiked(true);
        const incrementedLikesCount = book.upvotes + 1;
        setLikesCount(incrementedLikesCount);
      });

    db.collection("books").doc(book.id).update({ upvotes: increment });
  } catch (e) {
    console.log(e.message);
  }
};

const unlikeThisBook = (book, likeId, setIsBookLiked, setLikesCount) => {
  const decrement = firebase.firestore.FieldValue.increment(-1);

  try {
    db.collection("likes").doc(likeId).delete();

    db.collection("books")
      .doc(book.id)
      .update({ upvotes: decrement })
      .then(() => {
        setIsBookLiked(false);
        const decrementedLikesCount = book.upvotes - 1;
        setLikesCount(decrementedLikesCount);
      });
  } catch (e) {
    console.log(e);
  }
};

const grabThisRec = (book, currentUser) => {
  if (window.confirm("Grab this recommendation to add to your TBR")) {
    try {
      if (book.id !== currentUser) {
        book.uid = currentUser;
        recBook(book);
      }
    } catch (e) {
      console.log(e);
    }
  }
};

const addToFinishedList = async (book, currentUser, close) => {
  if (window.confirm("Are you finished this book?")) {
    try {
      db.collection("finished").add({
        title: book.title,
        author: book.author,
        thumbnail: book.thumbnail,
        recBy: book.recBy,
        reason: book.reason,
        uid: book.uid,
        createdAt: new Date(),
        upvotes: book.upvotes,
        // finished by section
        finishedBy: currentUser,
        finishedOn: new Date(),
      });
    } catch (e) {
      console.log(e.message);
    }
  }

  deleteThisRec(book);
  close();
};

const removeFromFinishedList = (book, close) => {
  if (
    window.confirm(
      "Are you sure you want to remove from this from finished list?"
    )
  ) {
    try {
      db.collection("finished").doc(book.id).delete();

      recBook(book);
      close();
    } catch (e) {
      console.log(e);
    }
  }
};

const deleteThisRec = (book) => {
  if (window.confirm("Are you sure you want to delete this book?")) {
    try {
      db.collection("books").doc(book.id).delete();
    } catch (e) {
      console.log(e);
    }
  }
};

export {
  recBook,
  likeThisBook,
  unlikeThisBook,
  addToFinishedList,
  removeFromFinishedList,
  grabThisRec,
  deleteThisRec,
};
