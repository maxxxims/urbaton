import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ChooseParking from './chooseParking';
import Reservation from './reservation';
import Contacts from './contacts';
import RechargeBalance from './rechangeBalance';
import LoginForm from './loginForm';
import '../css/tabs.css';
import FeedbackForm from './feedback';

const Tabs = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('chooseParking');
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleLogin = (user) => {
    setLoggedIn(true);
    setUsername(user);
    navigate('/user-dashboard');
  };

  const handleBalanceClick = () => {
  
    if (!loggedIn) {
      navigate('/login');
    } else {
      handleTabChange('rechargeBalance');
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="tabs-container">
        <h1>ParkBooking</h1>
        <div className="tabs-buttons">
          {loggedIn ? (
            <button onClick={() => handleTabChange('userDashboard')} className="user-dashboard">
              <img src="../../../public/logo_login.png" alt="Личный кабинет" /> {username}'s Личный кабинет
            </button>
          ) : (
            <>
              <button onClick={() => handleTabChange('chooseParking')}>Выбор парковочных мест</button>
              <button onClick={() => handleTabChange('reservation')}>Бронирование</button>
              <button onClick={() => navigate('/feedback')}>Обратная связь</button>
              <button onClick={() => navigate('/contacts')}>Контакты</button>
              <button onClick={handleBalanceClick}>Пополнение баланса</button>
              <button onClick={() => navigate('/login')} className="user-dashboard">
              <img src="../../../public/logo_login.png" alt="" /> Вход
              </button>
            </>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="tabs-content">
        {activeTab === 'chooseParking' && <ChooseParking />}
        {activeTab === 'reservation' && <Reservation />}
        {activeTab === 'feedback' && <FeedbackForm />}
        {activeTab === 'contacts' && <Contacts />}
        {activeTab === 'rechargeBalance' && <RechargeBalance />}
        {activeTab === 'loginForm' && <LoginForm onLogin={handleTabChange('loginForm')} />}
      </div>

      {/* Footer */}
      <footer className="footer">
        <div>
          <h2>Контакты</h2>
          <div className="contact-info">
            <div className="contact-item">
              <p><a href="mailto:example@mail.com">example@mail.com</a></p>
            </div>
            <div className="contact-item">
              <p>123456790</p>
            </div>
            <div className="contact-item">
              <p><a href="ссылка_на_VK">VK</a></p>
            </div>
            <div className="contact-item">
              <p><a href="ссылка_на_телеграм">Telegram</a></p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Tabs;
