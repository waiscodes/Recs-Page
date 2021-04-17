import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
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
      .where("username", "==", username)
      .get()
      .then((snap) => {
        if (snap.docs[0]) {
          setUserProfile(snap.docs[0].data());
          getBooks(snap.docs[0].data());
          getAvi(snap.docs[0].data().uid);
        }
        setLoading(true);
      });
  };

  const getAvi = (uid) => {
    storage
      .ref("users/" + uid + "/" + "Avi")
      .getDownloadURL()
      .then((url) => {
        setAvi(url);
      });
  };

  const getBooks = (user) => {
    db.collection("books")
      .where("uid", "==", user.uid)
      .onSnapshot((snap) => {
        setBooks(
          snap.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            thumbnail: doc.data().thumbnail,
          }))
        );
      });
  };

  return (
    <>
      {!loading && <Spinner animation='border' />}

      {loading && (
        <Card>
          <Card.Body>
            <div className='user-info'>
              <img src={avi} alt='' className='profile-pic' />
              <p className='display-name'>{userProfile && userProfile.name}</p>
              <p className='username'>@{profile}</p>
              <p>{userProfile && userProfile.bio}</p>
              <Button>Create an Account</Button>
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
                  <p>
                    {book.title.length > 30
                      ? book.title.substr(0, 30) + "..."
                      : book.title}
                  </p>
                </div>
              ))}
          </Container>
        </Card>
      )}
    </>
  );
};

export default ProfilePage;
