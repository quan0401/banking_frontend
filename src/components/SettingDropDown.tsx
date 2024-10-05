import { IReduxState } from "@interfaces/store.interface";
import { logout } from "@redux/reducers/logout.reducer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { authService } from "@services/axios";
import { FC, ReactElement } from "react";
import { NavigateFunction, useNavigate, Link } from "react-router-dom";

const SettingDropDown: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  const dispatch = useAppDispatch();

  const onLogout = async (): Promise<void> => {
    await authService.signout();
    dispatch(logout(true));
    navigate("/login");
  };

  return (
    <div className="bg-widget border-grey w-44 divide-y divide-gray-100 rounded border shadow-md">
      <ul className="py-2 text-sm" aria-labelledby="avatarButton">
        <li className="mx-3 mb-1">
          <Link
            to="/profile"
            className="block w-full cursor-pointer rounded  px-4s py-2  font-bold  focus:outline-none"
          >
            View your info
          </Link>
        </li>

        <li>
          <Link to={"/"} className="block px-4 py-2 ">
            Settings
          </Link>
        </li>
        {authUser?.isAdmin && (
          <li>
            <Link to={"/admin"} className="block px-4 py-2 ">
              Switch to admin
            </Link>
          </li>
        )}
      </ul>
      <div className="py-1">
        <div
          onClick={() => onLogout()}
          className="block px-4 py-2 text-sm cursor-pointer"
        >
          Sign out
        </div>
      </div>
    </div>
  );
};

export default SettingDropDown;
