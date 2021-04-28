import React, { useState, useEffect } from "react";
import { Card, Button, Container, CloseButton } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../css/Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";
import RecommendPage from "./RecommendPage";
import {
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon,
} from "react-share";

const Dashboard = () => {
  const [avi, setAvi] = useState();
  const [user, setUser] = useState();
  const { currentUser, signOut } = useAuth();
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
    // getAvi();
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
        setBooks(
          snap.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            author: doc.data().author,
            recBy: doc.data().recBy,
            reason: doc.data().reason,
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
        if (url) {
          setAvi(url);
        }
      })
      .catch((error) => {
        setAvi(
          "https://firebasestorage.googleapis.com/v0/b/lazy-tbr.appspot.com/o/users%2Fdefault-cat-avi.png?alt=media&token=c2872e49-f7d9-4a27-8311-5c3b8b153221"
        );
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

  const selected = {
    width: "400px",
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img
            className='profile-pic rounded-circle z-depth-2'
            alt='100x100'
            src={user && user.avi}
            data-holder-rendered='true'
          />

          <h4 className='display-name'>{user && user.name}</h4>
          <p className='text-muted'>{user && "@" + user.username}</p>
          <p>{user && user.bio}</p>
          <div className='text-center'>
            {user?.avi ==
            "https://firebasestorage.googleapis.com/v0/b/lazy-tbr.appspot.com/o/users%2Fdefault-cat-avi.png?alt=media&token=c2872e49-f7d9-4a27-8311-5c3b8b153221" ? (
              <Button onClick={completeProfile}>Complete Profile</Button>
            ) : (
              <div>
                <TwitterShareButton url={"https://recs.page/" + user?.username}>
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
                <WhatsappShareButton
                  url={"https://recs.page/" + user?.username}
                >
                  <WhatsappIcon size={32} round={true} />
                </WhatsappShareButton>
                <FacebookMessengerShareButton
                  url={"https://recs.page/" + user?.username}
                >
                  <FacebookMessengerIcon size={32} round={true} />
                </FacebookMessengerShareButton>
                <LinkedinShareButton
                  url={"https://recs.page/" + user?.username}
                >
                  <LinkedinIcon size={32} round={true} />
                </LinkedinShareButton>
                <TelegramShareButton
                  url={"https://recs.page/" + user?.username}
                >
                  <TelegramIcon size={32} round={true} />
                </TelegramShareButton>
              </div>
            )}
          </div>
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
              <Card
                key={book.id}
                className='ind-book'
                style={bookSelected === book.id ? selected : null}
              >
                <div className='img-div'>
                  <img
                    src={book.thumbnail}
                    alt=''
                    onClick={() => setBookSelected(book.id)}
                  />
                </div>
                {bookSelected === book.id ? (
                  ""
                ) : (
                  <div className='ind-book-desc'>
                    <p>
                      {book.title.length > 30
                        ? book.title.substr(0, 30) + "..."
                        : book.title}
                    </p>
                    <p className='recBy text-muted'>
                      Rec by{" "}
                      {book.recBy.length > 10
                        ? book.recBy.substr(0, 10) + "..."
                        : book.recBy}
                    </p>
                  </div>
                )}
                {bookSelected === book.id ? (
                  <div className='book-desc'>
                    <CloseButton onClick={() => setBookSelected(null)}>
                      Close
                    </CloseButton>
                    <h4>{book.title}</h4>
                    <p>
                      <span className='desc'>Author: </span>
                      {book.author}
                    </p>
                    <p>
                      <span className='desc'>Rec by: </span>
                      {book.recBy}
                    </p>
                    <p>
                      <span className='desc'>Reason: </span>
                      {book.reason}
                    </p>
                  </div>
                ) : (
                  ""
                )}
              </Card>
            ))}
        </Container>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
