import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import { db } from "../fire";

const Dashboard = () => {
  const [avi, setAvi] = useState(placeholderAvi);
  const { currentUser } = useAuth();
  const { userInfo } = useAuth();
  const [books, setBooks] = useState();

  const editProfile = () => {
    setAvi(placeholderAvi); // placeholder to avoid unused var warning
  };

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = () => {
    db.collection("books")
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
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>Birm Wais</p>
          <p>{currentUser.email}</p>
          <pre>{userInfo}</pre>
          <p>Add bio here</p>
          <Button onClick={editProfile}>Edit Profile</Button>
          <Link to={"recommend/" + "aa"}>
            <Button>Add Recommendation</Button>
          </Link>
        </div>
        <hr />
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
