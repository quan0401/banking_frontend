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
    <div className="container mt-5">
      <div className="basic-information">
        <h1>Welcome, {Data.user.username}</h1>
        <h2>Your balence now : {Data.user.balance}</h2>
      </div>

      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter money : "
          value={savingMoney}
          onChange={(e) => setSavingMoney(e.target.value)}
          className="form-control"
        />
      </div>

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

      <p>Home address: {Data.user.homeAddress}</p>
      <p>CCCD: {Data.user.cccd}</p>

      <div>
        {/* Summit button */}
        <form onSubmit={handleSubmit}>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default User;
