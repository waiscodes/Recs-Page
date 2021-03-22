import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import { db } from "../fire";

const ProfilePage = () => {
  const { profile } = useParams();

  const getUser = (username) => {
    db.collection("user")
      .where("username", "==", username)
      .get()
      .then((snap) => ({
        id: snap.id,
        user: snap.data(),
      }));
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
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfilePage;
