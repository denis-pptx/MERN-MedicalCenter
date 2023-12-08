import React, { useEffect, useState } from 'react';
import MyInput from '../../UI/Inputs/MyInput';
import MyButton from '../../UI/button/MyButton';
import MySelect from '../../UI/Inputs/MySelect';
import styles from '../Styles.module.css'

const OrderUpdateForm = ({ update, editingOrder, statusArray }) => {
    const defaultOrder = { name: '', phone: '', email: '', service_name: '', status: '' };

    const [order, setOrder] = useState(defaultOrder);
    const [error, setError] = useState('');

    useEffect(() => setOrder(editingOrder), [editingOrder]);

    const updateOrder = (e) => {
        e.preventDefault();

        if (!order.status) {
            setError('Status is required');
            return;
        }

        if (!statusArray.map(status => status.name).includes(order.status)) {
            setError('Status is incorrect');
            return;
        }

        setError('');
        update(order);
        setOrder(defaultOrder);
    };

    return (
        <form class={styles.form}>
            <div class={styles.title}>Изменение статуса заказа</div>

            {error && <div className={styles['error-message']}>{error}</div>}

            <div class='form-group'>
                <h3>Имя</h3>
                <MyInput
                    value={order.name}
                    type="text"
                    disabled
                />
            </div>

            <div class='form-group'>
                <h3>Телефон</h3>
                <MyInput
                    value={order.phone}
                    type="text"
                    disabled
                />
            </div>

            <div class='form-group'>
                <h3>Почта</h3>
                <MyInput
                    value={order.email}
                    type="text"
                    disabled
                />
            </div>

            <div class='form-group'>
                <h3>Услуга</h3>
                <MyInput
                    value={order.service_name}
                    type="text"
                    disabled
                />
            </div>


            <div class='form-group'>
                <MySelect
                    value={order.category}
                    onChange={(e) => setOrder({ ...order, status: e.target.value })}
                    defaultName="Статус"
                    options={statusArray.map((status) => ({
                        name: status.name,
                        value: status.name,
                    }))}
                />
            </div>

            <MyButton onClick={updateOrder}>Сохранить</MyButton>
        </form>
    );
};

export default OrderUpdateForm;
