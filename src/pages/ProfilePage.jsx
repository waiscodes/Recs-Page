import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { db } from "../fire";
import RecommendPage from "./RecommendPage";

const ProfilePage = () => {
  const { profile } = useParams();
  const [userProfile, setUserProfile] = useState();

  const getUser = (username) => {
    db.collection("users")
      .where("username", "==", username)
      .get()
      .then((snap) => {
        snap.docs.map((doc) => {
          setUserProfile(doc.data());
        });
      });
  };

  useEffect(() => {
    getUser(profile);
  });

  return (
    <>
      <Card>
        <Card.Body>
          <div className='user-info'>
            <img src='' alt='' />
            <p className='display-name'>Birm Wais</p>
            <p className='username'>{profile}</p>
            <p>{"bio here"}</p>
            <Button>Add Recommendation</Button>
          </div>
          <hr />
          <RecommendPage uid={userProfile && userProfile.uid} />
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfilePage;
