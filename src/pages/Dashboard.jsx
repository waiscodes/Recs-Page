import React, { useRef, useState } from "react";
import { Card, Button } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import placeholderAvi from "../images/placeholder-avi.png";
import "../css/Dashboard.css";
import fire from "../fire";

const Dashboard = () => {
  const [avi, setAvi] = useState(placeholderAvi);
  const { currentUser } = useAuth();
  const testRef = useRef();

  const addToFirestore = () => {
    const db = fire.firestore();
    db.collection("books").add({
      test: testRef.current.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addToFirestore();
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
          <Button>Add Recommendation</Button>
        </div>
        <hr />
      </Card.Body>
    </Card>
  );
};

export default Dashboard;
