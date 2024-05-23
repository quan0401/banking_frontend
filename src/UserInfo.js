import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import userDataTest from "./userData.json";
import iconPencil from "./icons/pencil.png";
import iconId from "./icons/id.png";
import iconBalance from "./icons/money.png";
import iconPhone from "./icons/phone.png";
import iconEmail from "./icons/mail.png";
import iconCCCD from "./icons/cccd.png";
import iconHome from "./icons/home.png";
import iconCreated from "./icons/add-user.png";

function UserInfo() {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const dateTime = new Date(userDataTest.user.createdAt).toLocaleDateString();

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
    <div className="desktop">
      <div className="left-column">
        <div className="avatar">
          <img
            className="mask-group"
            alt="Mask group"
            src={userDataTest.user.profilePicture}
          />
        </div>
        <button className="overlap-group">
          <img className="pencil-icon" alt="Pencil icon" src={iconPencil} />
          <div className="text-wrapper">Sửa</div>
        </button>
      </div>
      <div className="right-column">
        <div className="text-wrapper-2">{userDataTest.user.username}</div>
        <div className="info-section">
          <div className="info-item">
            <img className="icon" alt="Id icon" src={iconId} />
            <div className="text-wrapper-4">ID : {userDataTest.user.id}</div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Balance icon" src={iconBalance} />
            <div className="text-wrapper-5">
              Balance : {userDataTest.user.balance}
            </div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Phone icon" src={iconPhone} />
            <div className="text-wrapper-6">
              Phone number : {userDataTest.user.phone}
            </div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Mail icon" src={iconEmail} />
            <div className="text-wrapper-7">
              Email address : {userDataTest.user.email}
            </div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Cccd icon" src={iconCCCD} />
            <div className="text-wrapper-8">
              CCCD : {userDataTest.user.cccd}
            </div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Home icon" src={iconHome} />
            <div className="text-wrapper-3">
              Home Address : {userDataTest.user.homeAddress}
            </div>
          </div>
          <div className="info-item">
            <img className="icon" alt="Created icon" src={iconCreated} />
            <div className="text-wrapper-9">Created at : {dateTime}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
