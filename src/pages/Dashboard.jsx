import React, { useState, useEffect } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import "../css/Dashboard.css";
import { Link, useHistory } from "react-router-dom";
import { db, storage } from "../fire";
import RecommendPage from "./RecommendPage";

const Dashboard = () => {
  const [avi, setAvi] = useState();
  const [user, setUser] = useState();
  const { currentUser, signOut } = useAuth();
  const [books, setBooks] = useState();
  const history = useHistory();
  const [bookSelected, setBookSelected] = useState("");

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
        setAvi(url);
      });
  };

  const copyShareLink = () => {
    document.querySelector("#copyContent").select();
    document.execCommand("copy");
  };

  const selected = {
    border: "red solid",
    width: "400px",
    display: "flex",
    flexDirection: "row",
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>{user && user.name}</p>
          <p>{user && "@" + user.username}</p>
          <p>{user && user.bio}</p>
          {!avi && <Button onClick={completeProfile}>Complete Profile</Button>}
          <input
            type='text'
            name='copyContent'
            id='copyContent'
            className='screen-reader-text'
            defaultValue={user && "https://recs.page/" + user.username}
          />
          <Button onClick={copyShareLink}>Share Profile Link</Button>
        </div>
        <hr />
        <RecommendPage uid={currentUser.uid} />
        <Button onClick={() => setBookSelected(null)}>Close</Button>
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
                style={bookSelected === book.id ? selected : null}
                onClick={() => {
                  setBookSelected(book.id);
                }}
              >
                <div className='ind-book'>
                  <img src={book.thumbnail} alt='' />
                  {bookSelected === book.id ? (
                    ""
                  ) : (
                    <div>
                      <p>
                        {book.title.length > 30
                          ? book.title.substr(0, 30) + "..."
                          : book.title}
                      </p>
                      <p className='recBy text-muted'>Rec from {book.recBy}</p>
                    </div>
                  )}
                </div>
                {bookSelected === book.id ? (
                  <div>
                    <h4>Title: {book.title}</h4>
                    <p>Author: {book.author}</p>
                    <p>Recommended by: {book.recBy}</p>
                    <p>Why You should read it: {book.reason}</p>
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
