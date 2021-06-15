import React, { useState } from "react";
import Authentication from "../accounts/Authentication";
import { useAuth } from "../../contexts/AuthContext";
import SignUp from "../accounts/SignUp";
import DisplayModal from "../DisplayModal";
import "../../css/Welcome.css";
import { Button } from "react-bootstrap";

const Welcome = () => {
  const [haveAccount, setHaveAccount] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const signUp = () => {
    setHaveAccount(false);
    setShowModal(true);
  };
  const signIn = () => {
    setHaveAccount(true);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(null);
  };
  return (
    <>
      <div className='landing-page'>
        <DisplayModal show={showModal} handleClose={handleClose}>
          <Authentication
            handleClose={handleClose}
            doesUserExist={haveAccount}
          />
        </DisplayModal>

        <div className='create-account'>
          <h6>Sign up for an account</h6>
          <Button onClick={signUp}>Sign Up</Button>
        </div>
      </div>
    </>
  );
};

export default Welcome;
