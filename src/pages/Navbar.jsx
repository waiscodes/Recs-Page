import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/MyNavbar.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' className='navbar' sticky='top'>
        <Navbar.Brand>
          Recs <span>page</span>
        </Navbar.Brand>
        <Nav className='ml-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#logout'>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default MyNavbar;
