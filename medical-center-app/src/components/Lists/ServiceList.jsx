import React from 'react';
import ServiceItem from '../Items/ServiceItem';

const ServiceList = ({ services, onEdit, onDelete }) => {
    return (
        <div>
            {services.map(service => (
                <ServiceItem
                    key={service._id}
                    service={service}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default ServiceList;
