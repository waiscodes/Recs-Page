import { db, storage } from "../fire";

const getUserById = async (uid) => {
  const something = await db
    .collection("users")
    .doc(uid)
    .get()
    .then((snap) => {
      return snap.data();
    });

  return something;
};

export { getUserById };
