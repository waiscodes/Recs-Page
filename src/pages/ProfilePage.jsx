import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Spinner } from "react-bootstrap";
import "../css/Profile.css";
import { db, auth } from "../fire";
import { useAuth } from "../contexts/AuthContext";
import Recommend from "../components/Recommend";
import Profile from "../components/Profile";
import BookMap from "../components/BookMap";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const { currentUser, getUserByUsername } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      anonSignIn();
    } else {
      getUser(profile);
    }
  }, []);

  const anonSignIn = async () => {
    await auth.signInAnonymously();
    getUser(profile);
  };

  const getUser = async (username) => {
    const user = await getUserByUsername(username);
    setUserProfile(user);
    getBooks(user);
    setLoading(true);
  };

  const getBooks = (user) => {
    db.collection("books")
      .where("uid", "==", user.uid)
      .onSnapshot((snap) => {
        let result = snap.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          author: doc.data().author,
          recBy: doc.data().recBy,
          reason: doc.data().reason,
          thumbnail: doc.data().thumbnail,
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
        }));
        result.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
          return 0;
        });
        setBooks(result);
      });
  };

  return (
    <>
      {!loading && (
        <div className='spinner'>
          <Spinner animation='border' />
        </div>
      )}

      {loading && (
        <Card>
          <Profile user={userProfile} />
          <hr />
          <Recommend uid={userProfile && userProfile.uid} />
          <div className='books-map'>
            <p>
              {books && books.length == 0
                ? `${
                    userProfile && userProfile.name
                  } doesn't have any recommendations yet. Recommend them a Book`
                : ""}
            </p>
            <BookMap books={books} />
          </div>
        </Card>
      )}
    </>
  );
};

export default ProfilePage;
