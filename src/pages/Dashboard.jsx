import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [avi, setAvi] = useState(placeholderAvi);
  const [showModal, setShowModal] = useState(false);
  const { currentUser } = useAuth();

  const closeModalHandler = () => {
    setShowModal(false);
    setAvi(); // To get rid of the annoying not being used warning
  };

  return (
    <Card>
      <Card.Body>
        <div className='user-info'>
          <img src={avi} alt='' className='profile-pic' />
          <p className='display-name'>Birm Wais</p>
          <p>{currentUser.email}</p>
          <p>Add bio here</p>
          <Button>Edit Profile</Button>
          <Link to='recommend'>
            <Button>Add Recommendation</Button>
          </Link>
        </div>
        <hr />
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
