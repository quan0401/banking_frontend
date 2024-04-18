import React, { useEffect, useState } from 'react';

const Home = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = JSON.parse(localStorage.getItem('userData'));
      setUserData(storedUserData);
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log('Updated userData:', userData);
  }, [userData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Welcome, {userData.user.username}</h2>
      <p>Email: {userData.user.email}</p>
      <p>Phone: {userData.user.phone}</p>
      <p>Country: {userData.user.country}</p>
      <img src={userData.user.profilePicture} alt="Profile" />
      {/* Display other user data as needed */}
    </div>
  );
};

export default Home;
