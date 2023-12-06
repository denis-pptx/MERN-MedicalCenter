import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceList from '../components/Lists/ServiceList';


const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/service')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));
    }, []); 

    return (
        <div class="page">
            <h1>Services Page</h1>
            <ServiceList services={services} />
        </div>
    );
};

export default Services;
