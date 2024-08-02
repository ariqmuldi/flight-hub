import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function FormEmail() {
    return (
        
        <Container className="d-flex flex-column justify-content-around align-items-center">
            <Row>
            <Container className="text-center mb-2">
                {/* <Form.Label>Email address</Form.Label> */}
                <p className="fw-bold h2 text-white"> Write your email below! </p>
            </Container>
            </Row>
            <Row>
            <Form>
                <Form.Group className="" controlId="formBasicEmail">

                    <Container>
                        <Form.Control type="email" placeholder="Enter your email to join!" />
                    </Container>
                
                    <Container className="mt-2 mb-2 mx-auto text-muted text-center" >
                        <Form.Text>
                        We'll never share your email with anyone else.
                        </Form.Text>
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
