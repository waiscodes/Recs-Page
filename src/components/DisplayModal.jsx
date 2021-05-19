import React from "react";
import { Modal } from "react-bootstrap";

const DisplayModal = ({ show, handleClose, children }) => {
  return (
    <>
      <Modal
        aria-labelledby='contained-modal-title-vcenter'
        centered
        show={show}
        onHide={handleClose}
        animation={false}
      >
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </>
  );
};

export default DisplayModal;
