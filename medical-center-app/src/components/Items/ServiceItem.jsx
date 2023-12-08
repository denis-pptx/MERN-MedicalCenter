import React, { useContext, useState } from 'react';
import MyButton from '../UI/button/MyButton';
import styles from './Styles.module.css';
import AuthContext from '../../context/AuthContext';
import OrderCreateForm from '../Forms/Order/OrderCreateFrom';
import MyModal from '../UI/MyModal/MyModal';
import $axios from '../../http'

const ServiceItem = (props) => {
    const { isAuth } = useContext(AuthContext);
    const [modal, setModal] = useState(false);

    const createOrder = (newOrder) => {
        $axios.post('/order', { ...newOrder, service: props.service._id})
            .then(response => {
                alert('SERVER: ordered successfully')
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`)
            });

        setModal(false);
    };

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
                {isAuth && (
                    <>
                        <MyButton onClick={() => props.onEdit(props.service)}>Изменить</MyButton>
                        <MyButton onClick={() => props.onDelete(props.service._id)}>Удалить</MyButton>
                    </>
                )}

                <MyButton onClick={() => setModal(true)}>Оформить</MyButton>
            </div>


            <MyModal visible={modal} setVisible={setModal}>
                <OrderCreateForm
                    create={createOrder}
                    service={props.service}
                />
            </MyModal>

        </div>
    );
};

export default ServiceItem;
