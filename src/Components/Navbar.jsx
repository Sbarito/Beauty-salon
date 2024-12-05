import React from 'react';
import './Navbar.css';
import { useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {

    return (
        <nav className="header">
        <div className="tabs">
            <a href="/" className="tab">Справка</a>
            <a href="/catalog" className="tab">Каталог</a>
            <a href="/reception" className="tab">Запись</a>
            <a href="/history" className="tab">История</a>
            <a href="/authorization" className="tab">Войти</a>
        </div>
    </nav>
    );
};

export default Navbar;

