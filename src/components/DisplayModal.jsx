import React from "react";
import BookDetails from "./BookDetails";
import { Modal } from "react-bootstrap";

const DisplayModal = ({ show, displayBook, handleClose }) => {
  return (
    <>
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Body>
          <BookDetails book={displayBook} close={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DisplayModal;
