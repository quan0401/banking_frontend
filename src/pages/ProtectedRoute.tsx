import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
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

  useEffect(() => {
    if (authData) {
      authService
        .currentUser(`${authData.id}`)
        .then((res: AxiosResponse) => {
          setValid(true);
        })
        .catch((reason: AxiosResponse) => {
          console.log(reason);
          setValid(false);
          navigate("/login");
        });
    }
  }, []);

  return <>{!valid ? <></> : children}</>;
};

export default ProtectedRoute;
