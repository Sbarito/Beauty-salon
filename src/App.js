import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Authorization from "./Pages/Authorization";
import Catalog from "./Pages/Catalog";
import Home from "./Pages/Home";
import Reception from "./Pages/Reception";
import Header from './Components/Header';

function App() {
  const location = useLocation();
  const isAuthorizationPage = location.pathname === '/authorization';

  return (
    <div className={isAuthorizationPage ? '' : 'with-padding'}>
      {!isAuthorizationPage && <Header />}
      {!isAuthorizationPage && <Navbar />}
      <div className="scrollable-block">
        <Routes>
          <Route path="/authorization" element={<Authorization />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/" element={<Home />} />
          <Route path="/reception" element={<Reception />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;