import React, { useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Footer from '../templates/footer';
import '../../css/createAccount.css';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleAccountCreating = async () => {
    if (validateForm()) {
      const userData = {
        name,
        surname,
        email,
        phone_number: phoneNumber,
        status: 'active',  // Assuming status is a constant value for registration
        hashed_password: password,
      };

      const response = await fetch('http://localhost:8000/user/reg_user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(userData);
        alert(`Account created successfully: UUID: ${data.uuid}`);
        navigate('/login');
      } else {
        alert('Failed to create an account');
      }
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
          {/* New fields for name, surname, and phone number */}
          <label>
            Введите ваше имя:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите имя"
            />
          </label>
          <label>
            Введите вашу фамилию:
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              placeholder="Введите фамилию"
            />
          </label>
          <label>
            Введите номер телефона:
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Введите номер телефона"
            />
          </label>
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
