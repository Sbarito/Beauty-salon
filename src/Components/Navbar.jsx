import React, { useState, useContext } from 'react';
import './Navbar.css';

const Navbar = () => {


    const role = localStorage.getItem('role')

    return (
        <nav className="header">
        <div className="tabs">
            <a href="/" className="tab">Справка</a>
            <a href="/catalog" className="tab">Каталог</a> 
            {role == 'USER'? <a href="/reception" className="tab">Запись</a>: <></>}
            <a href="/history" className="tab">История</a>
            {role == 'ADMIN'? <a href="/master" className="tab">Сотрудники</a>: <></>}
            <a href="/authorization" className="tab">Выйти</a>
        </div>
    </nav>
    );
};

export default Navbar;


