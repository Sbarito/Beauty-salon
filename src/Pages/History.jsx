import React, { useState, useEffect, useRef } from 'react';
import './List.css';
import './Catalog.css';
import './History.css';

const ServiceCard = ({ service, time, date, master }) => {
    return (
        <div className="service-card">
            <h3>{service}</h3>
            <p><strong>Время:</strong> {time}</p>
            <p><strong>Дата:</strong> {date}</p>
            <p><strong>Мастер:</strong> {master}</p>
        </div>
    );
};

export default function History() {
    const services = [
        { service: 'Стрижка', time: '14:00', date: '2023-10-15', master: 'Иван Иванов' },
        { service: 'Маникюр', time: '15:30', date: '2023-10-16', master: 'Мария Петрова' },
        { service: 'Педикюр', time: '11:00', date: '2023-10-17', master: 'Анна Сидорова' },
    ];
    return (
        <div>
            {services.length === 0 ? (
                <div className='now'><h3>У вас нет текущих записей</h3></div>
            ) : (
                <div>
                    <div className='now'><h3>Текущие записи:</h3></div>
                    {services.map((item, index) => (
                        <ServiceCard
                            key={index}
                            service={item.service}
                            time={item.time}
                            date={item.date}
                            master={item.master}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}