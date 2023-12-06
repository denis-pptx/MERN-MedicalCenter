import React from 'react';
import MyButton from '../UI/button/MyButton';
import './Styles.css';

const ServiceItem = (props) => {
    return (
        <div className="item">
            <div className="item__content">
                <strong>{props.service.name}</strong>
                <div>
                    {props.service.description}
                    <br></br>
                    {props.service.cost}$
                </div>
            </div>
            <div className="item__btns">
                <MyButton>Открыть</MyButton>
                <MyButton>Удалить</MyButton>
            </div>
        </div>
    );
};

export default ServiceItem;