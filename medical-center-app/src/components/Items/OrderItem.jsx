import React from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';


const OrderItem = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>


                <div className={styles.description}>
                    Имя: {props.order.name}
                </div>
                <div className={styles.description}>
                    Телефон: {props.order.phone}
                </div>
                <div className={styles.description}>
                    Почта: {props.order.email}
                </div>
                <div className={styles.description}>
                    Услуга: {props.order.service ? props.order.service.name : "<удалена>"}
                </div>
                <div className={styles.description}>
                    Статус: {props.order.status}
                </div>
            </div>

            <div className={styles.buttons}>
                <MyButton onClick={() => props.onEdit(props.order)}>Изменить</MyButton>
                <MyButton onClick={() => props.onDelete(props.order._id)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default OrderItem;
