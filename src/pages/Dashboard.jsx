import React, { useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [avi, setAvi] = useState(placeholderAvi);
  const { currentUser } = useAuth();

  const editProfile = () => {
    setAvi(); // placeholder to avoid unused var warning
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>Birm Wais</p>
          <p>{currentUser.email}</p>
          <p>Add bio here</p>
          <Button onClick={editProfile}>Edit Profile</Button>
          <Link to='recommend'>
            <Button>Add Recommendation</Button>
          </Link>
        </div>
        <hr />
        <Container>displayed list of books</Container>
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
