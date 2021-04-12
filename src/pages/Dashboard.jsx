import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";
import RecommendPage from "./RecommendPage";

const Dashboard = () => {
  const [avi, setAvi] = useState();
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const [books, setBooks] = useState();
  const history = useHistory();

  const completeProfile = () => {
    history.push("/complete-profile");
  };

  useEffect(() => {
    getUser();
    getBooks();
    getAvi();
  }, []);

  const getUser = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => setUser(snap.data()));
  };

  const getBooks = () => {
    db.collection("books")
      .where("uid", "==", currentUser.uid)
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

  const getAvi = () => {
    storage
      .ref("users/" + currentUser.uid + "/" + "Avi")
      .getDownloadURL()
      .then((url) => {
        setAvi(url);
      });
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>{user && user.name}</p>
          <p>@{user && user.username}</p>
          <p>{user && user.bio}</p>
          {!avi && <Button onClick={completeProfile}>Complete Profile</Button>}
        </div>
        <hr />
        <RecommendPage uid={currentUser.uid} />
        <Container className='books-map'>
          <p>
            {books && books.length == 0
              ? "You don't have any Recommendations yet."
              : ""}
          </p>
          {books &&
            books.map((book) => (
              <div key={book.id} className='ind-book'>
                <img src={book.thumbnail} alt='' />
                <p>{book.title}</p>
              </div>
            ))}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
