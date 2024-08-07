import React, { useState } from 'react';
import OffersInput from './OffersInput';
import OffersShowcase from './OffersShowcase';

function OffersContainer() {
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
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    }

    return (
        <div>
            <OffersInput 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
            />
            <OffersShowcase formData={formData} />
        </div>
    );

}

export default OffersContainer;