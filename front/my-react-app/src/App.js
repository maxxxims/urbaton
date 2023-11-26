// App.js or your top-level component
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Tabs from './components/js/tabs'; // Import your components
import UserDashboard from './components/js/userDashboard';
import LoginForm from './components/js/loginForm';
import FeedbackForm from './components/js/feedback';
import ChooseParking from './components/js/chooseParking';
import PasswordRecovery from './components/js/login_data/passwordRecovery';
import CreateAccout from './components/js/login_data/createAccount';
import Contacts from './components/js/contacts';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="/user-dashboard" element = {<UserDashboard />}/>
        <Route path="/login" element = {<LoginForm />}/>
        <Route path="/feedback" element = {<FeedbackForm />}/>
        <Route path="/choose-parking" element={<ChooseParking /> } />
        <Route path="/password-recovery" element = {<PasswordRecovery />} />
        <Route path="/account-creating" element = {<CreateAccout />} />
        <Route path="/contacts" element = {<Contacts />} />
      </Routes>
    </Router>
  );
};

export default App;
