import React from "react";
import { Container } from "react-bootstrap";
import "../css/NotFound404.css";

const NotFound404 = () => {
  return (
    <>
      <Container className='not-found'>
        <h1>This user does not exist</h1>
      </Container>
    </>
  );
};

export default NotFound404;
