import React from 'react';
import OrderItem from '../Items/OrderItem';

const OrderList = ({ orders, onEdit, onDelete }) => {
    return (
        <div>
            {orders.map(order => (
                <OrderItem
                    key={order._id}
                    order={order}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default OrderList;
