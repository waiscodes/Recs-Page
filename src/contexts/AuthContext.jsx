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
        avi:
          "https://firebasestorage.googleapis.com/v0/b/lazy-tbr.appspot.com/o/users%2Fdefault-cat-avi.png?alt=media&token=c2872e49-f7d9-4a27-8311-5c3b8b153221",
        profileCompleted: false,
      });
    });
  };

  // Authentication

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // Sign out

  const signOut = () => {
    auth.signOut();
  };

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
