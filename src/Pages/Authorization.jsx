import React, { useContext, useState } from 'react';
import './Authorization.css';
import BackgroundImage from '../Images/abc.png';
import { Context } from '..';
import { useNavigate } from 'react-router-dom';

function Authorization() {
  const { store } = useContext(Context);
  const [isLogin, setIsLogin] = useState(true);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [fio, setFio] = useState('');
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      await store.login(phone, password, navigate);
    } else {
      await store.register(phone, password, fio, navigate);
    }
  }


  return (
    <div className="authorization">
      <div className="left-side">
        <img src={BackgroundImage} alt="Background" />
      </div>
      <div className="right-side">
        <div className="login-form">
          <h2>{isLogin ? 'Вход' : 'Регистрация'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="fullName">ФИО</label>
                <input
                  type="text"
                  id="fullName"
                  value={fio}
                  onChange={(e) => setFio(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <label htmlFor="username">Логин</label>
              <input
                type="text"
                id="username"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Пароль</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-button">
              {isLogin ? 'Войти' : 'Зарегистрироваться'}
            </button>
          </form>
          <div className="toggle-form">
            <button onClick={handleToggleForm}>
              {isLogin ? 'Зарегистрироваться' : 'Назад'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Authorization;