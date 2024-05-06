import React, { useEffect, useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import avatar from './avatar.png';
import ParallaxElements from './ParallaxElements';
import { useUser } from './UserContext';

const Home = () => {
  const { userData, setUserData } = useUser(); // Retrieve user data and setUserData
  const navigate = useNavigate();

  const isLoading = !userData; 
  const handleAvatarClick = () => {
    navigate('./userinfo');
  };

  const handleButtonClick = () => {
    console.log('Navigating to saving plan view');
    navigate('/saving');
  };

  // This useEffect is optional if the data is already initialized in the context
  // useEffect(() => {
  //   if (!userData) {
  //     const storedUserData = localStorage.getItem('userData');
  //     if (storedUserData) {
  //       setUserData(JSON.parse(storedUserData));
  //     }
  //   }
  // }, [userData, setUserData]); // Run once on component mount

  // Show a loading message or spinner until userData is available
  if (isLoading) {
    return <div>Loading...</div>; // Display loading state while data is unavailable
  }

  return ( /*
    <div> 
      <h2>Welcome, {userData.user.username}</h2>
      <p>Email: {userData.user.email}</p>
      <p>Phone: {userData.user.phone}</p>
      <p>Country: {userData.user.country}</p>
      <img src={userData.user.profilePicture} alt="Profile" />
    </div>
    */  
      <div className="profile-screen">
        <ParallaxElements/>

        <img
            src={avatar}
            alt="avatar"
            className="profile-picture"
            onClick={handleAvatarClick}
        />
        <h2 className="profile-name">Minh Lok Global Ban</h2>
        <p className="profile-balance">money: 5.000.000</p>
        <button
            className="confirm-button"
            onClick={handleButtonClick}
        >Saving plan
            </button>
      </div>
    );
};

export default Home;