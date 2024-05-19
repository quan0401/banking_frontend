import Data from "./Data.json";
import "./User.css";
import React, { useState } from "react";
import axios from "axios";
import { useUser } from "./UserContext";

const User = () => {
  const { userData } = useUser(); // Get user data from context
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
    <div className="content">
    
      <div className="container">
        <div className="row align-items-stretch no-gutters contact-wrap">
          <div className="col-md-12">
            <div className="form h-100">
              <h3>Happy to see you, {Data.user.username}</h3>
              <h4>Your balance now : {Data.user.balance}</h4>
              <form className="mb-5" method="post" id="contactForm" name="contactForm">
                <div className="row">
                  <div classNameName="col-md-6 form-group mb-3">
                    <label for="" className="col-form-label">Saving Plan Name *</label>
                    <input type="text" className="form-control" name="name" id="name" placeholder="Your saving plan name" />
                  </div>
                  <div className="col-md-6 form-group mb-3">
                    <label for="" className="col-form-label">Your Option *</label>
                    <select
                      type="text" className="form-control" name="savingOption" id="savingOption"  
                      value={option}
                      onChange={(e) => setOption(e.target.value)}
                    >
                      <option selected>Choose...</option>
                      <option value="KH0">No limit time</option>
                      <option value="KH3">3 months</option>
                      <option value="KH6">6 months</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group mb-3">
                    <label for="budget" className="col-form-label">Your saving money</label>
                    <input
                      type="text"
                      placeholder="Enter money : "
                      value={savingMoney}
                      onChange={(e) => setSavingMoney(e.target.value)}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group mb-3">
                    <span>
                      Your home addess : {Data.user.homeAddress}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group mb-3">
                    <span>
                      Your CCCD : {Data.user.cccd}
                    </span>
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-12 form-group">
                    <input type="submit" value="Summit" className="btn btn-primary rounded-0 py-2 px-4" onSubmit={handleSubmit} />
                    <span className="submitting"></span>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

    </div>

   
  );
};

export default User;
