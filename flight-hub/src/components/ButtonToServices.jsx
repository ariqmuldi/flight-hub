import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function ButtonToServices(props) {
    return (
        <Container className="d-flex flex-column justify-content-around align-items-center">
            <Row className="mt-4 w-50 text-light border-top border-top-5">
                <hr></hr>
            </Row>

            <Row>
                <p className="fw-bold h2 text-white"> {props.name} </p>
            </Row>

            <Row>
                <Container className="text-center mt-2">
                    <Button className="buttonEmailForm" variant="primary" type="submit">
                    {props.buttonName}
                    </Button>
                </Container>
            </Row>
        </Container>
    )
}

export default ButtonToServices;
