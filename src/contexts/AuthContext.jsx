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
