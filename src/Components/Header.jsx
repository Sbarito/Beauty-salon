import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export default function Header() {

  const[userRights, setUserRights] = useState('admin');

  return (
  <nav className="navbar">
      <div className="navbar-logo">
        <img src="https://x-lines.ru/letters/i/cyrillicscript/0280/000000/20/0/4no7bcgozxem7wf7rdemiwcy4napdyqoz5eafwcmrytpb86osdeabwfa4n5nr.png" border="0" />
      </div>
      <div className="navbar-contact">
          <p>г. Москва, ул. Несуществующая, д. 123</p>
          <p>+7 (999) 123-45-67</p>
      </div>
  </nav>
  );
}


