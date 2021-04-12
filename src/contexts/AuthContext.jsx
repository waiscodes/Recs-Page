import placeholderAvi from "../images/placeholder-avi.png";
import React, { useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../fire";

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  // Register and Login
  const signup = (name, email, password) => {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      setAvi(cred.user);
      return db.collection("users").doc(cred.user.uid).set({
        name: name,
        uid: cred.user.uid,
      });
    });
  };

  // Authentication

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
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
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
