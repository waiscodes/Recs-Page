import React, { useState, useEffect } from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";
import { db } from "../fire";
import Recommend from "../components/Recommend";
import Profile from "../components/Profile";
import BookMap from "../components/BookMap";
// import {
//   TwitterShareButton,
//   TwitterIcon,
//   WhatsappShareButton,
//   WhatsappIcon,
//   FacebookMessengerShareButton,
//   FacebookMessengerIcon,
//   LinkedinIcon,
//   LinkedinShareButton,
//   TelegramShareButton,
//   TelegramIcon,
// } from "react-share";

const Dashboard = () => {
  const [user, setUser] = useState();
  const { currentUser, getUserById } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    getBooks();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);
    setLoading(true);
  };

  const getBooks = () => {
    db.collection("books")
      .where("uid", "==", currentUser.uid)
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
          profileCompleted: doc.data().profileCompleted,
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
          <Profile user={user}>
            <Link to='/edit-profile'>
              <Button variant='outline-primary' className='rounded-pill'>
                Edit Profile
              </Button>
            </Link>
          </Profile>
          <hr />
          <Recommend uid={currentUser?.uid} />

          <Container className='books-map'>
            <p className='no-books'>
              {books && books.length === 0
                ? "You don't have any Recommendations yet."
                : ""}
            </p>

            <BookMap books={books} />
          </Container>
        </Card>
      )}
    </>
  );
};

export default Dashboard;
