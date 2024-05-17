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
    <div className="contact1">
      <div className="container-contact1">

        <form className="contact1-form validate-form">
          <span className="contact1-form-title">
            Happy to see you, {Data.user.username}
          </span>

          <div className="wrap-input1 validate-input" data-validate="Money is required">
            <input className="input1" type="text" name="savingMoney" id="savingMoney" placeholder="Saving Money"/>
            <span className="shadow-input1"></span>
          </div>

          <div className="wrap-input1 validate-input">
          <select className="input1" name="savingOption" value={option} onChange={(e) => setOption(e.target.value)}>
              <option value="KH0">No limit time</option>
              <option value="KH3">3 months</option>
              <option value="KH6">6 months</option>
            </select>
            <span className="shadow-input1"></span>
          </div>

          <span className="contact1-form-content">
            Home address : {Data.user.homeAddress} <br />
            CCCD : {Data.user.cccd}
          </span>

          <div className="container-contact1-form-btn">
            <button className="contact1-form-btn" id="submitButton" onSubmit={handleSubmit}>
              <span>
                Submit
                <i className="fa fa-long-arrow-right" aria-hidden="true"></i>
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

   
  );
};

export default User;
