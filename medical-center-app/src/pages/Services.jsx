import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css'
import MyButton from '../components/UI/button/MyButton';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        // Fetch services
        axios.get('http://localhost:5000/api/service')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));
    }, []);

    return (
        <div className="page">

            <h2>All Services</h2>

            {/* Display all services */}
            {services.map(service => (
                <div key={service._id}>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                    <p>Cost: {service.cost}</p>
                    <p>Category: {service.category.name}</p>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default Services;
