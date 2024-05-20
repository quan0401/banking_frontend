import React, { useEffect, useState } from "react";
import "./UserInfo.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import userDataTest from "./userData.json";

const UserInfo = () => {
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
    <>
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Information</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
        />
      </head>
      <body style={{ backgroundColor: "#353353" }}>
        <div class="container">
          <h1 style={{ color: "white" }}>User Information</h1>

          <div id="user-info" class="card mt-3">
            <div class="card-header">User Details</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <div class="form-group">
                    <img
                      src={userDataTest.user.profilePicture}
                      alt="Profile Picture"
                      id="profilePicture"
                      class="img-thumbnail"
                    />
                  </div>
                  <div class="form-group">
                    <label for="id">ID:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="id"
                      readonly
                      disabled
                      value={userDataTest.user.id}
                    />
                  </div>
                  <div class="form-group">
                    <label for="username">Username:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="username"
                      readonly
                      disabled
                      value={userDataTest.user.username}
                    />
                  </div>
                  <div class="form-group">
                    <label for="profilePublicID">Profile Public ID:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="profilePublicID"
                      readonly
                      disabled
                      value={userDataTest.user.profilePublicId}
                    />
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="balance">Balance:</label>
                    <input
                      type="number"
                      class="form-control"
                      id="balance"
                      readonly
                      disabled
                      value={userDataTest.user.balance}
                    />
                  </div>
                  <div class="form-group">
                    <label for="phone">Phone Number:</label>
                    <input
                      type="tel"
                      class="form-control"
                      id="phone"
                      readonly
                      disabled
                      value={userDataTest.user.phone}
                    />
                  </div>
                  <div class="form-group">
                    <label for="email">Email:</label>
                    <input
                      type="email"
                      class="form-control"
                      id="email"
                      readonly
                      disabled
                      value={userDataTest.user.email}
                    />
                  </div>
                  <div class="form-group">
                    <label for="cccd">CCCD:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="cccd"
                      readonly
                      disabled
                      value={userDataTest.user.cccd}
                    />
                  </div>
                  <div class="form-group">
                    <label for="address">Address:</label>
                    <textarea
                      class="form-control"
                      id="address"
                      rows="3"
                      readonly
                      disabled
                      value={userDataTest.user.homeAddress}
                    ></textarea>
                  </div>
                  <div class="form-group">
                    <label for="createAt">Created At:</label>
                    <input
                      type="text"
                      class="form-control"
                      id="createAt"
                      readonly
                      disabled
                      value={dateTime}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <script src="script.js"></script>
      </body>
    </>
  );
};

export default UserInfo;
