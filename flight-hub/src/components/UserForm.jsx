import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserForm(props) {
    const [email, setEmail] = useState('');  
    const [password, setPassword] = useState('');  
    const [name, setName] = useState(''); 
    const [message, setMessage] = useState(''); 
    const [redirectLogin, setRedirectLogin] = useState(null);
    const saltRounds = 8;
    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the Flask backend with email and password data
            const response = await axios.post('http://127.0.0.1:5000/register', 
                {
                name : name, 
                email: email,
                password : password,
                }, 
                {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                }
            });

            console.log(response.data); // Log the response message from the backend. Should be "Email Recieved"
            setMessage(response.data.message);
            setRedirectLogin(response.data.redirectLogin);

            console.log(response.data.redirectLogin)

            if (response.data.redirectLogin) {
                setTimeout(() => {
                    navigate('/login'); // Redirect to login page
                    setMessage(''); // Clear message
                    setRedirectLogin(false); // Reset redirectLogin
                }, 2500); // Optional delay for user to see the message
            }

        } catch (error) {
            console.error('Error:', error);
        }
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }

    return (
        <Container className="d-flex flex-column align-items-center">
            <Row className="text-light mt-3">
                { props.formType === "login" ? <h3> Login To Flight Hub </h3> : <h3> Register To Flight Hub </h3> }
            </Row>

            { redirectLogin === true ? 
            <Row className="text-danger mt-1">
            <h6> {message} </h6> 
            </Row>
            : 
            <Row className="text-success mt-1">
            <h6> {message} </h6> 
            </Row>
            }
            
            <Row>
            <Form className="w-100" onSubmit={handleSubmit}>
                { props.formType === "login" ? 
                null :
                <Form.Group className="mb-3" controlId="formBasicText" >
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter email" name="name" onChange={handleNameChange}/>
                </Form.Group>
                }
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter name" name="email" onChange={handleEmailChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handlePasswordChange}/>
                </Form.Group>
            
                <Button className="buttonEmailForm" variant="primary" type="submit">
                { props.formType === "login" ? <span> Login </span> : <span> Register </span> }
                </Button>
            </Form>
            </Row>

        </Container>
    )
}

export default UserForm;
