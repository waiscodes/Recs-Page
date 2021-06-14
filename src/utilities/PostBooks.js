import { db } from "../fire";

const recBook = (book) => {
  db.collection("books").add({
    title: book.title,
    author: book.author,
    thumbnail: book.thumbnail,
    recBy: book.recBy,
    reason: book.reason,
    upvotes: 0,
    uid: book.uid,
    createdAt: new Date(),
  });
};

const addReadBook = (book) => {
  console.log(book);
};

const revBook = (book) => {
  db.collection("reviews")
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
    .then(() => {
      console.log("added to rev");
    })
    .catch(() => {
      console.log("don't gottem");
    });
};

const likeThisBook = (book, uid) => {
  console.log(uid + " liked " + book.title);
  // TODO: Add an array and add username to the liked array. First check to see if name already exists.
};

const grabThisRec = (book, currentUser) => {
  console.log(currentUser.uid + " grabbed " + book.title);
  // TODO: make copy to add to user profile???

  if (window.confirm("Grab this recommendation to add to your TBR")) {
    console.log("Added to your profile");
  }
};

const addToFinishedList = (book, currentUser) => {
  if (window.confirm("Are you finished this book?")) {
    // db.collection("books").doc(book.id).collection("finishedBy").set({
    //   uid: currentUser.uid,
    //   finishedOn: new Date(),
    // });
  }
};

export {
  recBook,
  addReadBook,
  revBook,
  likeThisBook,
  addToFinishedList,
  grabThisRec,
};
