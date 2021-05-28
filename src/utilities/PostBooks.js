import { db } from "../fire";

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
    .then(() => {
      console.log("gottem");
    })
    .catch(() => {
      console.log("don't gottem");
    });
};

export { recBook };
