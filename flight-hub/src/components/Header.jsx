import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PlaneIcon from './PlaneIcon';

function Header() {
    return (
        <>
          <Navbar className="navbar">
            <Container>
              <PlaneIcon className="plane-icon" />
              <Navbar.Brand className="navbar-brand" href="#home">Flight Hub</Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link className="navbar-items" href="#home">Offers</Nav.Link>
                <Nav.Link className="navbar-items" href="#features">Blog</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
      );
}

export default Header
