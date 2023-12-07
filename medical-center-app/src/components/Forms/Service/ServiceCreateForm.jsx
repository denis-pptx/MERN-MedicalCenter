import React, { useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MyTextArea from '../../UI/Inputs/MyTextArea';
import MySelect from '../../UI/Inputs/MySelect';
import styles from '../Styles.module.css'

const ServiceCreateForm = ({ create, categories }) => {
    const defaultService = {
        name: '',
        description: '',
        cost: 0,
        category: '',
    };

    const [service, setService] = useState(defaultService);
    const [error, setError] = useState('');

    const createService = (e) => {
        e.preventDefault();

        if (!service.name) {
            setError('Name is required');
            return;
        }

        if (service.name.length < 3 || service.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        if (service.description.length > 500) {
            setError('Description cannot exceed 500 characters');
            return;
        }

        if (service.cost < 0) {
            setError('Cost cannot be negative');
            return;
        }

        if (!service.category) {
            setError('Category is required');
            return;
        }

        setError('');
        create(service);
        setService(defaultService);
    };

    return (
        <form class={styles.form}>
            <div class={styles.title}>Создание услуги</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <MyInput
                    value={service.name}
                    onChange={(e) => setService({ ...service, name: e.target.value })}
                    type="text"
                    placeholder="Название услуги"
                />
            </div>


            <div class='form-group'>
                <MyTextArea
                    value={service.description}
                    onChange={(e) => setService({ ...service, description: e.target.value })}
                    placeholder="Описание"
                />
            </div>

            <div class='form-group'>
                <MyInput
                    value={service.cost}
                    onChange={(e) => setService({ ...service, cost: e.target.value })}
                    type="number"
                    placeholder="Стоимость"
                />
            </div>

            <div class='form-group'>
                <MySelect
                    value={service.category}
                    onChange={(e) => setService({ ...service, category: e.target.value })}
                    defaultName="Категория"
                    options={categories.map((category) => ({
                        name: category.name,
                        value: category._id,
                    }))}
                />
            </div>

            <MyButton onClick={createService}>Создать</MyButton>
        </form>
    );
};

export default ServiceCreateForm;
