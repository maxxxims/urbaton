import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from './templates/footer';
import '../css/userForm.css';

const UserDashboard = ({ 
  username, 
  onLogout, 
  userEmail, 
  userStatus, 
  bookingHistory = [1,2,3,4,5,6,7,8], 
  accountBalance, 
  onRecharge, 
  onChangePassword, 
  onChangeContactInfo 
}) => {
  const navigate = useNavigate();
  const [showAllBookings, setShowAllBookings] = useState(false);

  const handleLogout = () => {
    navigate('/');
    //onLogout();
    // navigate('/');
  };

  const handleRecharge = () => {
    //onRecharge();
    alert('Пополнение баланса');
  };

  const handleChangePassword = () => {
    alert('Изменение пароля');
    //onChangePassword();
  };

  const handleChangeContactInfo = () => {
    alert('Контакты');
    //onChangeContactInfo();
  };

  const toggleShowAllBookings = () => {
    setShowAllBookings(!showAllBookings);
  };

  const renderBookingList = () => {
    const displayedBookings = showAllBookings ? bookingHistory : bookingHistory.slice(0, 5);

    return (
      <div>
      <div className={showAllBookings ? 'scrollable-list' : ''}>
        <h2>История бронирования</h2>
        <ul>
          {displayedBookings.map((booking, index) => (
            <li key={index}>
              Парковочное место #{booking.id}, Дата: {booking.date}, Цена: {booking.price}
            </li>
          ))}
        </ul>
      </div>
      {bookingHistory.length > 5 && (
        <button onClick={toggleShowAllBookings}>
          {showAllBookings ? 'Скрыть' : 'Показать все бронирования'}
        </button>
      )}
      </div>
    );
  };

  return (
    <div>
      <div className="user-dashboard-container">
        <div className="booking-history">
          {renderBookingList()}
        </div>

        <div className="user-info">
          <h2>Профиль пользователя, {username}!</h2>
          <p>Email: {userEmail}</p>
          <p>Статус: {userStatus}</p>

          <h2>Баланс счета</h2>
          <p>Текущий баланс: {accountBalance} руб.</p>
          <button onClick={handleRecharge}>Пополнить баланс</button>

          <h2>Настройки учетной записи</h2>
          <button onClick={handleChangePassword}>Изменить пароль</button>
          <button onClick={handleChangeContactInfo}>Изменить контактные данные</button>
          <button onClick={handleLogout}>Выйти</button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserDashboard;
