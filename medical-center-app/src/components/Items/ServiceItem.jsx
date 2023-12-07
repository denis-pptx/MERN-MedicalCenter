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
                <MyButton className={styles.button}>Открыть</MyButton>
                <MyButton className={styles.button}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default ServiceItem;
