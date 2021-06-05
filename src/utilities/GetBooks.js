import { db } from "../fire";

const getBookRecs = (uid) => {
  // promises firebase
  // The problem is that these firebase functions return in an onSnapshot.
  // return db
  //   .collection("books")
  //   .where("uid", "==", uid)
  //   .get()
  //   .then((snap) => {
  //     return snap.docs;
  //   });
  // return db
  //   .collection("books")
  //   .where("uid", "==", uid)
  //   .onSnapshot((snap) => {
  //     let result = snap.docs.map((doc) => ({
  //       id: doc.id,
  //       title: doc.data().title,
  //       author: doc.data().author,
  //       recBy: doc.data().recBy,
  //       reason: doc.data().reason,
  //       thumbnail: doc.data().thumbnail,
  //       rating: doc.data().rating,
  //       createdAt: doc.data().createdAt,
  //       profileCompleted: doc.data().profileCompleted,
  //     }));
  //     result.sort((a, b) => {
  //       if (a.createdAt.seconds > b.createdAt.seconds) return -1;
  //       if (a.createdAt.seconds < b.createdAt.seconds) return +1;
  //       return 0;
  //     });
  //     result.sort((a, b) => {
  //       if (a.rating > b.rating) return -1;
  //       if (a.rating < b.rating) return +1;
  //       return 0;
  //     });
  //     return result;
  //   });
};

export { getBookRecs };
