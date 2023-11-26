// Footer.js
import React from 'react';

const Footer = () => {
  return (
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
  );
};

export default Footer;
