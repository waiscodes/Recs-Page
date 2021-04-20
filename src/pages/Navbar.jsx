import React, { useRef } from "react";
import {
  Navbar,
  Nav,
  NavDropdown,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";

const Navbar1 = () => {
  const searchRef = useRef();

  const goToCart = () => {
    console.log("Redirect to cart");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    console.log(searchRef.current.value);
  };

  return (
    <>
      <Navbar collapseOnSelect expand='md' bg='clear' variant='dark'>
        <Navbar.Brand href='#home'>NixTech</Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
            <NavDropdown title='Dropdown' id='collapsible-nav-dropdown'>
              <NavDropdown.Item href='#action/3.1'>Action</NavDropdown.Item>
              <NavDropdown.Item href='#action/3.2'>
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href='#action/3.3'>Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href='#action/3.4'>
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline onSubmit={handleSearch}>
            <FormControl
              type='text'
              placeholder='Search'
              className='mr-sm-2'
              ref={searchRef}
            />
            <Button variant='outline-primary'>Search</Button>
          </Form>
        </Navbar.Collapse>
        <Button variant='outline-success ml-2' onClick={goToCart}>
          Go To Cart
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-cart m-1'
            viewBox='0 0 16 16'
          >
            <path d='M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z' />
          </svg>
        </Button>
      </Navbar>
    </>
  );
};

export default Navbar1;
