import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import avatar from "./avatar.png";
import ParallaxElements from "./ParallaxElements";
import { useUser } from "./UserContext";
import userData from "./Data.json";

const Home = () => {
  // const { userData, setUserData } = useUser(); // Retrieve user data and setUserData
  const navigate = useNavigate();
  // console.log(userData);
  // console.log(userData.user.homeAddress)
  const isLoading = !userData;
  const handleAvatarClick = () => {
    navigate("./userinfo");
  };

  const handleButtonClick = () => {
    console.log("Navigating to saving plan view");
    navigate("/saving");
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

  return (
  
    // <div> 
    //   <h2>Welcome, {userData.user.username}</h2>
    //   <p>Email: {userData.user.email}</p>
    //   <p>Phone: {userData.user.phone}</p>
    //   <p>Country: {userData.user.country}</p>
    //   <img src={userData.user.profilePicture} alt="Profile" />
    // </div>

    <div className="profile-screen">
      <ParallaxElements />

      <img
        src={userData.user.profilePicture}
        alt="avatar"
        className="profile-picture"
        onClick={handleAvatarClick}
      />
      <h2 className="profile-name">{userData.user.username}</h2>
      <p className="profile-balance">{userData.user.balance}</p>
      <button className="confirm-button" onClick={handleButtonClick}>
        Saving plan
      </button>
    </div>
  );
};

export default Home;
