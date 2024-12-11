import React, { useState, useEffect } from 'react';
import './List.css';
import './Catalog.css';
import './History.css';
import Record from '../services/Record';

const ServiceCard = ({ service, time, timeEnd, date, master, number, onCancel, isAdmin }) => {
    return (
        <div className="service-card">
            <h3>{service}</h3>
            <p><strong>Время:</strong> {time} - {timeEnd}</p>
            <p><strong>Дата:</strong> {date}</p>
            <p><strong>Мастер:</strong> {master}</p>
            {isAdmin && <p><strong>Номер клиента:</strong> {number}</p>} 
            {!isAdmin && <button className="adding-button" onClick={onCancel}>Отменить запись</button>} 
        </div>
    );
};

export default function History() {
    const [services, setServices] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    const fetchRecords = () => {
        Record.getMyRecords()
            .then(response => {
                console.log(response.data.data)
                setServices(response.data.data); 
            })
            .catch(error => {
                console.error('Ошибка при загрузке записей:', error);
            });
    }

    useEffect(() => {
        const role = localStorage.getItem('role');
        setIsAdmin(role === 'ADMIN');


        if (role == 'ADMIN') {
            Record.getActiveRecords()
            .then(response => {
                console.log(response.data.data)
                setServices(response.data.data); 
            })
            .catch(error => {
                console.error('Ошибка при загрузке записей:', error);
            });
        } else {
            fetchRecords();
        }
    }, []);

    const handleCancel = (recordId) => {
        Record.deleteRecord(recordId)
            .then(() => {
                fetchRecords();
            })
            .catch(error => {
                console.error('Ошибка при удалении записи:', error);
            });
    };

    return (
        <div>
            {services.length === 0 ? (
                <div className='now'><p>Текущих записей нет :(</p></div>
            ) : (
                <div>
                    <div className='now'><h3>Текущие записи:</h3></div>
                    {services.map((item, index) => (
                        <ServiceCard
                            key={item.id}
                            service={item.service_name}
                            time={item.time_start}
                            timeEnd={item.time_end}
                            date={item.date}
                            master={item.master_fio}
                            number={item.phone}
                            onCancel={() => handleCancel(item.recordId)}
                            isAdmin={isAdmin}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}