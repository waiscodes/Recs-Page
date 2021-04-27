import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import "../css/Profile.css";
import { auth, db, storage } from "../fire";
import RecommendPage from "./RecommendPage";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [avi, setAvi] = useState();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser(profile);
    // anonSignIn();
  }, []);

  // const anonSignIn = () => {
  //   auth.signInAnonymously();
  // };

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username.toLowerCase())
      .get()
      .then((snap) => {
        if (snap.docs[0]) {
          setUserProfile(snap.docs[0].data());
          getBooks(snap.docs[0].data());
          // getAvi(snap.docs[0].data().uid);
        }
      });
    setLoading(true);
  };

  const getAvi = (uid) => {
    storage
      .ref("users/" + uid + "/" + "Avi")
      .getDownloadURL()
      .then((url) => {
        setAvi(url);
      });
    setLoading(true);
  };

  const getBooks = (user) => {
    db.collection("books")
      .where("uid", "==", user.uid)
      .onSnapshot((snap) => {
        setBooks(
          snap.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            recBy: doc.data().recBy,
            thumbnail: doc.data().thumbnail,
          }))
        );
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
            <div className='user-info'>
              <img
                src={userProfile && userProfile.avi}
                alt=''
                className='profile-pic'
              />
              <h4 className='display-name'>
                {userProfile && userProfile.name}
              </h4>
              <p className='username text-muted'>@{profile}</p>
              <p>{userProfile && userProfile.bio}</p>
            </div>
            <hr />
            <RecommendPage uid={userProfile && userProfile.uid} />
          </Card.Body>
          <Container className='books-map'>
            <p>
              {books && books.length == 0
                ? `${
                    userProfile && userProfile.name
                  } doesn't have any recommendations yet. Recommend them a Book`
                : ""}
            </p>
            {books &&
              books.map((book) => (
                <div key={book.id} className='ind-book'>
                  <img src={book.thumbnail} alt='' />
                  <div className='ind-book-desc'>
                    <p>
                      {book.title.length > 30
                        ? book.title.substr(0, 30) + "..."
                        : book.title}
                    </p>
                    <p className='recBy text-muted'>
                      Rec by{" "}
                      {book.recBy.length > 10
                        ? book.recBy.substr(0, 10) + "..."
                        : book.recBy}
                    </p>
                  </div>
                </div>
              ))}
          </Container>
        </Card>
      )}
    </>
  );
};

export default ProfilePage;
