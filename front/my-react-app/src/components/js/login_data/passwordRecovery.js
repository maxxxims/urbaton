// PasswordRecovery.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Footer from '../templates/footer';
import '../../css/passwordRecovery.css'; // Подключаем файл стилей

const PasswordRecovery = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handlePasswordRecovery = () => {
    alert(`Запрос на восстановление пароля для адреса: ${email}`);
  };

  return (
    <div>
      <h1>Восстановление пароля</h1>
      <form>
        <div>
        <Link to="/login">
        <div className="back-arrow">← Назад</div>
         </Link>
          <label>
            Введите адрес электронной почты:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <button type="button" onClick={handlePasswordRecovery}>
            Отправить запрос
          </button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default PasswordRecovery;
