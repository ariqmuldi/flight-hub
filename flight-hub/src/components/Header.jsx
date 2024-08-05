import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import PlaneIcon from './PlaneIcon';
import { useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    const handleClickRegister = () => {
      navigate("/register");
    }

    const handleClickHome = () => {
      navigate("/")
    }

    const handleClickLogin = () => {
      navigate("/login");
    }
    

    return (
    
          <Navbar className="navbar">
            <Container>
              <PlaneIcon className="plane-icon" onClick={handleClickHome}/>
              <Navbar.Brand className="navbar-brand" onClick={handleClickHome}>Flight Hub</Navbar.Brand>
              <Nav className="ms-auto">
                <Nav.Link className="navbar-items" onClick={handleClickHome} >Home</Nav.Link>
                <Nav.Link className="navbar-items">Offers</Nav.Link>
                <Nav.Link className="navbar-items">Blog</Nav.Link>
                <Nav.Link className="navbar-items" onClick={handleClickRegister}>Register</Nav.Link>
                <Nav.Link className="navbar-items" onClick={handleClickLogin} >Log In</Nav.Link>
              </Nav>
            </Container>
          </Navbar>
      
      );
}

export default Header
