import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Container, Spinner } from "react-bootstrap";
import "../css/Profile.css";
import { db } from "../fire";
import { useAuth } from "../contexts/AuthContext";
import Recommend from "../components/Recommend";
import Profile from "../components/Profile";
import BookMap from "../components/BookMap";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const { currentUser } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser(profile);
    if (!currentUser) {
      anonSignIn();
    }
  }, []);

  const anonSignIn = () => {
    // auth.signInAnonymously();
    console.log("Anon sign in");
  };

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username.toLowerCase())
      .get()
      .then((snap) => {
        if (snap.docs[0]) {
          setUserProfile(snap.docs[0].data());
          getBooks(snap.docs[0].data());
        }
      });
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
          rating: doc.data().rating,
          createdAt: doc.data().createdAt,
        }));
        result.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return +1;
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
          <Card.Body>
            <Profile user={userProfile} />
            <hr />
            <Recommend uid={userProfile && userProfile.uid} />
          </Card.Body>
          <Container className='books-map'>
            <p>
              {books && books.length == 0
                ? `${
                    userProfile && userProfile.name
                  } doesn't have any recommendations yet. Recommend them a Book`
                : ""}
            </p>
            <BookMap books={books} />
          </Container>
        </Card>
      )}
    </>
  );
};

export default ProfilePage;
