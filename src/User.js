import Data from "./Data.json";
import "./User.css";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";
const User = () => {
  const { userData } = useUser(); // Get user data from context
  const [username, setUsername] = useState("");
  const [savingMoney, setSavingMoney] = useState("");
  const [option, setOption] = useState("");
  const [homeAddress, setAddress] = useState("");
  const [cccd, setCccd] = useState("");
  const reader = new FileReader();
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(userData);
    const userId = userData.user.id;
    const payload = {
      userId,
      balance: savingMoney,
      savingPlanId: option,
    };
    console.log(payload);
    const response = await axios.post(
      "http://localhost:6969/api/v1/opensaving",
      payload
    );
    console.log(response.data);
  };

  return (
    <div class="container">
      <div class="text">
        <h1>Welcome, {Data.user.username}</h1>
      </div>
      <div id="contact-form">
        <div class="form-row">
          <div class="input-data">
            <h3>Your balence now : {Data.user.balance}</h3>
          </div>
        </div>
        <div class="form-row">
          <div class="input-data">
            <input
              type="text"
              placeholder="Enter money : "
              value={savingMoney}
              onChange={(e) => setSavingMoney(e.target.value)}
              className="form-control"
            />
          </div>
          <div class="input-data">
            <div className="savingOption">
            <select
              name="savingOption"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="KH0">No limit time</option>
              <option value="KH3">3 months</option>
              <option value="KH6">6 months</option>
            </select>
            </div>
          </div>
        </div>
        <div class="form-row">
          <div class="input-data text">
          <p>Home address: {Data.user.homeAddress}</p>
          <p>CCCD: {Data.user.cccd}</p>
          </div>
        </div>
        <form class="form-row submit-btn" onSubmit={handleSubmit}>
          <div class="input-data">
            <div className="inner">
              <button type="submit">Submit</button>
            </div>
          </div>
        </form>
      </div>
  </div>
   
  );
};

export default User;
