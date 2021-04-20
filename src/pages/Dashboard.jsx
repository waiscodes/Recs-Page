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
          <img
            className='profile-pic rounded-circle z-depth-2'
            alt='100x100'
            src={avi}
            data-holder-rendered='true'
          />

          <h4 className='display-name'>{user && user.name}</h4>
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
          <Button onClick={copyShareLink}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-clipboard'
              viewBox='0 0 16 16'
            >
              <path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z' />
              <path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z' />
            </svg>{" "}
            Profile Link
          </Button>
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
