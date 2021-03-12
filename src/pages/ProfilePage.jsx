import React from "react";
import { Card, Button } from "react-bootstrap";

const ProfilePage = () => {
  return (
    <>
      <Card>
        <Card.Body>
          <div className='user-info'>
            <img src='' alt='' />
            <p className='display-name'>Birm Wais</p>
            <p className='username'>waisideas</p>
            <p>Add bio here</p>
            <Button>Add Recommendation</Button>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default ProfilePage;
