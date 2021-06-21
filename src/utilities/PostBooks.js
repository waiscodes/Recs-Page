import { db } from "../fire";
import firebase from "firebase";

const recBook = (book) => {
  db.collection("books")
    .add({
      title: book.title,
      author: book.author,
      thumbnail: book.thumbnail,
      recBy: book.recBy,
      reason: book.reason,
      upvotes: 0,
      uid: book.uid,
      createdAt: new Date(),
    })
    .then((e) => {
      console.log("gottem");
    })
    .catch((e) => {
      console.log(e);
    });
};

const addReadBook = (book) => {
  console.log(book);
};

const likeThisBook = (book, currentUser) => {
  const increment = firebase.firestore.FieldValue.increment(1);
  try {
    db.collection("likes")
      .add({
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

const addToFinishedList = async (book, currentUser) => {
  if (window.confirm("Are you finished this book?")) {
    try {
      const finishedByRoute = await db
        .collection("books")
        .doc(book.id)
        .collection("finishedBy")
        .doc();

      finishedByRoute
        .set({
          uid: currentUser,
          finishedOn: new Date(),
        })
        .then(() => {
          console.log("done");
        });
    } catch (e) {
      console.log(e.message);
    }
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
  addReadBook,
  likeThisBook,
  addToFinishedList,
  grabThisRec,
  deleteThisRec,
};
