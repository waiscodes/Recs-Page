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

const likeThisBook = async (book, currentUser) => {
  try {
    const thisBook = db.collection("books").doc(book.id);

    const increment = firebase.firestore.FieldValue.increment(1);

    thisBook.update({ upvotes: increment });

    const likedByRoute = await thisBook.collection("likedBy").doc();

    likedByRoute
      .set({
        uid: currentUser,
        finishedOn: new Date(),
      })
      .then(() => {
        console.log(book.upvotes);
      });
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
