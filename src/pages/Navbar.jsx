import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Navbar, Nav } from "react-bootstrap";
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
            <Nav.Link>Home</Nav.Link>
            <Nav.Link onClick={() => signOut()}>Logout</Nav.Link>
          </Nav>
        ) : (
          ""
        )}
      </Navbar>
    </>
  );
};

export default MyNavbar;
