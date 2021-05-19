import React, { useState } from "react";
import DisplayModal from "../components/DisplayModal";
import ImageCrop from "../components/ImageCrop";
import { Button } from "react-bootstrap";

const Welcome = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => {
    setShowModal(null);
  };

  const handleShow = (bookId) => {
    setShowModal(true);
  };

  return (
    <>
      <h1>Welcome to Recs Page</h1>
      <Button onClick={handleShow}>Open Modal</Button>
      <DisplayModal size='lg' show={showModal} handleClose={handleClose}>
        <h1>Hello world</h1>
        <div>
          <ImageCrop />
        </div>
      </DisplayModal>
    </>
  );
};

export default Welcome;
