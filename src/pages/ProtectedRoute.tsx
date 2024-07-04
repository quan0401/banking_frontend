import { IReduxState } from "@interfaces/store.interface";
import { addAuthUser } from "@redux/reducers/auth.reducer";
import { toggleHeader } from "@redux/reducers/header.reducer";
import { logout } from "@redux/reducers/logout.reducer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { authService } from "@services/axios";
import { AxiosResponse } from "axios";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { useLocation } from "react-use";

const ProtectedRoute: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const authData = useAppSelector((state: IReduxState) => state.authUser);
  const [valid, setValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAdminRoute = location.pathname?.split("/")[1] === "admin";

  useEffect(() => {
    if (authData?.id) {
      authService
        .currentUser(`${authData.id}`)
        .then((res: AxiosResponse) => {
          dispatch(addAuthUser({ authInfo: res.data.user }));
          if (isAdminRoute) {
            const isAdmin = res.data.user.isAdmin === 1;
            if (isAdmin) {
              setValid(true);
            } else {
              navigate(-1);
            }
          } else {
            setValid(true);
          }
          dispatch(toggleHeader(true));
        })
        .catch((_reason: AxiosResponse) => {
          setValid(false);
          dispatch(toggleHeader(false));
          dispatch(logout(true));
          navigate("/login");
        });
    }
  }, [authData?.id, navigate]);

  return <>{!valid ? <></> : children}</>;
};

export default ProtectedRoute;
