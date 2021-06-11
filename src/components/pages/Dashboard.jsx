import React, { useState, useEffect } from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../../contexts/AuthContext";
import { Link, Route } from "react-router-dom";
import { db } from "../../fire";
import Profile from "../templates/Profile";
import BookMap from "../maps/BookMap";
import Recommend from "../addBook/Recommend";
import MapNav from "../templates/MapNav";
import "../../css/Dashboard.css";
import EditProfile from "../accounts/EditProfile";
import DisplayModal from "../DisplayModal";
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
  const [recs, setRecs] = useState();
  const [reviews, setReviews] = useState();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getUser();
    getRecs();
    getReviews();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);
    setLoading(true);
  };

  const getReviews = () => {
    db.collection("reviews")
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
        setReviews(result);
      });
  };

  const getRecs = async () => {
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
          userId: doc.data().uid,
        }));
        result.sort((a, b) => {
          if (a.createdAt.seconds > b.createdAt.seconds) return -1;
          if (a.createdAt.seconds < b.createdAt.seconds) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.rating > b.rating) return -1;
          if (a.rating < b.rating) return +1;
          return 0;
        });
        setRecs(result);
      });
  };

  const handleClose = () => {
    setShowModal(null);
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
            <Button
              variant='outline-primary'
              className='rounded-pill'
              onClick={() => setShowModal(true)}
            >
              Edit Profile
            </Button>
            <DisplayModal show={showModal} handleClose={handleClose}>
              <EditProfile handleClose={handleClose} />
            </DisplayModal>
          </Profile>

          <Container className='books-map'>
            <MapNav>
              <li>
                <Link to='/'>TBR</Link>
              </li>
              <li>
                <Link to='/read'>Read</Link>
              </li>
            </MapNav>

            <Route exact path='/'>
              <BookMap books={recs}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>
            <Route path='/read'>
              <BookMap books={reviews}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>

            <p className='no-books'>
              {recs?.length === 0 && "You don't have any Recommendations yet."}
            </p>
          </Container>
        </Card>
      )}
    </>
  );
};

export default Dashboard;
