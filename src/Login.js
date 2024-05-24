import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Validation from './SignUpValidation';

const Login = () => {
  // login
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //signup
  const [username, setUsername] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [signupSuccess, setSignupSuccess] = useState(false); // State to track signup success
  const [signupError, setSignupError] = useState(false); // State to store signup error message

  const navigate = useNavigate();


  const handleLogin = async () => { 
    try { 
      const response = await axios.post('http://localhost:6969/api/v1/signin', { email, password });
      const userData = response.data;
      localStorage.setItem('userData', JSON.stringify(userData));
      navigate('/home');
    } catch (error) {
      console.error('Error during login:', error);
      setError('Invalid email or password');
    } 
        // navigate('/home');
  };

  const handleSignup = async () => {
    const validationErrors = Validation({ username, email, password, country, phone, profilePicture });
    if (Object.keys(validationErrors).length !== 0) {
      setError(validationErrors);
      return;
    }
    if (!username) {
      setError({ username: "Username is required" });
      return;
    }

    try {
      const reader = new FileReader();
      reader.readAsDataURL(profilePicture);
      reader.onloadend = async () => {
        const base64Data = reader.result;
        const userData = {
          username,
          password,
          email,
          country,
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

  // Change the screen 
  // const signUpButton = document.getElementById('signUp');
  // const signInButton = document.getElementById('signIn');
  // const container = document.getElementById('container');

  // signUpButton.addEventListener('click', () => {
  //   container.classList.add('right-panel-active');
  // });

  // signInButton.addEventListener('click', () => {
  //   container.classList.remove('right-panel-active');
  // });

  return (
    <div className="container" id="container">
        <div className="form-container sign-up-container">
            <form action="#">
                <h1>Create Account</h1> 
                <input
                  type='text'
                  placeholder='Enter Username'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="form-control"
                />
                {error.name && <p className="text-danger">{error.name}</p>}

                <input
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                {error.email && <p className="text-danger">{error.email}</p>}

                <input
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />
                {error.password && <p className="text-danger">{error.password}</p>}

                <input
                  type='text'
                  placeholder='Enter Country'
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="form-control"
                />
                {error.country && <p className="text-danger">{error.country}</p>}

                <input
                  type='tel'
                  placeholder='Enter Phone'
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="form-control"
                />
                {error.phone && <p className="text-danger">{error.phone}</p>}

                <input
                  type='file'
                  onChange={handleImageChange}
                  className="form-control-file"
                />
                {error.profilePicture && <p className="text-danger">{error.profilePicture}</p>}

                <button  onClick={handleSignup}>Sign Up</button>
            </form>
        </div>
        <div className="form-container sign-in-container">
            <form action="#">
                <h1>Sign in</h1>
                <input
                  type='email'
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />

                <input
                  type='password'
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                />

                <button onClick={handleLogin}>Sign In</button>
            </form>
        </div>
        <div className="overlay-container">
            <div className="overlay">
                <div className="overlay-panel overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>To keep connected with us please login with your personal info</p>
                    <button className="ghost" id="signIn">Sign In</button>
                </div>
                <div className="overlay-panel overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start wonderful journey with us</p>
                    <button className="ghost" id="signUp">Sign Up</button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default Login;
