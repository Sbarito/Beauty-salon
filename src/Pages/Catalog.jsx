import React, { useState, useEffect, useContext } from 'react';
import './List.css';
import './Catalog.css';
import BackgroundImage from '../Images/abc.jpg';
import DelImage from '../Images/del.webp';
import UpdImage from '../Images/upd.svg'; 
import Serv from '../services/Serv'; 
import { Context } from '..';

export default function Catalog() {
    const { store } = useContext(Context);
    const [services, setServices] = useState([]);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [newServiceName, setNewServiceName] = useState('');
    const [newServicePrice, setNewServicePrice] = useState('');
    const [editingServiceId, setEditingServiceId] = useState(null);

    const fetchServices = () => {
        Serv.getServ()
            .then(response => {
                setServices(response.data.data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке услуг:", error);
            });
    };

    useEffect(() => {
        fetchServices();
    }, []);

    const handleCreateService = () => {
        setModalVisible(true);
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleCreate = () => {
        if (newServiceName && newServicePrice) {
            const newService = { serviceName: newServiceName, price: newServicePrice };
            Serv.createServ(newService)
                .then(response => {
                    setServices([...services, newService]);
                    fetchServices();
                    resetForm();
                })
                .catch(error => {
                    console.error("Ошибка при создании услуги:", error);
                });
        }
    };

    const handleDelete = (serviceId) => {
        Serv.delServ(serviceId)
            .then(response => {
                fetchServices();
            })
            .catch(error => {
                console.error("Ошибка при удалении услуги:", error);
            });
    };

    const handleUpdate = (serviceId) => {
        const service = services.find(s => s.id === serviceId);
        setNewServiceName(service.name);
        setNewServicePrice(service.price);
        setEditingServiceId(serviceId);
        setEditModalVisible(true);
    };

    const handleEditCancel = () => {
        resetForm();
        setEditModalVisible(false);
    };

    const handleEditSave = () => {
        if (newServiceName && newServicePrice) {
            const updatedService = { serviceName: newServiceName, price: newServicePrice };
            Serv.updateServ(editingServiceId, updatedService)
                .then(response => {
                    fetchServices();
                    resetForm();
                    setEditModalVisible(false);
                })
                .catch(error => {
                    console.error("Ошибка при обновлении услуги:", error);
                });
        }
    };

    const resetForm = () => {
        setNewServiceName('');
        setNewServicePrice('');
        setModalVisible(false);
    };

    return (
        <div>
            {store.isRole === 'ADMIN' && (
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px', marginTop: '20px', marginLeft: '25px', marginRight: '25px' }}>
                    <button className="adding-button" onClick={handleCreateService}>Создать услугу</button>
                </div>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                {services.length === 0 ? (
                    <div style={{ textAlign: 'center', width: '100%', marginTop: '20px' }}>
                        <p>К сожалению, здесь пока ещё нет услуг :(</p>
                    </div>
                ) : (
                    services.map((service, index) => (
                        <div
                            key={service.id}
                            onMouseEnter={() => !modalVisible && setHoveredIndex(index)}
                            onMouseLeave={() => !modalVisible && setHoveredIndex(null)}
                            title="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
                            style={{
                                width: '260px',
                                border: '1px solid black',
                                height: '350px',
                                margin: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative',
                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                overflow: 'hidden', 
                            }}
                        >
                            <div style={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundImage: `url(${BackgroundImage})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                opacity: 0.1, 
                                zIndex: 0,
                            }}></div>
                            <p style={{ textAlign: 'center', opacity: hoveredIndex === index ? 0 : 1, transition: 'opacity 0.3s', zIndex: 1 }}>
                                {service.name}
                            </p>
                            {hoveredIndex === index && !modalVisible && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    fontSize: '24px',
                                    zIndex: 1, 
                                }}>
                                    {service.price}
                                </div>
                            )}
                            {store.isRole === 'ADMIN' && (
                                <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', gap: '10px' }}>
                                    <img
                                        src={DelImage}
                                        alt="Удалить"
                                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                        onClick={() => handleDelete(service.id)}
                                    />
                                    <img
                                        src={UpdImage}
                                        alt="Обновить"
                                        style={{ width: '24px', height: '24px', cursor: 'pointer' }}
                                        onClick={() => handleUpdate(service.id)}
                                    />
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
            {modalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Создать услугу</h3>
                        <input
                            type="text"
                            placeholder="Название услуги"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            style={{ marginBottom: '15px', width: '100%', padding: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Цена"
                            value={newServicePrice}
                            onChange={(e) => setNewServicePrice(e.target.value)}
                            style={{ marginBottom: '15px', width: '100%', padding: '5px' }}
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleCancel}>Отменить</button>
                            <button className="save-button" onClick={handleCreate}>Создать</button>
                        </div>
                    </div>
                </div>
            )}
            {editModalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Редактировать услугу</h3>
                        <input
                            type="text"
                            placeholder="Название услуги"
                            value={newServiceName}
                            onChange={(e) => setNewServiceName(e.target.value)}
                            style={{ marginBottom: '15px', width: '100%', padding: '5px' }}
                        />
                        <input
                            type="text"
                            placeholder="Цена"
                            value={newServicePrice}
                            onChange={(e) => setNewServicePrice(e.target.value)}
                            style={{ marginBottom: '15px', width: '100%', padding: '5px' }}
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleEditCancel}>Отменить</button>
                            <button className="save-button" onClick={handleEditSave}>Сохранить</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}