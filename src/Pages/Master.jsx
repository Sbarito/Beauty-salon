import React, { useState} from 'react';
import './List.css';
import './Catalog.css';
import Select from 'react-select';
import Masters from '../services/Master';
import Serv from '../services/Serv'; 

export default function Master() {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [linkModalVisible, setLinkModalVisible] = useState(false);
    const [newMasterName, setNewMasterName] = useState('');
    const [masters, setMasters] = useState([]);
    const [selectedMasters, setSelectedMasters] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedService, setSelectedService] = useState('');

    const fetchServices = () => {
        Serv.getServ()
            .then(response => {
                setServices(response.data.data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке услуг:", error);
            });
    };

    const fetchMasters = () => {
        Masters.getMasters().then(response => {
            setMasters(response.data.data.map(master => ({
                id: master.id,
                name: master.fio,
                select: false
            })));
        }).catch(error => {
            console.error("Ошибка при получении мастеров:", error);
        });
    };

    const handleCreateMaster = () => {
        setCreateModalVisible(true);
    };

    const handleLinkMaster = () => {
        fetchMasters();
        fetchServices();
        setLinkModalVisible(true);
    };

    const handleCancel = () => {
        resetForm();
    };

    const handleCreate = () => {
        if (newMasterName) {
            Masters.createMaster(newMasterName).then(response => {
                console.log("Мастер создан:", response.data);
                fetchMasters(); // Обновляем список мастеров после создания нового
                resetForm();
            }).catch(error => {
                console.error("Ошибка при создании мастера:", error);
            });
        }
    };

    const handleLink = () => {
        if (selectedMasters.length > 0 && selectedService) {
            let serviceId = selectedService;
            const mastersId = selectedMasters.map(master => master.value);
            console.log(mastersId, serviceId.value)
            Masters.assignService(mastersId, serviceId.value).then(response => {
                console.log("Мастера привязаны к услуге:", response.data);
                resetForm();
            }).catch(error => {
                console.error("Ошибка при привязке мастеров к услуге:", error);
            });
        }
    };

    const handleMasterCheckboxChange = (masterId) => {
        setMasters(prevMasters => {
            return prevMasters.map(master => {
                if (master.id === masterId) {
                    return { ...master, select: !master.select };
                }
                return master;
            });
        });
    };

    const resetForm = () => {
        setNewMasterName('');
        setMasters(prevMasters => prevMasters.map(master => ({ ...master, select: false })));
        setSelectedService('');
        setCreateModalVisible(false);
        setLinkModalVisible(false);
        setSelectedMasters([]);
    };

    const handleMasterSelectChange = (selected) => {
        setSelectedMasters(selected);
    };

    const masterOptions = masters.map(master => ({
        value: master.id,
        label: master.name,
    }));
    const serviceOptions = services.map(service => ({
        value: service.id,
        label: service.name,
    }));
    
    const handleServiceSelectChange = (selected) => {
        setSelectedService(selected);
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '5px', marginTop: '20px', marginLeft: '25px', marginRight: '25px' }}>
                <button className="adding-button" onClick={handleCreateMaster}>Создать мастера</button>
                <button className="adding-button" onClick={handleLinkMaster} style={{ marginLeft: '10px' }}>Привязать мастеров к услуге</button>
            </div>

            {createModalVisible && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Создать мастера</h3>
                        <input
                            type="text"
                            placeholder="Напишите ФИО мастера"
                            value={newMasterName}
                            onChange={(e) => setNewMasterName(e.target.value)}
                            style={{ marginBottom: '15px', width: '100%', padding: '5px', textAlign: 'left' }} 
                        />
                        <div className="modal-buttons">
                            <button className="cancel-button" onClick={handleCancel}>Назад</button>
                            <button className="save-button" onClick={handleCreate}>Создать</button>
                        </div>
                    </div>
                </div>
            )}

{linkModalVisible && (
    <div className="modal-overlay">
        <div className="modal">
            <h3>Привязать мастеров к услуге</h3>
            <div style={{ marginBottom: '10px' }}>
                <Select
                    isMulti
                    options={masterOptions}
                    onChange={handleMasterSelectChange}
                    value={selectedMasters}
                />
            </div>
            <div style={{ marginBottom: '15px' }}>
                <Select
                    options={serviceOptions}
                    onChange={handleServiceSelectChange}
                    value={selectedService}
                    placeholder="Выберите услугу"
                />
            </div>
            <div className="modal-buttons" style={{ marginTop: '15px' }}>
                <button className="cancel-button" onClick={() => setLinkModalVisible(false)}>Назад</button>
                <button className="save-button" onClick={handleLink}>Привязать</button>
            </div>
        </div>
    </div>
)}
        </div>
    );
}