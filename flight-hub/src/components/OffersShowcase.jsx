import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OffersShowcase({ formData, flightOffers } ) {
    console.log(flightOffers.flightOffers[1])
    return (
        <div>
            <h2>Flight Offers</h2>
            <p>Trip Type: {formData.tripType === "1" ? "One way" : "Round trip"}</p>
            <p>Number of Passengers: {formData.numPassengers}</p>
            <p> {typeof formData.numPassengers}</p>
            <p>Nonstop Only: {formData.nonStop ? "Yes" : "No"}</p>
            <p>Departure City: {formData.departureCity}</p>
            <p>Arrival City: {formData.arrivalCity}</p>
            <p>Departure Date: {formData.departureDate}</p>
            <p>Return Date: {formData.returnDate}</p>
        </div>
    );
}

export default OffersShowcase;
