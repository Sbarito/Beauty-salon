import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Reception.css';
import Select from 'react-select';
import Serv from '../services/Serv'; 
import Masters from '../services/Master';
import Record from '../services/Record'; 

export default function Reception() {
    const [step, setStep] = useState(1);
    const [service, setService] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [master, setMaster] = useState(null); 
    const [bookingSuccess, setBookingSuccess] = useState(false);
    const [services, setServices] = useState([]);
    const [masters, setMasters] = useState([]); 
    const [availableTimes, setAvailableTimes] = useState([]); 
    const [userId, setUserId] = useState(1); 

    useEffect(() => {
        fetchServices();
    }, []);

    useEffect(() => {
        if (service) {
            fetchMastersByServiceId(service.value);
        } else {
            setMasters([]); 
        }
    }, [service]);

    useEffect(() => {
        if (date && master) {
            fetchAvailableTimeSlots(date, master.value);
        } else {
            setAvailableTimes([]); 
        }
    }, [date, master]);

    const fetchServices = () => {
        Serv.getServ()
            .then(response => {
                setServices(response.data.data.map(service => ({
                    value: service.id,
                    label: service.name
                })));
            })
            .catch(error => {
                console.error("Ошибка при загрузке услуг:", error);
            });
    };

    const fetchMastersByServiceId = (serviceId) => {
        Masters.getMastersByServiceId(serviceId)
            .then(response => {
                setMasters(response.data.data.map(master => ({
                    value: master.id,
                    label: master.fio 
                })));
            })
            .catch(error => {
                console.error("Ошибка при загрузке мастеров по услуге:", error);
                setMasters([]); 
            });
    };

    const fetchAvailableTimeSlots = (date, masterId) => {
        Record.getTimeSlots(date, masterId)
            .then(response => {
                setAvailableTimes(response.data.data);
            })
            .catch(error => {
                console.error("Ошибка при загрузке временных слотов:", error);
                setAvailableTimes([]); 
            });
    };

    const handleServiceChange = (selectedOption) => {
        setService(selectedOption);
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleTimeChange = (e) => {
        setTime(e.target.value);
    };

    const handleMasterChange = (selectedOption) => {
        setMaster(selectedOption);
    };

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const selectedTimeSlot = availableTimes.find(slot => `${slot.timeStart} - ${slot.timeEnd}` === time);

        if (selectedTimeSlot) {
            Record.createRecord(
                master.value,
                selectedTimeSlot.id,
                service.value, 
                date
            )
                .then(response => {
                    console.log("Запись успешно создана:", response.data);
                    setBookingSuccess(true);
                    setStep(4);
                })
                .catch(error => {
                    console.error("Ошибка при создании записи:", error);
                });
        } else {
            console.error("Временной слот не найден");
        }
    };

    const today = new Date().toISOString().split('T')[0];

    return (
        <div className="booking-form">
            {step === 1 && (
                <div>
                    <h3>Запись на услугу</h3>
                    <p><strong>Шаг 1: Выберите услугу</strong></p>
                    <div style={{ marginTop: '10px' }}>
                        <Select
                            options={services}
                            value={service}
                            onChange={handleServiceChange}
                            placeholder="Выберите услугу"
                            isClearable
                        />
                    </div>
                    <button onClick={handleNextStep} disabled={!service}>Далее</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <h3>Запись на услугу</h3>
                    <p><strong>Шаг 2: Выберите мастера</strong></p>
                    <div style={{ marginTop: '10px' }}>
                        <Select
                            options={masters}
                            value={master}
                            onChange={handleMasterChange}
                            placeholder="Выберите мастера"
                            isClearable
                        />
                    </div>
                    <button onClick={handlePreviousStep}>Назад</button>
                    <button onClick={handleNextStep} disabled={!master}>Далее</button>
                </div>
            )}

            {step === 3 && (
                <div>
                    <h3>Запись на услугу</h3>
                    <p><strong>Шаг 3: Выберите дату и время</strong></p>
                    <input type="date" value={date} onChange={handleDateChange} min={today} required />
                    {availableTimes.length === 0 ? (
                        <p><strong>Нет доступных временных слотов</strong></p>
                    ) : (
                        <select value={time} onChange={handleTimeChange} required>
                            <option value="">Выберите время</option>
                            {availableTimes.map((slot, index) => (
                                <option key={index} value={`${slot.timeStart} - ${slot.timeEnd}`}>
                                    {slot.timeStart} - {slot.timeEnd}
                                </option>
                            ))}
                        </select>
                    )}
                    <button onClick={handlePreviousStep}>Назад</button>
                    <button onClick={handleSubmit} disabled={!date || !time}>Записаться</button>
                </div>
            )}

            {step === 4 && (
                <div>
                    <h2>Вы успешно записаны!</h2>
                    <p>С вами свяжутся в течение суток.</p>
                </div>
            )}
        </div>
    );
};