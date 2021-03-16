import React from "react";
import { Button, Modal } from "react-bootstrap";

const RecModal = ({ show, close }) => {
  return (
    <>
      <Modal.Dialog className='bootstrap-modal'>
        <Modal.Header closeButton>
          <Modal.Title>Add Book</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>Hello World</h3>
        </Modal.Body>

        <Modal.Footer>
          <Button variant='secondary'>Close</Button>
          <Button variant='primary'>Add Rec</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </>
  );
};

export default RecModal;
