import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { useWindowSize } from "react-use";
import media from "@assets/login.webp";
import TextInput from "@shared/inputs/TextInput";
import Button from "@shared/button/Button";
import { authService } from "@services/axios";
import { ISignInBody } from "@interfaces/features/auth.interface";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { addAuthUser } from "@redux/reducers/auth.reducer";
import Logo from "@components/Logo";
import Spring from "@components/Spring";
import { IReduxState } from "@interfaces/store.interface";
import { toggleHeader } from "@redux/reducers/header.reducer";
import { showErrorToast } from "@utils/utils.service";
import { isAxiosError } from "axios";

const Login: FC = (): ReactElement => {
  const { width } = useWindowSize();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  const [info, setInfo] = useState<ISignInBody>({
    email: "dongminhquan2004@gmail.com",
    password: "quan0401",
  });

  const handleOnChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setInfo({ ...info, [name]: value });
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const {
        data: { user },
      } = await authService.signIn(info);
      dispatch(addAuthUser({ authInfo: user }));
      dispatch(toggleHeader(true));
      navigate("/");
    } catch (error) {
      if (isAxiosError(error)) {
        showErrorToast(error.response?.data.message);
      } else {
        showErrorToast("Error");
      }
    }
  };

  useEffect(() => {
    if (authUser?.id) {
      navigate("/");
      dispatch(toggleHeader(true));
    } else {
      dispatch(toggleHeader(false));
    }
  }, [authUser]);

  return (
    <div className=" flex-1 grid grid-cols-1 lg:grid-cols-2">
      {width >= 1024 && (
        <div className="flex flex-col justify-center items-center lg:p-[60px]">
          <Logo imgClass="w-[60px]" textClass="text-[28px]" />
          <p className=" text-center tracking-[0.2px] font-semibold text-lg leading-6 max-w-[540px] my-7">
            Secure your dreams, one deposit at a time. Welcome to a future
            filled with possibilities.
          </p>
          <img className="max-w-[780px]" src={media} alt="media" />
        </div>
      )}
      <div className="bg-widget flex flex-col items-center justify-center lg:px-[60px]">
        <Spring className="w-full max-w-[460px]">
          <div className="text-center flex gap-3 flex-col">
            <h1>Welcome back!</h1>
            <p className="lg:max-w-[300px] m-auto 4xl:max-w-[unset]">
              Quan dep zai vcl{" "}
            </p>
          </div>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-5">
              <label htmlFor="email" className="field-label">
                E-mail
              </label>
              <TextInput
                type="email"
                name="email"
                className="field-input"
                placeholder="Your E-mail address"
                value={info.email}
                onChange={handleOnChange}
              />
              <label htmlFor="email" className="field-label">
                Password
              </label>
              <TextInput
                type="password"
                name="password"
                className="field-input"
                placeholder="Your password"
                value={info.password}
                onChange={handleOnChange}
              />
              <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                <Button className="text-btn" label="Forgot Password" />
                <Button
                  className="text-btn"
                  label="Register"
                  onClick={() => navigate("/signup")}
                />
                <Button className="btn btn--primary w-full" label="Log In" />
              </div>
            </div>
          </form>
        </Spring>
      </div>
    </div>
  );
};

export default Login;
