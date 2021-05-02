import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Card, Button, Container, Spinner, CloseButton } from "react-bootstrap";
import "../css/Profile.css";
import { auth, db, storage } from "../fire";
import { useAuth } from "../contexts/AuthContext";
import RecommendPage from "./RecommendPage";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const [avi, setAvi] = useState();
  const { currentUser } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);
  const [bookSelected, setBookSelected] = useState(false);
  const [bookLiked, setBookLiked] = useState(false);

  useEffect(() => {
    getUser(profile);
    if (!currentUser) {
      anonSignIn();
    }
  }, []);

  const anonSignIn = () => {
    // auth.signInAnonymously();
    console.log("Anon sign in");
  };

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username.toLowerCase())
      .get()
      .then((snap) => {
        if (snap.docs[0]) {
          setUserProfile(snap.docs[0].data());
          getBooks(snap.docs[0].data());
          // getAvi(snap.docs[0].data().uid);
        }
      });
    setLoading(true);
  };

  const getAvi = (uid) => {
    storage
      .ref("users/" + uid + "/" + "Avi")
      .getDownloadURL()
      .then((url) => {
        setAvi(url);
      });
    setLoading(true);
  };

  const getBooks = (user) => {
    db.collection("books")
      .where("uid", "==", user.uid)
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

  const likeBook = (bookId, bookRating) => {
    setBookLiked(!bookLiked);
    db.collection("books")
      .doc(bookId)
      .update({
        rating: bookLiked ? bookRating + 1 : bookRating - 1,
      });
  };

  const selected = {
    width: "400px",
    display: "flex",
    flexDirection: "row",
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
          <Card.Body>
            <div className='user-info'>
              <img
                src={userProfile && userProfile.avi}
                alt=''
                onDoubleClick={() => alert("hello world")}
                className='profile-pic'
              />
              <h4 className='display-name'>
                {userProfile && userProfile.name}
              </h4>
              <p className='username text-muted'>@{profile}</p>
              <p>{userProfile && userProfile.bio}</p>
            </div>
            <hr />
            <RecommendPage uid={userProfile && userProfile.uid} />
          </Card.Body>
          <Container className='books-map'>
            <p>
              {books && books.length == 0
                ? `${
                    userProfile && userProfile.name
                  } doesn't have any recommendations yet. Recommend them a Book`
                : ""}
            </p>
            {books &&
              books.map((book) => (
                <Card
                  key={book.id}
                  className='ind-book'
                  style={bookSelected === book.id ? selected : null}
                  onDoubleClick={() => likeBook(book.id, book.rating)}
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
                      <p>
                        <span className='desc'>Rating: </span>
                        {book?.rating}{" "}
                        <span className='double-tap'>Double Tap to Like</span>
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                </Card>
              ))}
          </Container>
        </Card>
      )}
    </>
  );
};

export default ProfilePage;
