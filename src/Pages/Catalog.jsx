import React, { useState } from 'react';
import './List.css';
import './Catalog.css';
import BackgroundImage from '../Images/abc.jpg';

export default function Catalog() {
    const services = [
        { name: "Маникюр", price: "50$" },
        { name: "Педикюр", price: "60$" },
        { name: "Макияж", price: "40$" },
        { name: "Стрижка", price: "30$" },
        { name: "Окрашивание", price: "70$" },
        { name: "Уход за кожей", price: "55$" },
        { name: "Массаж", price: "80$" },
        // Дублирующие элементы удалены для краткости
    ];

    const [hoveredIndex, setHoveredIndex] = useState(null);

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {services.map((service, index) => (
                <div
                    key={index}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
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
                        
                        overflow: 'hidden', // Скрыть переполнение
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
                        opacity: 0.1, // Прозрачность только для фона
                        zIndex: 0,
                    }}></div>
                    <p style={{ textAlign: 'center', opacity: hoveredIndex === index ? 0 : 1, transition: 'opacity 0.3s', zIndex: 1 }}>
                        {service.name}
                    </p>
                    {hoveredIndex === index && (
                        <div style={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            fontSize: '24px',
                            zIndex: 1, // Содержимое поверх фона
                        }}>
                            {service.price}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}