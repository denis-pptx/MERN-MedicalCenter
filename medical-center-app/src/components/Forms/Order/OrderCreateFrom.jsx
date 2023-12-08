import React, { useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import styles from '../Styles.module.css'

const OrderCreateForm = ({ service, create }) => {
    const defaultOrder = { name: '', phone: '', email: '' };

    const [order, setOrder] = useState(defaultOrder);
    const [error, setError] = useState('');

    const createOrder = (e) => {
        e.preventDefault();

        if (!order.name) {
            setError('Name is required');
            return;
        }

        if (order.name.length < 3 || order.name.length > 50) {
            setError('Name must be between 3 and 50 characters');
            return;
        }

        if (!order.phone) {
            setError('Phone is required');
            return;
        }

        const phoneRegex = /^\+375-\d{2}-\d{3}-\d{2}-\d{2}$/;
        if (!phoneRegex.test(order.phone)) {
            setError('Invalid phone number format. Use +375-XX-XXX-XX-XX.');
            return;
        }

        if (!order.email) {
            setError('Email is required');
            return;
        }

        const emailRegex = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
        if (!emailRegex.test(order.email)) {
            setError('Please enter a valid email address');
            return;
        }

        setError('');
        create(order);
        setOrder(defaultOrder);
    };

    return (
        <form class={styles.form}>
            <div class={styles.title}>Оформление заказа</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <MyInput
                    value={order.name}
                    onChange={(e) => setOrder({ ...order, name: e.target.value })}
                    type="text"
                    placeholder="Имя"
                />
            </div>

            <div class='form-group'>
                <MyInput
                    value={order.phone}
                    onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                    type="text"
                    placeholder="Телефон"
                />
            </div>

            <div class='form-group'>
                <MyInput
                    value={order.email}
                    onChange={(e) => setOrder({ ...order, email: e.target.value })}
                    type="email"
                    placeholder="Почта"
                />
            </div>

            <div class='form-group'>
                <MyInput
                    value={`${service.name}, ${service.cost}$`}
                    type="text"
                    disabled
                />
            </div>

            <MyButton onClick={createOrder}>Оформить</MyButton>
        </form>
    );
};

export default OrderCreateForm;
