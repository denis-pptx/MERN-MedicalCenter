import React from 'react';
import ServiceItem from '../Items/ServiceItem';

const ServiceList = ({ services, onEdit }) => {
    return (
        <div>
            {services.map(service => (
                <ServiceItem
                    key={service._id}
                    service={service}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
};

export default ServiceList;
