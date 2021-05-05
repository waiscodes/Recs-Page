import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../css/Dashboard.css";
import { useHistory } from "react-router-dom";
import { db } from "../fire";
import Recommend from "../components/Recommend";
import Profile from "../components/Profile";
import BookMap from "../components/BookMap";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const Dashboard = () => {
  const [user, setUser] = useState();
  const { currentUser } = useAuth();
  const [books, setBooks] = useState();
  const history = useHistory();
  const [bookSelected, setBookSelected] = useState(false);
  const [copied, setCopied] = useState(false);

  const completeProfile = () => {
    history.push("/complete-profile");
  };

  useEffect(() => {
    getUser();
    getBooks();
  }, []);

  const getUser = () => {
    db.collection("users")
      .doc(currentUser.uid)
      .get()
      .then((snap) => {
        setUser(snap.data());
      });
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

  const copyShareLink = () => {
    document.querySelector("#copyContent").select();
    document.execCommand("copy");
    setCopied(true);

    setTimeout(() => hideCopied(), 1000);

    const hideCopied = () => {
      setCopied(false);
    };
  };

  return (
    <Card>
      <Card.Body>
        <Profile user={user} />
        <div className='text-center'>
          {user?.avi ==
          "https://firebasestorage.googleapis.com/v0/b/lazy-tbr.appspot.com/o/users%2Fdefault-cat-avi.png?alt=media&token=c2872e49-f7d9-4a27-8311-5c3b8b153221" ? (
            <Button onClick={completeProfile}>Complete Profile</Button>
          ) : (
            <div className='social-share'>
              <p className='text-muted'>Ask for recommendations</p>
              <div>
                <TwitterShareButton
                  url={
                    "Recommend me a book on my Recs Page https://recs.page/" +
                    user?.username
                  }
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={
                    "Recommend me a book on my Recs Page https://recs.page/" +
                    user?.username
                  }
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <FacebookMessengerShareButton
                  url={
                    "Recommend me a book on my Recs Page https://recs.page/" +
                    user?.username
                  }
                >
                  <FacebookMessengerIcon size={32} round={true} />
                </FacebookMessengerShareButton>
                <LinkedinShareButton
                  url={
                    "Recommend me a book on my Recs Page https://recs.page/" +
                    user?.username
                  }
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <TelegramShareButton
                  url={
                    "Recommend me a book on my Recs Page https://recs.page/" +
                    user?.username
                  }
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
              </div>
            </div>
          )}
        </div>
        <hr />
        <Recommend uid={currentUser.uid} />

        <Container className='books-map'>
          <p>
            {books && books.length == 0
              ? "You don't have any Recommendations yet."
              : ""}
          </p>

          <BookMap books={books} />
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
