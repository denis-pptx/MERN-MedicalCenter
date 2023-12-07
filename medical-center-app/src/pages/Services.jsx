import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceList from '../components/Lists/ServiceList';
import MySelect from '../components/UI/select/MySelect';

const Services = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/service')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));

        axios.get('http://localhost:5000/api/category')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const filteredServices = selectedCategory
        ? services.filter(service => service.category._id === selectedCategory)
        : services;

    return (
        <div className="page">
            <h1>Services Page</h1>

            <MySelect
                value={selectedCategory}
                onChange={(category) => setSelectedCategory(category)}
                defaultName="Категория"
                options={[
                    { name: 'Все', value: '' },
                    ...categories.map(category => ({
                        name: category.name,
                        value: category._id
                    }))
                ]}
            />


            <ServiceList services={filteredServices} />
        </div>
    );
};

export default Services;
