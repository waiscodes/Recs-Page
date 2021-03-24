import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import { db } from "../fire";
import RecommendPage from "./RecommendPage";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [uid, setUid] = useState("");
  const [books, setBooks] = useState();

  useEffect(() => {
    loadPage();
  });

  const loadPage = async () => {
    const page = await getUser(profile);
    getBooks();
  };

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((snap) => {
        return snap.docs[0].data();
      });
  };

  const getBooks = () => {
    db.collection("books")
      // .where("uid", "==", uid)
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
  };

  return (
    <>
      <Card>
        <Card.Body>
          {JSON.stringify(userProfile, null, 2)}
          <div className='user-info'>
            <img src='' alt='' />
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
