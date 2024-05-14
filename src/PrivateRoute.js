import React from 'react';
import { Navigate } from 'react-router-dom'; 
import { useUser } from './UserContext'; 


const PrivateRoute = ({ element }) => {
  const { userData } = useUser(); 
  const isAuthenticated = Boolean(userData);

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
