import React from "react";
import BookDetails from "./BookDetails";
import { Modal, Button } from "react-bootstrap";

const DisplayModal = ({ show, displayBook, handleShow, handleClose }) => {
  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{displayBook.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BookDetails book={displayBook} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayModal;
