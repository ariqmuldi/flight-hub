import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';

function OffersInput({ formData, handleInputChange, handleSubmit }) {
    return (
        <Container className="d-flex justify-content-evenly align-items-center mt-2">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={3}>
                        <Form.Select 
                        aria-label="Default select example" name="tripType" value = {formData.tripType} 
                        onChange={handleInputChange}>
                        <option value="1">One way</option>
                        <option value="2">Round trip</option>
                        </Form.Select>
                    </Col>

                    <Col md={5}> 
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Control type="text" placeholder="Enter no. passengers" 
                            name="numPassengers" value={formData.numPassengers} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col md={4} className="d-flex align-items-center text-light">
                        
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Nonstop only" name="nonStop" 
                            checked={formData.nonStop} onChange={handleInputChange}/>
                        </Form.Group>
                    </Col>     
                </Row>

                <Row>
                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>From</Form.Label>
                            <Form.Control type="text" placeholder="Departure City" name="departureCity"
                            value={formData.departureCity} onChange={handleInputChange}/>
                        </Form.Group>
                    </Col>

                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>To</Form.Label>
                            <Form.Control type="text" placeholder="Arrival City" name="arrivalCity" 
                            value={formData.arrivalCity} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Departure Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter YYYY-MM-DD" name="departureDate" 
                            value={formData.departureDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>

                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter YYYY-MM-DD" name="returnDate" 
                            value={formData.returnDate} onChange={handleInputChange} />
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col className="d-flex align-items-center justify-content-center mt-2">
                        <Button className="buttonSearchFlightOffers" variant="primary" type="submit">
                        Search flight offers
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}

export default OffersInput;
