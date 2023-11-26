// LoginForm.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import RotatingCircle from './style_components/rotateCircle';
import Footer from './templates/footer';
import '../css/loginForm.css';

const LoginForm = ({ onLogin }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCreating, setCreating] = useState(false);

  const handleLogin = () => {
    const validUsername = 'user';
    const validPassword = 'pass';

    if (username === validUsername && password === validPassword) {
      setLoading(true);

      setTimeout(() => {
        setLoggedIn(true);
        setLoading(false);
        navigate('/user-dashboard');

        setTimeout(() => {
          setLoggedIn(false);
        }, 3000);
      }, 2000);
    } else {
      alert('Неверный логин или пароль');
    }
  };

  return (
    <div>
      <h1>Авторизация пользователя</h1>
      <div className="login-container">
      <form className="login-form">
        <Link to="/">
          <div className="back-arrow">← Главная страница</div>
        </Link>
        <h2>Вход</h2>
        <label>
          Логин
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Пароль
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleLogin} disabled={isLoading} className="login-button">
          {isLoading ? (
            <>
              <RotatingCircle />
              Вход...
            </>
          ) : (
            'Войти'
          )}
        </button>
        <Link to="/password-recovery">
          <p className="forgot-password">Забыли пароль?</p>
        </Link>
        <Link to="/account-creating">
          <p className="create-account">Создать аккаунт</p>
        </Link>
      </form>
      </div>
      <Footer />
    </div>
  );
};

export default LoginForm;
