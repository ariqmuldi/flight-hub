import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';
import * as formik from 'formik';
import * as yup from 'yup';

function OffersInput({ formData, handleInputChange, handleFormSubmit, isFormSubmitted }) {
    const {haveSubmitted, setHaveSubmitted} = useState(false)
    const { Formik } = formik;
    const schema = yup.object().shape({
        numPassengers: yup.number()
        .required('Number of passengers is required')
        .typeError('Number of passengers must be a number')
        .positive('Number of passengers must be a positive number')
        .integer('Number of passengers must be an integer'),

        departureCity: yup.string().required(),
        arrivalCity: yup.string().required(),

        departureDate: yup.string()
        .required('Departure date is required')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'Departure date must be in the format YYYY-MM-DD'
        ),

        returnDate : yup.string()
        .required('Departure date is required')
        .matches(
            /^\d{4}-\d{2}-\d{2}$/,
            'Departure date must be in the format YYYY-MM-DD'
        )
        
    });
    
    return (
        <Formik
            initialValues={formData}
            validationSchema={schema}
            onSubmit={(e, { setSubmitting }) => { handleFormSubmit(e); setSubmitting(false); }}
        >
        {({ handleSubmit, handleChange, resetForm, values, touched, errors, isSubmitting }) => (
        <Container className="d-flex justify-content-evenly align-items-center mt-2">
            <Form onSubmit={(e) => { handleSubmit(e); handleFormSubmit(e); }}>
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
                            name="numPassengers" value={values.numPassengers} onChange={(e) => {
                                handleChange(e);
                                handleInputChange(e);
                            }} 
                            isInvalid={touched.numPassengers && !!errors.numPassengers}
                            isValid={touched.numPassengers && !errors.numPassengers} />
                            <Form.Control.Feedback type="invalid">
                                {errors.numPassengers}
                            </Form.Control.Feedback>
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
                            value={values.departureCity} onChange={(e) => {
                                handleChange(e);
                                handleInputChange(e);
                            }} isInvalid={touched.departureCity && !!errors.departureCity}
                            isValid={touched.departureCity && !errors.departureCity} />
                            <Form.Control.Feedback type="invalid">
                                {errors.departureCity}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>To</Form.Label>
                            <Form.Control type="text" placeholder="Arrival City" name="arrivalCity" 
                            value={values.arrivalCity} onChange={(e) => {
                                handleChange(e);
                                handleInputChange(e);
                            }} isInvalid={touched.arrivalCity && !!errors.arrivalCity}
                            isValid={touched.arrivalCity && !errors.arrivalCity} />
                            <Form.Control.Feedback type="invalid">
                                {errors.arrivalCity}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Departure Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter YYYY-MM-DD" name="departureDate" 
                            value={values.departureDate} onChange={(e) => {
                                handleChange(e);
                                handleInputChange(e);
                            }} isInvalid={touched.departureDate && !!errors.departureDate}
                            isValid={touched.departureDate && !errors.departureDate} />
                            <Form.Control.Feedback type="invalid">
                                {errors.departureDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>

                    {formData.tripType == 1 ? null 
                    : 
                    <Col mb={3} className="text-light">
                        <Form.Group className="mb-3" controlId="formBasicText" >
                            <Form.Label>Return Date</Form.Label>
                            <Form.Control type="text" placeholder="Enter YYYY-MM-DD" name="returnDate" 
                            value={values.returnDate} onChange={(e) => {
                                handleChange(e);
                                handleInputChange(e);
                            }} isInvalid={touched.returnDate && !!errors.returnDate}
                            isValid={touched.returnDate && !errors.returnDate}/>
                            <Form.Control.Feedback type="invalid">
                                {errors.returnDate}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Col>
                    }

                </Row>

                <Row>
                    <Col className="d-flex align-items-center justify-content-center mt-2">
                        {isFormSubmitted ?
                        <Button className="buttonSearchFlightOffers" variant="success" type="submit" 
                        onClick={() => (window.location.reload())}>
                        Find more offers
                        </Button>
                        :
                        <Button className="buttonSearchFlightOffers" variant="primary" type="submit">
                        Search flight offers
                        </Button>
                        }
                    </Col>
                </Row>
            </Form>
        </Container>
        )}
        </Formik>
    )
}

export default OffersInput;
