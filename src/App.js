import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider, useUser } from './UserContext';
import Login from './Login';
import Home from './Home';
import UserInfo from './UserInfo';
import User from './User';
import UserSavings from './userSaving';
import PrivateRoute from './PrivateRoute';
import CreateSaving from './createSavingPlan';


const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/saving" element={<User />} />
          <Route path="/createsavingplan" element={<CreateSaving />} />
          <Route path="/usersavings" element={<UserSavings />} />
          <Route
            path="/home"
            element={<Home />}  // Using PrivateRoute 
          />
          <Route
            path="/userinfo"
            element={<PrivateRoute element={<UserInfo />} />} // Using PrivateRoute
          />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
