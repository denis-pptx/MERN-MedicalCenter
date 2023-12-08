import React, { useEffect, useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MyTextArea from '../../UI/Inputs/MyTextArea';
import styles from '../Styles.module.css'

const CategoryUpdateForm = ({ update, editingCategory }) => {
    const defaultCategory = { name: '', description: '' };

    const [category, setCategory] = useState(defaultCategory);
    const [error, setError] = useState('');

    useEffect(() => setCategory(editingCategory), [editingCategory]);

    const updateCategory = (e) => {
        e.preventDefault();

        if (!category.name) {
            setError('Name is required');
            return;
        }

        if (category.name.length < 3 || category.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        if (category.description.length > 500) {
            setError('Description cannot exceed 500 characters');
            return;
        }

        setError('');
        update(category);
        setCategory(defaultCategory);
    };


    return (
        <form class={styles.form}>
            <div class={styles.title}>Изменение категории</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <MyInput
                    value={category.name}
                    onChange={(e) => setCategory({ ...category, name: e.target.value })}
                    type="text"
                    placeholder="Название категории"
                />
            </div>


            <div class='form-group'>
                <MyTextArea
                    value={category.description}
                    onChange={(e) => setCategory({ ...category, description: e.target.value })}
                    placeholder="Описание"
                />
            </div>

            <MyButton onClick={updateCategory}>Сохранить</MyButton>
        </form>
    );
};

export default CategoryUpdateForm;
