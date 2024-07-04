import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { IReduxState } from "@interfaces/store.interface";
import CircularPageLoader from "@shared/CircularPageLoader";
import { FaPencilAlt } from "react-icons/fa";
import TextInput from "@shared/inputs/TextInput";
import Button from "@shared/button/Button";
import {
  IAuthDocument,
  IUpdateProfileBody,
} from "@interfaces/features/auth.interface";
import { checkImageOrVideo, readAsBase64 } from "@utils/image-utils.service";
import isEqual from "react-fast-compare";
import { isAxiosError } from "axios";
import { showErrorToast, showSuccessToast } from "@utils/utils.service";
import { authService } from "@services/axios";
import { addAuthUser } from "@redux/reducers/auth.reducer";

const UserInfo: React.FC = () => {
  const userInfo = useAppSelector((state: IReduxState) => state.authUser);
  const initValues = {
    username: userInfo?.username,
    phone: userInfo?.phone,
    homeAddress: userInfo?.homeAddress,
    profilePicture: userInfo?.profilePicture,
    cccd: userInfo?.cccd,
  };
  const [info, setInfo] = useState<IAuthDocument>(initValues);
  const usernameRef = React.useRef<HTMLInputElement>(null);
  const [edit, setEdit] = useState<boolean>(false);
  const [infoHasChanged, setInfoHasChanged] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const handleOnChange = (e: ChangeEvent) => {
    const { name, value } = e.target as HTMLInputElement;
    setInfo({ ...info, [name]: value });
  };

  const handleEditButton = () => {
    if (edit) {
      setInfo({
        username: userInfo?.username,
        phone: userInfo?.phone,
        homeAddress: userInfo?.homeAddress,
        profilePicture: userInfo?.profilePicture,
        cccd: userInfo?.cccd,
        emailVerified: userInfo?.emailVerified,
      });
      setEdit(false);
    } else {
      setEdit(true);
      usernameRef.current?.focus();
    }
  };

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
    const body: IUpdateProfileBody = {
      ...info,
      profilePicture:
        initValues.profilePicture === info.profilePicture
          ? ""
          : info.profilePicture,
    };
    setIsLoading(true);
    try {
      const { data } = await authService.updateInfo(body);
      const user = data.user;
      dispatch(addAuthUser({ authInfo: user }));
      showSuccessToast("Update successfully");
      setEdit(false);
    } catch (error) {
      if (isAxiosError(error)) {
        showErrorToast(error.response?.data.message);
      }
      handleEditButton();
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const hasChanged = isEqual(initValues, info);
    setInfoHasChanged(!hasChanged);
  }, [info]);

  return (
    <div>
      <>
        {!userInfo ? (
          <CircularPageLoader />
        ) : (
          <div className="lg:flex p-6 bg-gray-100 rounded-lg shadow-md">
            <div className="lg:w-1/2 relative">
              <img
                className="w-30 h-30 object-cover rounded-2xl max-w-[360px] max-h-[480px] mb-4"
                alt="User profile"
                src={info.profilePicture}
              />
              <button
                className={`top-2 right-2 btn btn--primary ${
                  !edit ? "" : "!bg-red !border-none"
                }`}
                onClick={handleEditButton}
              >
                <FaPencilAlt className="inline-block mr-2" />
                {edit ? "Cancel editing" : "Edit"}
              </button>
            </div>
            <div className="lg:w-1/2 lg:pl-6">
              <h2 className="text-4xl font-bold mb-4">{userInfo.username}</h2>
              <form onSubmit={onSubmit}>
                <div className="flex flex-col gap-5">
                  <label htmlFor="username" className="field-label">
                    Username
                  </label>
                  <TextInput
                    type="text"
                    ref={usernameRef}
                    name="username"
                    className={`field-input ${
                      !edit ? "!cursor-not-allowed" : ""
                    }`}
                    readOnly={!edit}
                    placeholder="Your username"
                    value={info.username}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="phone" className="field-label">
                    Phone
                  </label>
                  <TextInput
                    type="tel"
                    name="phone"
                    className={`field-input ${
                      !edit ? "!cursor-not-allowed" : ""
                    }`}
                    readOnly={!edit}
                    placeholder="Your phone number"
                    value={info.phone}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="homeAddress" className="field-label">
                    Home Address
                  </label>
                  <TextInput
                    type="text"
                    name="homeAddress"
                    className={`field-input ${
                      !edit ? "!cursor-not-allowed" : ""
                    }`}
                    readOnly={!edit}
                    placeholder="Your home address"
                    value={info.homeAddress}
                    onChange={handleOnChange}
                  />
                  <label htmlFor="cccd" className="field-label">
                    CCCD
                  </label>
                  <TextInput
                    type="text"
                    name="cccd"
                    className={`field-input ${
                      !edit ? "!cursor-not-allowed" : ""
                    }`}
                    readOnly={!edit}
                    placeholder="Your CCCD"
                    value={info.cccd}
                    onChange={handleOnChange}
                  />
                  <div className="flex items-center">
                    <label htmlFor="cccd" className="field-label mr-4">
                      Email Verified
                    </label>
                    <input
                      type="checkbox"
                      name="emailVerified"
                      className="w-6 h-6 cursor-not-allowed"
                      placeholder="Email Verified"
                      checked={userInfo.emailVerified as boolean}
                      onChange={() => {}}
                    />
                  </div>
                  <label htmlFor="cccd" className="field-label mr-4 ">
                    Profile picture
                  </label>
                  <input
                    type="file"
                    name="profilePicture"
                    placeholder="Your profile picture (base64)"
                    // value={info.profilePicture}
                    onChange={handleFileChange}
                    className={` ${
                      !edit ? "!cursor-not-allowed" : "cursor-pointer"
                    }`}
                    style={{
                      padding: "10px",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                    disabled={!edit}
                  />

                  <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                    <Button
                      className="btn btn--primary w-full"
                      label={isLoading ? "Loading..." : "Save changes"}
                      disabled={!infoHasChanged || !edit || isLoading}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default UserInfo;
