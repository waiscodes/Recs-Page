import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../../css/MyNavbar.css";
import DisplayModal from "../DisplayModal";
import Authentication from "../accounts/Authentication";

const MyNavbar = () => {
  const { currentUser, signOut } = useAuth();
  const [showModal, setShowModal] = useState(false);

  const signUp = () => {
    setShowModal(true);
  };
  const signIn = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(null);
  };

  return (
    <>
      <DisplayModal show={showModal} handleClose={handleClose}>
        <Authentication handleClose={handleClose} />
      </DisplayModal>

      <Navbar bg='dark' variant='dark' className='navbar' sticky='top'>
        <Navbar.Brand>
          <Link to='/' className='remove-href'>
            Recs <span>page</span>
          </Link>
        </Navbar.Brand>
        {currentUser ? (
          <Nav className='ml-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link href='/welcome' onClick={() => signOut()}>
              Logout
            </Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link onClick={signUp}>Register</Nav.Link>
            <Nav.Link onClick={signIn}>Login</Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default MyNavbar;
