import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import "../css/MyNavbar.css";

const MyNavbar = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' className='navbar' sticky='top'>
        <Navbar.Brand>Recs Page</Navbar.Brand>
        <Nav className='mr-auto'>
          <Nav.Link href='#home'>Home</Nav.Link>
          <Nav.Link href='#pricing'>Logout</Nav.Link>
        </Nav>
      </Navbar>
    </>
  );
};

export default MyNavbar;
