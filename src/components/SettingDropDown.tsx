import React, { FC, ReactElement } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";

const SettingDropDown: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();

  const onLogout = (): void => {};

  return (
    <div className="bg-widget border-grey w-44 divide-y divide-gray-100 rounded border shadow-md">
      <ul className="py-2 text-sm" aria-labelledby="avatarButton">
        <li className="mx-3 mb-1">
          <Link
            to={""}
            className="block w-full cursor-pointer rounded  px-4s py-2 text-center font-bold  focus:outline-none"
          >
            Profile
          </Link>
        </li>

        <li>
          <Link to={""} className="block px-4 py-2 ">
            Settings
          </Link>
        </li>
      </ul>
      <div className="py-1">
        <div onClick={() => onLogout()} className="block px-4 py-2 text-sm ">
          Sign out
        </div>
      </div>
    </div>
  );
};

export default SettingDropDown;
