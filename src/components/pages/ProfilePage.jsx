import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Spinner } from "react-bootstrap";
import "../../css/Profile.css";
import { db, auth } from "../../fire";
import { useAuth } from "../../contexts/AuthContext";
import Recommend from "../addBook/Recommend";
import { Link, Route } from "react-router-dom";
import Profile from "../templates/Profile";
import { useHistory } from "react-router-dom";
import BookMap from "../maps/BookMap";
import MapNav from "../templates/MapNav";

const ProfilePage = () => {
  const { profileUrl } = useParams();
  const [userProfile, setUserProfile] = useState();
  const { currentUser, getUserByUsername } = useAuth();
  const [recs, setRecs] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) {
      anonSignIn();
    } else {
      getUser(profileUrl);
    }
    // eslint-disable-next-line
  }, []);

  const anonSignIn = async () => {
    await auth.signInAnonymously();
    getUser(profileUrl);
  };

  const getUser = async (username) => {
    const user = await getUserByUsername(username);
    if (user) {
      setUserProfile(user);
      getRecs(user);
      setLoading(true);
    } else {
      history.push(`/404/${username}`);
    }
  };

  const getRecs = (user) => {
    db.collection("books")
      .where("uid", "==", user.uid)
      .onSnapshot((snap) => {
        let result = snap.docs.map((doc) => ({
          id: doc.id,
          uid: doc.data().uid,
          title: doc.data().title,
          author: doc.data().author,
          recBy: doc.data().recBy,
          reason: doc.data().reason,
          thumbnail: doc.data().thumbnail,
          upvotes: doc.data().upvotes,
          createdAt: doc.data().createdAt,
        }));
        result.sort((a, b) => {
          if (a.createdAt.seconds > b.createdAt.seconds) return -1;
          if (a.createdAt.seconds < b.createdAt.seconds) return +1;
          return 0;
        });
        result.sort((a, b) => {
          if (a.upvotes > b.upvotes) return -1;
          if (a.upvotes < b.upvotes) return +1;
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
        <div>
          <Profile user={userProfile} />
          <hr />
          <Container className='books-map'>
            <MapNav>
              <li>
                <Link to={`/${profileUrl}`}>TBR</Link>
              </li>
              <li>
                <Link to={`/${profileUrl}/read`}>Read</Link>
              </li>
            </MapNav>

            <Route exact path={`/${profileUrl}`}>
              <BookMap books={recs}>
                <Recommend uid={userProfile.uid} />
              </BookMap>
            </Route>
            <Route path={`/${profileUrl}/read`}>
              <BookMap books={recs} />
            </Route>

            <p className='no-books'>
              {recs?.length === 0 &&
                `${userProfile?.name} doesn't have any recommendations yet. Recommend them a Book`}
            </p>
          </Container>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
