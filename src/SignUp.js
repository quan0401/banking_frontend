import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import Validation from './SignUpValidation';
import { useNavigate } from 'react-router-dom';


const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [homeAddress, setAddress] = useState('');
  const [cccd, setCccd] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [errors, setError] = useState({});
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const [signupError, setSignupError] = useState(false); // State to store signup error message

  const navigate = useNavigate();



  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = async () => {
    const validationErrors = Validation({ username, email, cccd, password, homeAddress, phone, profilePicture });
    if (Object.keys(validationErrors).length !== 0) {
      setError(validationErrors);
      return;
    }
    if (!username) {
      setError({ username: "Username is required" });
      return;
    }
    // tra data ve cho backend post qua api
    try {
      const reader = new FileReader();
      reader.readAsDataURL(profilePicture);
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const userData = {
          username,
          password,
          cccd,
          email,
          homeAddress,
          phone,
          profilePicture: base64Data
        };
  
        const response = await axios.post("http://localhost:6969/api/v1/signup", userData);
  
        setSignupSuccess(true); // Set signup success
        setError({}); // Clear any previous errors
        setSignupError(false); // Clear signup error
        console.log(response.data);
        // handle success, redirect or show success message
      };
    } catch (error) {
      setError({}); // Clear any previous errors
      console.error(error);
      setSignupError(true); // Set signup error
      setSignupSuccess(false); // Set signup success to false
      
      // handle error, show error message
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sign Up</h1>
      {signupSuccess && <p className="text-success">Signup successful. You can now login.</p>}
      {signupError && <p className="text-danger">Signup failed. Please try again.</p>}
      <div className="mb-3">
        <input
          type='text'
          placeholder='Enter Username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-control"
        />
        {errors.name && <p className="text-danger">{errors.name}</p>}
      </div>
      <div className="mb-3">
        <input
          type='email'
          placeholder='Enter Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
        {errors.email && <p className="text-danger">{errors.email}</p>}
      </div>
      <div className="mb-3">
        <input
          type='password'
          placeholder='Enter Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
        />
        {errors.password && <p className="text-danger">{errors.password}</p>}
      </div>
      <div className="mb-3">
        <input
          type='text'
          placeholder='Enter CCCD'
          value={cccd}
          onChange={(e) => setCccd(e.target.value)}
          className="form-control"
        />
        {errors.cccd && <p className="text-danger">{errors.cccd}</p>}
      </div>
      <div className="mb-3">
        <input
          type='text'
          placeholder='Enter Address'
          value={homeAddress}
          onChange={(e) => setAddress(e.target.value)}
          className="form-control"
        />
        {errors.homeAddress && <p className="text-danger">{errors.homeAddress}</p>}
      </div>
      <div className="mb-3">
        <input
          type='tel'
          placeholder='Enter Phone'
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="form-control"
        />
        {errors.phone && <p className="text-danger">{errors.phone}</p>}
      </div>
      <div className="mb-3">
        <input
          type='file'
          onChange={handleImageChange}
          className="form-control-file"
        />
        {errors.profilePicture && <p className="text-danger">{errors.profilePicture}</p>}
      </div>
      <div className="mb-3">
        <button onClick={handleSignup} className="btn btn-primary me-2">Sign Up</button>
        <button onClick={handleLogin} className="btn btn-secondary">Login</button>
      </div>
    </div>
  );
};

export default Signup;
