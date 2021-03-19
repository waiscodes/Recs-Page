import React from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "react-bootstrap";

const ProfilePage = () => {
  const { profile } = useParams();

  return (
    <>
      <Card>
        <Card.Body>
          <div className='user-info'>
            <img src='' alt='' />
            <p className='display-name'>Birm Wais</p>
            <h1 className='username'>{profile}</h1>
            <p>Add bio here</p>
            <Button>Add Recommendation</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfilePage;
