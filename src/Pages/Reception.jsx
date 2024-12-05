import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Reception.css';

export default function Reception() {

    const [step, setStep] = useState(1);
    const [service, setService] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [bookingSuccess, setBookingSuccess] = useState(false);
  
    const handleServiceChange = (e) => {
      setService(e.target.value);
    };
  
    const handleDateChange = (e) => {
      setDate(e.target.value);
    };
  
    const handleTimeChange = (e) => {
      setTime(e.target.value);
    };
  
    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handlePhoneChange = (e) => {
      setPhone(e.target.value);
    };
  
    const handleNextStep = () => {
      setStep(step + 1);
    };
  
    const handlePreviousStep = () => {
      setStep(step - 1);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setBookingSuccess(true);
      setStep(4); // Переход на следующий шаг после успешной отправки
    };
  
    const availableTimes = [
      '9:00 - 10:00',
      '10:00 - 11:00',
      '11:00 - 12:00',
      '12:00 - 13:00',
      '13:00 - 14:00',
      '14:00 - 15:00',
      '15:00 - 16:00',
      '16:00 - 17:00',
      '17:00 - 18:00',
    ];
  
    // Получаем текущую дату в формате YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];
  
    return (
      <div className="booking-form">
        {step === 1 && (
          <div>
            <h3>Запись на услугу</h3>
            <p><strong>Шаг 1: Выберите услугу</strong></p>
            <select value={service} onChange={handleServiceChange} required>
              <option value="">Выберите услугу</option>
              <option value="service1">Маникюр</option>
              <option value="service2">Макияж</option>
              <option value="service3">Окрашивание</option>
            </select>
            <button onClick={handleNextStep} disabled={!service}>Далее</button>
          </div>
        )}
  
        {step === 2 && (
          <div>
            <h3>Запись на услугу</h3>
            <p><strong>Шаг 2: Выберите дату и время</strong></p>
            <input type="date" value={date} onChange={handleDateChange} min={today} required />
            {availableTimes.length === 0 ? (
                <p><strong>Текущих записей нет</strong></p>
            ) : (
              <select value={time} onChange={handleTimeChange} required>
                <option value="">Выберите время</option>
                {availableTimes.map((time, index) => (
                  <option key={index} value={time}>{time}</option>
                ))}
              </select>
            )}
            <button onClick={handlePreviousStep}>Назад</button>
            <button onClick={handleNextStep} disabled={!date || !time}>Далее</button>
          </div>
        )}
  
        {step === 3 && (
          <div>
            <h3>Запись на услугу</h3>
            <p><strong>Шаг 3: Введите ваши данные</strong></p>
            <input type="text" placeholder="Ваше имя" value={name} onChange={handleNameChange} required />
            <input type="tel" placeholder="Номер телефона" value={phone} onChange={handlePhoneChange} required />
            <button onClick={handlePreviousStep}>Назад</button>
            <button onClick={handleSubmit} disabled={!name || !phone}>Записаться</button>
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