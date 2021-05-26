import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import "../css/Profile.css";
import { db, auth } from "../fire";
import { useAuth } from "../contexts/AuthContext";
import Recommend from "../components/Recommend";
import Profile from "../components/Profile";
import { useHistory } from "react-router-dom";
import BookMap from "../components/BookMap";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();
  const { currentUser, getUserByUsername } = useAuth();
  const [books, setBooks] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      anonSignIn();
    } else {
      getUser(profile);
    }
    // eslint-disable-next-line
  }, []);

  const anonSignIn = async () => {
    await auth.signInAnonymously();
    getUser(profile);
  };

  const getUser = async (username) => {
    const user = await getUserByUsername(username);
    if (user) {
      setUserProfile(user);
      getBooks(user);
      setLoading(true);
    } else {
      history.push(`/404/${username}`);
    }
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
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
        }));
        result.sort((a, b) => {
          if (a.createdAt > b.createdAt) return -1;
          if (a.createdAt < b.createdAt) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
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
        <div>
          <Profile user={userProfile} />
          <hr />
          <Recommend uid={userProfile?.uid} />
          <div className='books-map'>
            <p className='no-books'>
              {books?.length === 0
                ? `${userProfile?.name} doesn't have any recommendations yet. Recommend them a Book`
                : ""}
            </p>
            <BookMap books={books} />
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
