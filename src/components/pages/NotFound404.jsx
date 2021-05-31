import React from "react";
import { Container } from "react-bootstrap";
import Profile from "../components/Profile";
import { useParams } from "react-router-dom";
import "../css/NotFound404.css";

const NotFound404 = () => {
  const { username } = useParams();

  const user = {
    avi: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Solid_black.svg/600px-Solid_black.svg.png",
    username: username,
  };
  return (
    <>
      <Container>
        <Profile user={user} />
        <div className='not-found'>
          <h4>This account doesn't exist</h4>
          <p>Try searching again</p>
        </div>
      </Container>
    </>
  );
};

export default NotFound404;
