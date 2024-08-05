import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/esm/Row';

function UserForm(props) {
    return (
        <Container className="d-flex flex-column align-items-center">
            <Row className="text-light mt-3 mb-3">
                { props.formType === "login" ? <h3> Login To Flight Hub </h3> : <h3> Register To Flight Hub </h3> }
            </Row>

            <Row>
            <Form className="w-100">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
            </Form>
            </Row>

            <Row>
                <Button className="buttonEmailForm" variant="primary" type="submit">
                { props.formType === "login" ? <span> Login </span> : <span> Register </span> }
                </Button>
            </Row>
            
            
        </Container>
    )
}

export default UserForm;