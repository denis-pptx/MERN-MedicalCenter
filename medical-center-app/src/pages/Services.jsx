import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceList from '../components/Lists/ServiceList';

import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import ServiceCreateForm from '../components/Forms/Service/ServiceCreateForm';



const Services = () => {
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modal, setModal] = useState(false);

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

    const filteredSearchedServices = searchTerm
        ? filteredServices.filter(service =>
            service.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : filteredServices;


    const sortedServices = sortOrder
        ? [...filteredSearchedServices].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.cost - b.cost;
            } else {
                return b.cost - a.cost;
            }
        })
        : filteredSearchedServices;

    const createService = (newService) => {
        axios.post('http://localhost:5000/api/service', newService)
            .then(response => {
                setServices([...services, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModal(false);
    };

    return (
        <div className="page">
            <h1>Services Page</h1>

            <MyButton onClick={() => setModal(true)}>
                Создать услугу
            </MyButton>

            <MyModal visible={modal} setVisible={setModal}>
                <ServiceCreateForm
                    create={createService}
                    categories={categories}
                />
            </MyModal>

            <MyInput
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Название"
            />

            <MySelect
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                defaultName="Категория"
                options={[
                    { name: 'Все', value: '' },
                    ...categories.map(category => ({
                        name: category.name,
                        value: category._id
                    }))
                ]}
            />

            <MySelect
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                defaultName="Сортировка"
                options={[
                    { name: 'По умолчанию', value: '' },
                    { name: 'Цена (возрастание)', value: 'asc' },
                    { name: 'Цена (убывание)', value: 'desc' }
                ]}
            />

            <ServiceList services={sortedServices} />
        </div>
    );
};

export default Services;
