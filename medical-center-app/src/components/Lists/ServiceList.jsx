import React from 'react';
import ServiceItem from '../Items/ServiceItem';

const ServiceList = ({ services }) => {
    return (
        <div>
            {services.map(service => (
                <ServiceItem key={service._id} service={service} />
            ))}
        </div>
    );
};

export default ServiceList;
