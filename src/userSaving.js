import React from 'react';
import SavingsCards from './components/savingCard'; 
const UserSavings = () => {
  const userId = 1; 

  return (
    <div>
      <SavingsCards userId={userId} />
    </div>
  );
};

export default UserSavings;
