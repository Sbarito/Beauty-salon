import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './List.css';
import './Catalog.css';
import Header from '../Components/Navbar'; 

export default function Home() {

  
  
const services = [
  "Маникюр",
  "Педикюр",
  "Макияж",
  "Стрижка",
  "Окрашивание",
  "Уход за кожей",
  "Массаж"
];

  return (
    <div>
  
  <div style={{ position: 'relative', width: '100%', height: '300px', overflow: 'hidden' }}>
    <img 
      src="https://img.goodfon.ru/original/1920x1200/3/4e/anyuta-makiyazh-fon-portret.jpg" 
      alt="Салон красоты Париж" 
      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
    />
    <div style={{ 
      position: 'absolute', 
      top: '50%', 
      left: '50%', 
      transform: 'translate(-50%, -50%)', 
      color: 'white', 
      fontSize: '2em', 
      textAlign: 'center',  
      padding: '10px',
      textShadow: '4px 4px 8px rgba(0, 0, 0, 0.9)',
      boxShadow: '0 0 20px rgba(0, 0, 0, 0.8)'
    }}>
      <img src="https://x-lines.ru/letters/i/cyrillicscript/0138/ffffff/38/0/4nx1bwrordekyegouyopbfo.png" border="0" />
      <img src="https://x-lines.ru/letters/i/cyrillicscript/0223/ffffff/20/0/4n7pdygosdeadwf64gbpbcbcrdemiwf64gbpbxstodembwcxrdemxwfo4gy7dysosdemfwf54g87bpqtoeopbxsto8eafwfo4n67bcgosmemzwfa4n3pbcgtomea3wcb4g81bwfardeadwfh4n9pdystodemmwcn4ggy.png" border="0" />
    </div>
  </div>
  <div style={{margin: '20px', border: '1px solid black', padding: '10px'}}>
    <p>
    В салоне красоты "Париж" каждый гость ощущает себя настоящим королем или королевой. Это место, где роскошь и комфорт сочетаются с высочайшим уровнем сервиса. Здесь царит атмосфера изысканного шика и безупречного вкуса, которая переносит в сердцах клиентов в самую сердцевину Парижа – город любви и красоты.
    </p>
    <br/>
    <p>
    При входе в салон вас встречает приветливый персонал, готовый удовлетворить любые ваши пожелания. Интерьер выполнен в классическом стиле с элементами модерна, создавая атмосферу уюта и спокойствия. Мягкие оттенки цветов, изящная мебель и мерцание свечей создают неповторимую атмосферу, которая помогает расслабиться и насладиться моментом.
    </p>
    <br/>
    <p>
    В салоне "Париж" представлен широкий спектр услуг, начиная от классических парикмахерских процедур и заканчивая эксклюзивными косметологическими программами. Высококвалифицированные мастера с многолетним опытом работы используют только профессиональную косметику премиум-класса, гарантируя безупречный результат.
    </p>
    <br/>
    <p>
    Одним из главных преимуществ салона является его индивидуальный подход к каждому клиенту. Мастера тщательно изучают ваши потребности и пожелания, предлагая персональные решения, которые подчеркивают вашу уникальность и неповторимость.
    </p>
    <br/>
    <p>
    Кроме того, салон "Париж" регулярно проводит мастер-классы и семинары с участием ведущих специалистов индустрии красоты, что позволяет своим гостям быть в курсе последних тенденций и новинок.
    </p>
     </div>
  
</div>
  );
}


