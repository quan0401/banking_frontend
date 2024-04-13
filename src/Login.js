import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:6969/api/v1/signin', { email, password });
      console.log(response.data);
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password');
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
      <div className="card p-4 shadow">
        <h1 className="text-center mb-4">Login</h1>
        <div className="form-group mb-3">
          <input
            type='email'
            placeholder='Enter Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control"
          />
        </div>
        <div className="form-group mb-3">
          <input
            type='password'
            placeholder='Enter Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger mb-3">{error}</p>}
        <div className="d-grid gap-2">
          <button onClick={handleLogin} className="btn btn-primary mb-2">Login</button>
          <button onClick={handleSignUp} className="btn btn-secondary">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
