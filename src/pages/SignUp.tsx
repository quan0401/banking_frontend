import {
  ChangeEvent,
  FC,
  FormEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import Spring from "../components/Spring";
import TextInput from "@shared/inputs/TextInput";
import { ISignUpBody } from "@interfaces/features/auth.interface"; // Update this
import { useNavigate, NavigateFunction } from "react-router-dom";

import Button from "@shared/button/Button";
import { useScheme } from "@hooks/useScheme";
import { registerUserSchema } from "@utils/schemes/auth.scheme";
import { handleFilterError } from "@utils/utils.service";
import { checkImageOrVideo, readAsBase64 } from "@utils/image-utils.service";
import { authService } from "@services/axios";
import { useAppSelector } from "@redux/store";
import { IReduxState } from "@interfaces/store.interface";

const SignUp: FC = (): ReactElement => {
  const navigate: NavigateFunction = useNavigate();
  const [showError, setShowError] = useState<boolean>(false);
  const authUser = useAppSelector((state: IReduxState) => state.authUser);

  const [info, setInfo] = useState<ISignUpBody>({
    username: "",
    password: "",
    email: "",
    phone: "",
    cccd: "",
    homeAddress: "",
    profilePicture: "",
  });

  const handleOnChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setShowError(false);
    setInfo({ ...info, [name]: value });
  };
  const [schemaValidation, validationErrors] = useScheme({
    schema: registerUserSchema,
    info: info,
  });

  const handleFileChange = async (e: ChangeEvent): Promise<void> => {
    try {
      const target: HTMLInputElement = e.target as HTMLInputElement;
      if (target.files?.length) {
        const file: File = target.files[0];
        const isValid = checkImageOrVideo(file, "image");
        if (isValid) {
          const dataImage: string | ArrayBuffer | null = await readAsBase64(
            file
          );
          setInfo({ ...info, profilePicture: `${dataImage}` });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    schemaValidation();
    setShowError(true);
    if (validationErrors.length > 0) return;
    await authService.signUp(info);
    navigate("/login");
  };

  useEffect(() => {
    if (authUser?.id) {
      navigate("/");
    }
  }, [authUser]);

  return (
    <div className="flex-1 grid grid-cols-1 lg:grid-cols-2">
      <div className="lg:absolute m-8 md:m-12  justify-center">
        <h1 className="cursor-pointer" onClick={() => navigate("/login")}>
          Login
        </h1>
        <h2 className="ml-4 lg:mt-16">Signup</h2>
      </div>
      <div className="flex flex-col items-center justify-center lg:px-[60px]">
        <Spring className="w-full max-w-[460px]">
          <div className="flex flex-col justify-center">
            <label htmlFor="username" className="field-label">
              Username
            </label>

            <TextInput
              type="text"
              name="username"
              className="field-input"
              placeholder="Your username"
              value={info.username}
              onChange={handleOnChange}
            />
            <div className=" h-12">
              <div className="mb-2"></div>
              {showError &&
                handleFilterError("username", validationErrors).map(
                  (error, index) => (
                    <p key={index} className="text-red  text-sm">
                      * {error}
                    </p>
                  )
                )}
            </div>

            <label htmlFor="email" className="field-label">
              Email
            </label>
            <TextInput
              type="tel"
              name="email"
              className="field-input"
              placeholder="Your email number"
              value={info.email}
              onChange={handleOnChange}
            />
            <div className=" h-12">
              <div className="mb-2"></div>
              {showError &&
                handleFilterError("email", validationErrors).map(
                  (error, index) => (
                    <p key={index} className="text-red  text-sm">
                      * {error}
                    </p>
                  )
                )}
            </div>

            <label htmlFor="phone" className="field-label">
              Phone
            </label>
            <TextInput
              type="tel"
              name="phone"
              className="field-input"
              placeholder="Your phone number"
              value={info.phone}
              onChange={handleOnChange}
            />
            <div className=" h-12">
              <div className="mb-2"></div>
              {showError &&
                handleFilterError("phone", validationErrors).map(
                  (error, index) => (
                    <p key={index} className="text-red  text-sm">
                      * {error}
                    </p>
                  )
                )}
            </div>
          </div>
        </Spring>
      </div>
      <div className="lg:bg-widget flex flex-col items-center justify-center lg:px-[60px]">
        <Spring className="w-full max-w-[460px]">
          <form onSubmit={onSubmit}>
            <div className="flex flex-col justify-center">
              <label htmlFor="cccd" className="field-label">
                CCCD
              </label>
              <TextInput
                type="text"
                name="cccd"
                className="field-input"
                placeholder="Your CCCD"
                value={info.cccd}
                onChange={handleOnChange}
              />
              <div className=" h-12">
                <div className="mb-2"></div>
                {showError &&
                  handleFilterError("cccd", validationErrors).map(
                    (error, index) => (
                      <p key={index} className="text-red  text-sm">
                        * {error}
                      </p>
                    )
                  )}
              </div>
              <label htmlFor="homeAddress" className="field-label">
                Home Address
              </label>
              <TextInput
                type="text"
                name="homeAddress"
                className="field-input"
                placeholder="Your home address"
                value={info.homeAddress}
                onChange={handleOnChange}
              />
              <div className=" h-12">
                <div className="mb-2"></div>
                {showError &&
                  handleFilterError("homeAddress", validationErrors).map(
                    (error, index) => (
                      <p key={index} className="text-red  text-sm">
                        * {error}
                      </p>
                    )
                  )}
              </div>

              <label htmlFor="password" className="field-label">
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
              <div className=" h-12">
                <div className="mb-2"></div>
                {showError &&
                  handleFilterError("password", validationErrors).map(
                    (error, index) => (
                      <p key={index} className="text-red  text-sm">
                        * {error}
                      </p>
                    )
                  )}
              </div>
            </div>
            <div className="absolute flex flex-col">
              <label htmlFor="profilePicture" className="field-label">
                Profile Picture (can drop image here)
              </label>
              <TextInput
                type="file"
                name="profilePicture"
                placeholder="Your profile picture (base64)"
                // value={info.profilePicture}
                onChange={handleFileChange}
                style={{
                  padding: "10px",
                  margin: "10px 0",
                  border: "1px solid #ccc",
                  borderRadius: "4px",
                }}
              />
              <div className=" h-8">
                {showError &&
                  handleFilterError("profilePicture", validationErrors).map(
                    (error, index) => (
                      <p key={index} className="text-red  text-sm">
                        * {error}
                      </p>
                    )
                  )}
              </div>
              <div className="">
                <Button className="btn btn--primary" label="Sign Up" />
              </div>
            </div>
          </form>
        </Spring>
      </div>
    </div>
  );
};

export default SignUp;
