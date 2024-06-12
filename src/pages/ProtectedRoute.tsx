import { IReduxState } from "@interfaces/store.interface";
import { toggleHeader } from "@redux/reducers/header.reducer";
import { logout } from "@redux/reducers/logout.reducer";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { authService } from "@services/api/auth/auth.service";
import { AxiosResponse } from "axios";
import { FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";

const ProtectedRoute: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const authData = useAppSelector((state: IReduxState) => state.authUser);
  const [valid, setValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (authData) {
      authService
        .currentUser(`${authData.id}`)
        .then((res: AxiosResponse) => {
          setValid(true);
        })
        .catch((reason: AxiosResponse) => {
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
