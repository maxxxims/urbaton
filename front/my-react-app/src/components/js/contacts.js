import React from 'react';
import {Link} from 'react-router-dom';

const Contacts = () => {
  return (
  <div>
    <Link to="/">
        <div className="back-arrow">← Главная страница</div>
      </Link>
  </div>
  );
};

export default Contacts;
