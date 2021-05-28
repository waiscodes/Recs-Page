import React, { useState, useEffect } from "react";
import { Card, Button, Container, Spinner } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../css/Dashboard.css";
import { Link, Route } from "react-router-dom";
import { db } from "../fire";
import Profile from "../components/Profile";
import BookMap from "../components/BookMap";
import Recommend from "../components/Recommend";
import MapNav from "../components/MapNav";
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUser();
    getRecs();
    // eslint-disable-next-line
  }, []);

  const getUser = async () => {
    const user = await getUserById(currentUser.uid);
    setUser(user);
    setLoading(true);
  };

  const getRecs = () => {
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
        setRecs(result);
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

          <Container className='books-map'>
            <MapNav>
              <li>
                <Link to='/home/'>TBR</Link>
              </li>
              <li>
                <Link to='/home/read'>Read</Link>
              </li>
            </MapNav>

            <Route exact path='/home/'>
              <BookMap books={recs}>
                <Recommend uid={currentUser.uid} />
              </BookMap>
            </Route>
            <Route path='/home/read'>
              <BookMap books={recs}>
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
