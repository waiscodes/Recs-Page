import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import { db, storage } from "../fire";
import RecommendPage from "./RecommendPage";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [avi, setAvi] = useState();
  const [books, setBooks] = useState();

  useEffect(() => {
    getUser(profile);
  }, []);

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((snap) => {
        setUserProfile(snap.docs[0].data());
        getBooks(snap.docs[0].data());
        getAvi(snap.docs[0].data().uid);
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
    console.log("run!");
    db.collection("books")
      .where("uid", "==", user.uid)
      .get()
      .then((snap) => {
        setBooks(
          snap.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            thumbnail: doc.data().thumbnail,
          }))
        );
      });
    console.log("ran");
  };

  return (
    <>
      <Card>
        <Card.Body>
          {JSON.stringify(userProfile, null, 2)}
          <div className='user-info'>
            <img src={avi} alt='' />
            <p className='display-name'>Birm Wais</p>
            <p className='username'>{profile}</p>
            <p>{"bio here"}</p>
            <Button>Add Recommendation</Button>
          </div>
          <hr />
          <RecommendPage uid={userProfile && userProfile.uid} />
        </Card.Body>
        <Container className='books-map'>
          {books &&
            books.map((book) => (
              <div key={book.id} className='ind-book'>
                <img src={book.thumbnail} alt='' />
                <p>{book.title}</p>
              </div>
            ))}
        </Container>
      </Card>
    </>
  );
};

export default ProfilePage;
