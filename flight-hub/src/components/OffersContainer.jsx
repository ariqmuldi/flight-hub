import React, { useState, useEffect } from 'react';
import OffersInput from './OffersInput';
import OffersShowcase from './OffersShowcase';
import axios from 'axios';
import * as formik from 'formik';
import * as yup from 'yup';

function OffersContainer() {
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [iataCodes, setIataCodes] = useState([]);
    const [flightOffers, setFlightOffers] = useState(null);

    // Only one way works. Don't use round trip.
    const [formData, setFormData] = useState({
        tripType : "1",
        numPassengers : "",
        nonStop : false,    
        departureCity : "",
        arrivalCity : "",
        departureDate : "",
        returnDate : ""
    });

    const handleInputChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
            ...(name === 'tripType' && value === "1" && { returnDate: "" })
        }));

    };

    const getIataCodes = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:5000/get-destination-code', 
                { departureCity: formData.departureCity, arrivalCity: formData.arrivalCity}, 
                { headers: { 'Content-Type': 'application/json', }
            });

            if(response.data.success) {
                return response.data.iataCodes;
            }
            else {
                console.log(response.data.message)
                return [];
            }

        }
        catch (err) {
            console.log(err);
            return [];
        }
        
    }

    // Cases needed to handle: 
    // If it is one way, do not include returnDate. If it is two way, include returnDate
    // If count = 0, there is no nonstop flights there. Make sure of that!
    const searchFlights = async (iataCodes) => {
        if (iataCodes.length < 2) {
            console.log('Invalid IATA codes');
            return;
        }

        try {
            const response = await axios.post('http://127.0.0.1:5000/search-flights', 
                {originCode : iataCodes[0], destinationCode : iataCodes[1], 
                    fromDate : formData.departureDate, toDate : formData.returnDate, 
                    numPassengers : formData.numPassengers, tripType : formData.tripType , 
                    nonStop : formData.nonStop}, 
                {headers: { 'Content-Type': 'application/json', }})
            if(response.data.success) {
                setFlightOffers(response.data)
            }
            else {
                console.log(response.data.message)
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleFormSubmit = async (e) => {
        setIsFormSubmitted(true);
        console.log(formData)

        const iataCodes = await getIataCodes();
        if (iataCodes.length > 0) {
            setIataCodes(iataCodes);
        }
    }

    // Make sure iataCodes are updated
    useEffect(() => {
        if (isFormSubmitted && iataCodes.length > 0) {
            console.log(iataCodes);
            searchFlights(iataCodes);
        }
    }, [iataCodes, isFormSubmitted]);

    // Log flightOffers whenever it changes
    useEffect(() => {
        if (flightOffers) {
            console.log(flightOffers);
        }
    }, [flightOffers]);

    return (
        <div>
            <OffersInput 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleFormSubmit={handleFormSubmit} 
                isFormSubmitted = {isFormSubmitted}
            />
            {(isFormSubmitted && flightOffers != null) && <OffersShowcase formData={formData} flightOffers={flightOffers}/>}
        </div>
    );

}

export default OffersContainer;
