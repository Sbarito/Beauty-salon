import React, { useState, useContext } from 'react';
import './Navbar.css';
import { Context } from '..';

const Navbar = () => {
    const { store } = useContext(Context);
    console.log(store)

    return (
        <nav className="header">
        <div className="tabs">
            <a href="/" className="tab">Справка</a>
            <a href="/catalog" className="tab">Каталог</a>
            <a href="/reception" className="tab">Запись</a> 
            <a href="/history" className="tab">История</a>
            {store.isRole == 'ADMIN'? <a href="/master" className="tab">Сотрудники</a>: <></>}
            {store.isAuth?
            <a href="/authorization" className="tab">Выйти</a>
            : <a href="/authorization" className="tab">Войти</a>
            }
        </div>
    </nav>
    );
};

export default Navbar;

