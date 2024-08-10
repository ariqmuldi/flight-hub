import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/esm/Container';
import PlaneIcon from './PlaneIcon.jsx'
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';

function OffersShowcase({ formData, flightOffers } ) {
    var offers = [flightOffers.flightOffers[1], flightOffers.flightOffers[2], flightOffers.flightOffers[3]];
    console.log(offers);
    
    const offersShowcase = offers.map((offer, index) => {
        var flightRoutes = Object.values(offer["departure_flight_routes"]).map(route => route); 
        console.log(flightRoutes);
        return (
            <Container key={index} className="d-flex flex-column justify-content-evenly align-items-center text-center">
                <Row className="h1 text-light mt-5 d-flex justify-content-center align-items-center mb-3" >
                    <Col>
                        <span>{offer.origin}</span>
                    </Col>
                    <Col>
                        <PlaneIcon />
                
                    </Col>
                    
                    <Col>
                    <span>{offer.destination}</span>
                    </Col>
                </Row>
                <Row className="text-light h6 mb-3">
                    <span className="h6"> Flight Offer: {index + 1}</span><br></br>
                    <span className="h6"> Source: {offer.source}</span>
                </Row>

                <Row className="h4 text-light">
                    <span>Total price: {offer["flight-price"]}</span>
                    <span>Out date: {offer["out-date"]}</span>
                    <span>Total flight duration: {offer["total-departure-flight-duration"]}</span>
                </Row>

                <Row className="h5 text-light mt-3">
                    <p>Routes:</p>
                    {
                        flightRoutes.map((route, index) => {
                            return (
                                <Col>
                                    <span className="h5">{route.departureCode} to {route.arrivalCode} <br /> </span>
                                    <span className="h6"> Flight Duration: {route.flightDuration} </span> <br />
                                    <span className="h6"> Departure Time: {route.departureTime} </span> <br />
                                    <span className="h6"> Arrival Time: {route.arrivalTime} </span>
                                    <hr></hr>
                                </Col>
                                
                            );
                        })
                    }
                    
                    
                </Row>
                
            </Container>
        )
    });

    return ( 
        <>
            {offersShowcase}
        </>
              
    );
}

export default OffersShowcase;
