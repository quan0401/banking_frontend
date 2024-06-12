import React, { useEffect, useState } from "react";
import { authService } from "@services/api/auth/auth.service";
import { useAppSelector } from "@redux/store";
import { IReduxState } from "@interfaces/store.interface";
import CircularPageLoader from "@shared/CircularPageLoader";

import {
  FaPencilAlt,
  FaIdCard,
  FaMoneyBillWave,
  FaPhone,
  FaEnvelope,
  FaHome,
} from "react-icons/fa";

const UserInfo: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  useEffect(() => {
    console.log(1);
    if (authUser?.id) {
      // customer information
      authService.currentUser(`${authUser?.id}`).then((res) => {
        setUserInfo(res.data.user);
        console.log(res);
      });
    }
  }, [authUser?.id]);

  return (
    // <div className="flex bg-gradient-to-b from-purple-400 via-blue-500 to-blue-600 text-white min-h-screen">
    //   <div className="w-1/2 p-10">
    //     <div className="relative w-32 h-32">
    //       <img
    //         className="rounded-full border-4 border-white"
    //         alt="Mask group"
    //         src={userInfo.profilePicture}
    //       />
    //     </div>
    //     <button className="absolute top-0 right-0 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
    //       <FaPencilAlt className="h-5 w-5 inline-block mr-1" />
    //       Sửa
    //     </button>
    //   </div>
    //   <div className="w-1/2 p-10">
    //     <div className="text-2xl mb-4">{userInfo.username}</div>
    //     <div className="grid grid-cols-2 gap-4">
    //       <div className="flex items-center">
    //         <FaIdCard className="h-5 w-5 inline-block mr-2" />
    //         ID : {userInfo.id}
    //       </div>
    //       <div className="flex items-center">
    //         <FaMoneyBillWave className="h-5 w-5 inline-block mr-2" />
    //         Balance : {userInfo.balance}
    //       </div>
    //       <div className="flex items-center">
    //         <FaPhone className="h-5 w-5 inline-block mr-2" />
    //         Phone number : {userInfo.phone}
    //       </div>
    //       <div className="flex items-center">
    //         <FaEnvelope className="h-5 w-5 inline-block mr-2" />
    //         Email address : {userInfo.email}
    //       </div>
    //       <div className="flex items-center">
    //         <FaIdCard className="h-5 w-5 inline-block mr-2" />
    //         CCCD : {userInfo.cccd}
    //       </div>
    //       <div className="flex items-center">
    //         <FaHome className="h-5 w-5 inline-block mr-2" />
    //         Home Address : {userInfo.homeAddress}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div>
    //   <div className="relative">
    //     <img
    //       className="w-full h-full object-cover"
    //       alt="Mask group"
    //       src={userInfo.profilePicture}
    //     />
    //   </div>
    // </div>

    <div>
      <>
        {!userInfo ? (
          <CircularPageLoader />
        ) : (
          <div className="flex p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="w-1/2 relative">
              <img
                className="w-30 h-30 object-cover rounded-2xl"
                alt="User profile"
                src={userInfo.profilePicture}
              />
              <button className="absolute top-2 right-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                <FaPencilAlt className="inline-block mr-2" />
                Edit
              </button>
            </div>
            <div className="w-1/2 pl-6">
              <h2 className="text-4xl font-bold mb-4">{userInfo.username}</h2>
              <div className="grid grid-cols-1 gap-6 text-lg">
                <p className="flex items-center">
                  <FaIdCard className="inline-block mr-2" />
                  ID: {userInfo.id}
                </p>
                <p className="flex items-center">
                  <FaMoneyBillWave className="inline-block mr-2" />
                  Balance: {userInfo.balance}
                </p>
                <p className="flex items-center">
                  <FaPhone className="inline-block mr-2" />
                  Phone: {userInfo.phone}
                </p>
                <p className="flex items-center">
                  <FaEnvelope className="inline-block mr-2" />
                  Email: {userInfo.email}
                </p>
                <p className="flex items-center">
                  <FaIdCard className="inline-block mr-2" />
                  CCCD: {userInfo.cccd}
                </p>
                <p className="flex items-center">
                  <FaHome className="inline-block mr-2" />
                  Address: {userInfo.homeAddress}
                </p>
              </div>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UserInfo;
