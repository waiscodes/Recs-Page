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
          <Link to='/' className='remove-href'>
            Recs <span>page</span>
          </Link>
        </Navbar.Brand>
        {currentUser ? (
          <Nav className='ml-auto'>
            <Nav.Link href='/'>Home</Nav.Link>
            <Nav.Link onClick={() => signOut()}>Logout</Nav.Link>
          </Nav>
        ) : (
          <Nav className='ml-auto'>
            <Nav.Link href='/signup'>Register</Nav.Link>
            <Nav.Link href='/signin'>Login</Nav.Link>
          </Nav>
        )}
      </Navbar>
    </>
  );
};

export default MyNavbar;
