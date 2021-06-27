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

const likeThisBook = (book, currentUser, likeId) => {
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
        console.log("book liked");
      })
      .catch((e) => {
        console.log(e);
      });

    const thisBook = db.collection("books").doc(book.id);

    thisBook.update({ upvotes: increment });
  } catch (e) {
    console.log(e.message);
  }
};

const unlikeThisBook = (book, likeId) => {
  const decrement = firebase.firestore.FieldValue.increment(-1);

  try {
    db.collection("likes").doc(likeId).delete();

    db.collection("books").doc(book.id).update({ upvotes: decrement });
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
  console.log(book);
  if (window.confirm("Are you finished this book?")) {
    try {
      db.collection("finished")
        .add({
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
        })
        .then(() => {
          console.log("book finished");
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (e) {
      console.log(e.message);
    }
  }

  // TODO: Once you finish
  deleteThisRec(book);
  close();
};

const removeFromFinishedList = (book, close) => {
  console.log(book);
  if (
    window.confirm(
      "Are you sure you want to remove from this from finished list?"
    )
  ) {
    try {
      db.collection("finished")
        .doc(book.id)
        .delete()
        .then(() => {
          console.log(book.id + " removed from finished List");
          recBook(book);
        })
        .catch((e) => {
          console.log(e);
        });
      close();
    } catch {}
  }
};

const deleteThisRec = (book) => {
  db.collection("books")
    .doc(book.id)
    .delete()
    .then((e) => console.log("deleted successfully"))
    .catch((e) => {
      console.log(e);
    });
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
