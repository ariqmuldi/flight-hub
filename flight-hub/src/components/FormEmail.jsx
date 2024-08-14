import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';


function FormEmail() {
    const [email, setEmail] = useState('');   
    const [phoneNumber, setPhoneNumber] = useState('');
    const [departureCity, setDepartureCity] = useState('');
    const [arrivalCity, setArrivalCity] = useState('');
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsFormSubmitted(true)
        console.log("Form was submitted");
        console.log(email)

        try {
            // Make a POST request to the Flask backend with the email data
            const response = await axios.post('http://127.0.0.1:5000/submitted-users', 
                { email: email, phoneNumber: phoneNumber, departureCity : departureCity, arrivalCity : arrivalCity}, 
                {
                headers: {
                    'Content-Type': 'application/json', // Set the content type to JSON
                }
            });

            console.log(response.data.message); // Log the response message from the backend. Should be "Email Recieved"
        } catch (error) {
            console.error('Error:', error);
        }

    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePhoneNumberChange(e) {
        setPhoneNumber(e.target.value)
    }

    function handleDepartureCityChange(e) {
        setDepartureCity(e.target.value)
    }

    function handleArrivalCityChange(e) {
        setArrivalCity(e.target.value)
    }

    return (
        
        <Container className="d-flex flex-column justify-content-around align-items-center">
            <Row>
            <Container className="text-center mb-2">
                {/* <Form.Label>Email address</Form.Label> */}
                <p className="fw-bold h2 text-white"> Write your email and phone number below! </p>
            </Container>
            <Container className="text-center mb-1">
                {/* <Form.Label>Email address</Form.Label> */}
                <p className="fw-bold h6 text-white"> We will send an offer to your email and phone every midnight! (One Way only for now!) </p>
                { isFormSubmitted ?
                <p className="text-success fw-bold">Success!</p>
                :
                null
                }
            </Container>
            </Row>
            <Row className="d-flex flex-column justify-content-around align-items-center">
            
            <Form onSubmit={handleSubmit} action="POST">
                <Form.Group className="" controlId="formBasicEmail">

                    <Container>
                        <Form.Control type="email" name = "submitEmail" value={email} onChange={handleEmailChange} placeholder="Enter your email to join!" />
                    </Container>
                
                    <Container className="mt-2 mb-2 mx-auto text-muted text-center" >
                        <Form.Text>
                        We'll never share your email or phone number with anyone else.
                        </Form.Text>
                    </Container>

                    <Container className="mb-3">
                        <Form.Control type="text" name = "submitPhoneNumber" value={phoneNumber} onChange={handlePhoneNumberChange} placeholder="Enter your phone number to join!" />
                    </Container>

                    <Container className="">
                        <Form.Control type="text" name="departureCity" value={departureCity} placeholder="Enter departure city" 
                        onChange={handleDepartureCityChange} />
                    </Container>

                    <Container className="mt-2 mb-2 mx-auto text-muted text-center" >
                        <Form.Text className="text-muted mt-2 mb-2 mx-auto text-center">
                        Enter your departure city and arrival city!
                        </Form.Text>
                    </Container>

                    <Container className="mb-3">
                        <Form.Control type="text" name="arrivalCity" placeholder="Enter arrival city" value={arrivalCity} onChange={handleArrivalCityChange}/>
                    </Container>

                </Form.Group>

                

                <Container className="text-center">
                    <Button className="buttonEmailForm" variant="primary" type="submit">
                    Submit
                    </Button>
                </Container>

            </Form>
            </Row>
        </Container>
    )
}

export default FormEmail;
