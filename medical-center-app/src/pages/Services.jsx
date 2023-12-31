import React, { useState, useEffect, useContext } from 'react';
import $axios from '../http/index'
import ServiceList from '../components/Lists/ServiceList';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import ServiceCreateForm from '../components/Forms/Service/ServiceCreateForm';
import ServiceUpdateForm from '../components/Forms/Service/ServiceUpdateForm';
import './Styles.css'
import AuthContext from '../context/AuthContext';

const Services = () => {
    const { isAuth } = useContext(AuthContext);
    const [services, setServices] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingService, setEditingService] = useState({ name: '', description: '', cost: 0, category: '' });

    useEffect(() => {
        $axios.get('/service')
            .then(response => setServices(response.data))
            .catch(error => console.error('Error fetching services:', error));

        $axios.get('/category')
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
        $axios.post('/service', newService)
            .then(response => {
                setServices([...services, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModalCreate(false);
    };

    const updateService = (updatedService) => {
        $axios.put(`/service/${updatedService._id}`, updatedService)
            .then(response => {
                const updatedServices = services.map(service =>
                    service._id === updatedService._id ? response.data : service
                );
                setServices(updatedServices);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteService = (id) => {
        $axios.delete(`/service/${id}`)
            .then(response => {
                setServices(services.filter(service => service._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Услуги</h1>

            <div className="content-container">

                <div className="sidebar">

                    <div class='form-group'>
                        <MyInput
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Название"
                        />
                    </div>

                    <div class='form-group'>
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
                    </div>

                    <div class='form-group'>
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
                    </div>

                    {isAuth && (
                        <>
                            <div class='form-group'>
                                <MyButton onClick={() => setModalCreate(true)} style={{ width: '100%' }}>
                                    Создать
                                </MyButton>
                            </div>

                            <MyModal visible={modalCreate} setVisible={setModalCreate}>
                                <ServiceCreateForm
                                    create={createService}
                                    categories={categories}
                                />
                            </MyModal>
                        </>
                    )}

                </div>

                <div className="main-content">

                    {sortedServices.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <ServiceList
                            services={sortedServices}
                            onEdit={(service) => {
                                setEditingService({ ...service, category: service.category._id });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteService}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <ServiceUpdateForm
                            update={updateService}
                            editingService={editingService}
                            categories={categories}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Services;
