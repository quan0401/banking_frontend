import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import avatar from "./avatar.png";
import ParallaxElements from "./ParallaxElements";

const Home = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleAvatarClick = () => {
    navigate("/userinfo");
  };

  const handleButtonClick = () => {
    /* navigate to saving plan view, khi add navigate them removeEventListener */
    console.log("OK");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem("userData"));
      setUserData(storedUserData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("Updated userData:", userData);
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    /*
    <div> 
      <h2>Welcome, {userData.user.username}</h2>
      <p>Email: {userData.user.email}</p>
      <p>Phone: {userData.user.phone}</p>
      <p>Country: {userData.user.country}</p>
      <img src={userData.user.profilePicture} alt="Profile" />
    </div>
    */
    <>
      <div className="profile-screen">
        <ParallaxElements />

        <img
          src={avatar}
          alt="avatar"
          className="profile-picture"
          onClick={handleAvatarClick}
        />
        <p className="profile-name">Minh Lok Global Ban</p>
        <p className="profile-balance">money: 5.000.000</p>
        <button className="confirm-button" onClick={handleButtonClick}>
          Saving plan
        </button>
      </div>
    </>
  );
};

export default Home;
