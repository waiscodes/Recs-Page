import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../fire";

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Register
  const signup = (name, email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: name,
        uid: cred.user.uid,
        bio: "Click Complete Profile to add Avatar, Username, and Bio",
        username: Date.now(),
        avi: "https://firebasestorage.googleapis.com/v0/b/lazy-tbr.appspot.com/o/users%2Fdefault-cat-avi.png?alt=media&token=c2872e49-f7d9-4a27-8311-5c3b8b153221",
        profileCompleted: false,
      });
    });
  };

  // Authentication

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    auth.signOut();
  };

  // Get User Info

  const getUserById = async (uid) => {
    const user = await db
      .collection("users")
      .doc(uid)
      .get()
      .then((snap) => {
        return snap.data();
      });

    return user;
  };

  const getUserByUsername = async (username) => {
    const user = await db
      .collection("users")
      .where("username", "==", username.toLowerCase())
      .get()
      .then((snap) => {
        if (snap.docs[0]) {
          return snap.docs[0].data();
        } else {
          return null;
        }
      });

    return user;
  };

  auth.onAuthStateChanged((user) => {
    if (user && !user.isAnonymous) {
      setCurrentUser(user);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    signup,
    signin,
    signOut,
    getUserById,
    getUserByUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
