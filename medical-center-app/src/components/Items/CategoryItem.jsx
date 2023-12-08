import React, { useContext } from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';
import AuthContext from '../../context/AuthContext';

const CategoryItem = (props) => {
    const { isAuth } = useContext(AuthContext);

    return (
        <div className={styles.card}>
            <div className={styles.cardContent}>
                <div className={styles.title}>
                    {props.category.name}
                </div>

                <div className={styles.description}>
                    Описание: {props.category.description}
                </div>
            </div>

            {isAuth && (
                <div className={styles.buttons}>
                    <MyButton onClick={() => props.onEdit(props.category)}>Изменить</MyButton>
                    <MyButton onClick={() => props.onDelete(props.category._id)}>Удалить</MyButton>
                </div>
            )}

        </div>
    );
};

export default CategoryItem;
