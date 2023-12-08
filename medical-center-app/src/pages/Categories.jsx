import React, { useState, useEffect, useContext } from 'react';
import $axios from '../http/index'
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import MyInput from '../components/UI/Inputs/MyInput';
import CategoryCreateForm from '../components/Forms/Category/CategoryCreateForm';
import CategoryUpdateForm from '../components/Forms/Category/CategoryUpdateForm';
import './Styles.css'
import AuthContext from '../context/AuthContext';
import CategoryList from '../components/Lists/CategoryList';

const Categories = () => {
    const { isAuth } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState('');
    const [modalCreate, setModalCreate] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingCategory, setEditingCategory] = useState({ name: '', description: '' });

    useEffect(() => {
        $axios.get('http://localhost:5000/api/category')
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories:', error));
    }, []);

    const searchedCategories = searchTerm
        ? categories.filter(category =>
            category.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : categories;


    const sortedCategories = sortOrder
        ? [...searchedCategories].sort((a, b) => {
            if (sortOrder === 'asc') {
                return a.name.localeCompare(b.name);
            } else {
                return b.name.localeCompare(a.name);
            }
        })
        : searchedCategories;


    const createCategory = (newCategory) => {
        $axios.post('/category', newCategory)
            .then(response => {
                setCategories([...categories, response.data]);
                alert('SERVER: created successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModalCreate(false);
    };

    const updateCategory = (updatedCategory) => {
        $axios.put(`/category/${updatedCategory._id}`, updatedCategory)
            .then(response => {
                const updatedCategories = categories.map(category =>
                    category._id === updatedCategory._id ? response.data : category
                );
                setCategories(updatedCategories);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteCategory = (id) => {
        $axios.delete(`/category/${id}`)
            .then(response => {
                setCategories(categories.filter(category => category._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Категории</h1>

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
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            defaultName="Сортировка"
                            options={[
                                { name: 'По умолчанию', value: '' },
                                { name: 'Алфавит (возрастание)', value: 'asc' },
                                { name: 'Алфавит (убывание)', value: 'desc' }
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
                                <CategoryCreateForm
                                    create={createCategory}
                                />
                            </MyModal>
                        </>
                    )}

                </div>

                <div className="main-content">

                    {sortedCategories.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <CategoryList
                            categories={sortedCategories}
                            onEdit={(category) => {
                                setEditingCategory({ ...category });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteCategory}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <CategoryUpdateForm
                            update={updateCategory}
                            editingCategory={editingCategory}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Categories;
