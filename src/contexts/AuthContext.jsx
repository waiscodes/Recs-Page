import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../fire";

const AuthContext = React.createContext();
export const useAuth = () => {
  return useContext(AuthContext);
};
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [userInfo, setUserInfo] = useState();
  const [loading, setLoading] = useState(true);

  // Register and Login
  const signup = (name, email, username, password) => {
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      return db.collection("users").doc(cred.user.uid).set({
        name: name,
        username: username,
        bio: "",
      });
    });
  };

  const signin = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  // User info

  const getUserInfo = (uid) => {
    db.collection("users")
      .doc(uid)
      .get()
      .then((snap) => {
        console.log(snap.data());
      });
  };

  auth.onAuthStateChanged((user) => {
    setCurrentUser(user);
    getUserInfo(user.uid);
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
    userInfo,
    signup,
    signin,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
