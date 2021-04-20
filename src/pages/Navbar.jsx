import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../css/MyNavbar.css";

const MyNavbar = () => {
  const { currentUser, signOut } = useAuth();

  return (
    <>
      <Navbar bg='dark' variant='dark' className='navbar' sticky='top'>
        <Navbar.Brand>
          Recs <span>page</span>
        </Navbar.Brand>
        {currentUser ? (
          <Nav className='ml-auto'>
            <Link to='/'>
              <Nav>Home</Nav>
            </Link>
            <Nav onClick={() => signOut()}>Logout</Nav>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Link to='/signin'>
              <Nav>Register</Nav>
            </Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default MyNavbar;
