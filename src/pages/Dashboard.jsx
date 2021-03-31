import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";
import RecommendPage from "./RecommendPage";

const Dashboard = () => {
  const [avi, setAvi] = useState(placeholderAvi);
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const [books, setBooks] = useState();
  const history = useHistory();

  const editProfile = () => {
    setAvi(placeholderAvi); // placeholder to avoid unused var warning
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
      })
      .catch(() => {
        history.push("/complete-profile");
      });
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>{user && user.name}</p>
          <p>{user && user.username}</p>
          <p>{user && user.bio}</p>
          <Button onClick={editProfile}>Edit Profile</Button>
        </div>
        <hr />
        <RecommendPage uid={currentUser.uid} />
        <Container className='books-map'>
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
