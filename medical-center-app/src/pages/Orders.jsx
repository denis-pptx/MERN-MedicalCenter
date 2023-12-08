import React, { useState, useEffect } from 'react';
import $axios from '../http/index'
import OrderList from '../components/Lists/OrderList';
import MyModal from '../components/UI/MyModal/MyModal';
import MySelect from '../components/UI/Inputs/MySelect';
import OrderUpdateForm from '../components/Forms/Order/OrderUpdateForm';
import './Styles.css'


const Orders = () => {

    const statusArray = [
        { id: 1, name: 'pending' },
        { id: 2, name: 'confirmed' },
        { id: 3, name: 'completed' },
        { id: 4, name: 'cancelled' }
    ];

    const [orders, setOrders] = useState([]);
    const [selectedStatus, setSelectedStatus] = useState('');
    const [modalUpdate, setModalUpdate] = useState(false);
    const [editingOrder, setEditingOrder] = useState({ name: '', phone: '', email: '', service_name: '', status: '' });

    useEffect(() => {
        $axios.get('/order')
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    const filteredOrders = selectedStatus
        ? orders.filter(orders => orders.status === selectedStatus)
        : orders;

    const updateOrder = (updatedOrder) => {
        $axios.put(`/order/${updatedOrder._id}`, { "status": updatedOrder.status })
            .then(response => {
                const updatedOrders = orders.map(order =>
                    order._id === updatedOrder._id ? response.data : order
                );
                setOrders(updatedOrders);
                alert('SERVER: updated successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });

        setModalUpdate(false);
    };

    const deleteOrder = (id) => {
        $axios.delete(`/order/${id}`)
            .then(response => {
                setOrders(orders.filter(order => order._id !== id));
                alert('SERVER: deleted successfully');
            })
            .catch(error => {
                alert(`SERVER: ${error.response.data.message}`);
            });
    };


    return (
        <div className="page">
            <h1>Заказы</h1>

            <div className="content-container">

                <div className="sidebar">

                    <div class='form-group'>
                        <MySelect
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            defaultName="Статус"
                            options={[
                                { name: 'Все', value: '' },
                                ...statusArray.map(status => ({
                                    name: status.name,
                                    value: status.name
                                }))
                            ]}
                        />
                    </div>
                </div>

                <div className="main-content">

                    {filteredOrders.length === 0 ?
                        <h1>Не найдено</h1>
                        :
                        <OrderList
                            orders={filteredOrders}
                            onEdit={(order) => {
                                setEditingOrder({ ...order, 
                                    service_name: order.service ? order.service.name : "<удалена>" });
                                setModalUpdate(true);
                            }}
                            onDelete={deleteOrder}
                        />
                    }

                    <MyModal visible={modalUpdate} setVisible={setModalUpdate}>
                        <OrderUpdateForm
                            update={updateOrder}
                            editingOrder={editingOrder}
                            statusArray={statusArray}
                        />
                    </MyModal>
                </div>
            </div>

        </div>
    );
};

export default Orders;
