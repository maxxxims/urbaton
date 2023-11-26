import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import '../css/feedback.css'

const FeedbackForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Пожалуйста, введите имя');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Пожалуйста, введите вашу почту');
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError('Пожалуйста, введите корректный адрес электронной почты');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (message.length < 10) {
      setMessageError('Пожалуйста, опишите ваше сообщение более подробно');
      isValid = false;
    } else if (message.length > 1000) {
      setMessageError('Пожалуйста, уменьшите длину вашего сообщения');
      isValid = false;
    } else {
      setMessageError('');
    }

    if (!subject) {
      setSubjectError('Пожалуйста, введите тему сообщения');
      isValid = false;
    } else {
      setSubjectError('');
    }
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Здесь вы можете добавить код для отправки формы
      // например, использовать fetch или axios для отправки данных на сервер

      // Очищаем поля формы и отображаем сообщение об успехе
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setSuccessMessage('Ваше сообщение успешно отправлено!');
    }
  };

  return (
    <div className="feedback-form">
      <div className="feedback-description">
      <h1>Обратная связь</h1>
        <h3>
          Сообщите нам о возникших трудностях при использовании сервиса, задайте ваши вопросы или выскажите предложения. Мы на всё ответим.
        </h3>
        <Link to="/">
        <div className="back-arrow">← Главная страница</div>
      </Link>
      </div>
      <form className='feedback-form-inner' onSubmit={handleSubmit}>
        <label>
          Имя:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          {nameError && <span className="error-message">{nameError}</span>}
        </label>
        <br />
        <label>
          Почта:
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {emailError && <span className="error-message">{emailError}</span>}
        </label>
        <br />
        <label>
          Тема:
          <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} />
          {subjectError && <span className="error-message">{subjectError}</span>}
        </label>
        <br />
        <label>
  Сообщение:
  <textarea
    value={message}
    onChange={(e) => setMessage(e.target.value)}
    rows="8"
    cols="40"
    placeholder="Введите ваше сообщение"
    maxLength={1000}
  />
  {messageError && <span className="error-message">{messageError}</span>}
</label>
        <br />
        <button type="submit">Отправить сообщение</button>
      </form>
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  );
};

export default FeedbackForm;
