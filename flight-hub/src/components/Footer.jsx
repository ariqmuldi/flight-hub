import React from 'react'
import { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PlaneIcon from './PlaneIcon';
import Row from 'react-bootstrap/esm/Row';

function Footer() {

    const [year, setYear] = useState(new Date().getFullYear());

    useEffect(() => {
        setYear(new Date().getFullYear());
    }, []);

    return (
        <>
          <Navbar className="navbar mt-5">
            <Container>
              <PlaneIcon className="plane-icon" />
              <Nav className="ms-auto">
                <Nav.Link className="navbar-items" href="#home">Copyright © {year}</Nav.Link>
                <Nav.Link className="navbar-items" href="#home">Contact</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </>
    )
}

export default Footer;
