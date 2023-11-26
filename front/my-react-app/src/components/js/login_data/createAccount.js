// CreateAccount.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../templates/footer';
import '../../css/createAccount.css';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAccountCreating = () => {
    if (validateForm()) {
      // Process account creation logic here
      alert(`Ваша учетная запись успешно создана: Эл. почта: ${email} \n Логин: ${login}`);
    }
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Пожалуйста, введите вашу почту');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Пожалуйста, введите корректный адрес электронной почты');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!login) {
      setLoginError('Пожалуйста, введите логин');
      isValid = false;
    } else {
      setLoginError('');
    }

    if (!password) {
      setPasswordError('Пожалуйста, введите пароль');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Пароль должен содержать не менее 6 символов');
      isValid = false;
    } else {
      setPasswordError('');
    }

    return isValid;
  };

  return (
    <div>
      <h1>Создание аккаунта</h1>
      <form>
        <div>
          <Link to="/login">
            <div className="back-arrow">← Назад</div>
          </Link>
          <label>
            Введите адрес электронной почты:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Введите почту"
            />
            {emailError && <span className="error-message">{emailError}</span>}
          </label>
          <label>
            Введите логин:
            <input
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="Введите логин"
            />
            {loginError && <span className="error-message">{loginError}</span>}
          </label>
          <label>
            Введите пароль:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Введите пароль"
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </label>
        </div>
        <div>
          <button type="button" onClick={handleAccountCreating}>
            Создать аккаунт
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default CreateAccount;
