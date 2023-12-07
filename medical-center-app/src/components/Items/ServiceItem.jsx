import React from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';

const ServiceItem = (props) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    {props.service.name}
                </div>

                <div className={styles.description}>
                    Описание: {props.service.description}
                </div>
                <div className={styles.category}>
                    Категория: {props.service.category.name}
                </div>
                <div className={styles.cost}>
                    Стоимость: {props.service.cost}$
                </div>
            </div>
            <div className={styles.buttons}>
                <MyButton onClick={() => props.onEdit(props.service)}>Изменить</MyButton>
                <MyButton onClick={() => props.onDelete(props.service._id)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default ServiceItem;
