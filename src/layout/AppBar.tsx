import Search from "@components/Search";
import SettingDropDown from "@components/SettingDropDown";
import { useSidebar } from "@contexts/sidebarContext";
import { useTheme } from "@contexts/themeContext";
import useDetectOutsideClick from "@hooks/useDetectOutsideClick";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
import Button from "@shared/button/Button";
import CustomTooltip from "@shared/tooltip/CustomToolTip";
import { FC, ReactElement, useState, useRef } from "react";

import Headroom from "react-headroom";
import { FaBars, FaBell, FaMoon } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useWindowSize } from "react-use";

const AppBar: FC = (): ReactElement => {
  const { width } = useWindowSize();
  const [query, setQuery] = useState<string>("");
  const { toggleTheme } = useTheme();
  const { setOpen } = useSidebar();
  const userInfo = useAppSelector((state: IReduxState) => state.authUser);

  const handleToggleTheme = () => {
    if (toggleTheme) {
      toggleTheme();
    }
  };

  const settingDropDownRef = useRef(null);

  const [openSettingDropdown, setOpenSettingDropdown] = useDetectOutsideClick(
    settingDropDownRef,
    false
  );

  return (
    <>
      <Headroom>
        <div className="flex items-center justify-between gap-5">
          {width < 1920 && (
            <Button
              label={<FaBars className="icon text-2xl" />}
              onClick={() => {
                if (setOpen) {
                  setOpen((prev: boolean) => !prev);
                }
              }}
            />
          )}
          <Link to="/" className="h4">
            Home
          </Link>

          {width >= 768 && (
            <Search
              wrapperClass="flex-1 max-w-[1054px] ml-5 mr-auto 4xl:ml-0"
              query={query}
              setQuery={setQuery}
            />
          )}
          <Button
            label={<FaMoon className="icon text-2xl" />}
            onClick={handleToggleTheme}
          />
          <Button label={<FaBell className="icon text-2xl" />} />
          <Button label={<FaMessage className="icon text-2xl" />} />
          <div className="relative">
            <CustomTooltip
              title={<SettingDropDown />}
              open={openSettingDropdown}
              setOpen={setOpenSettingDropdown}
              withArrow={true}
            >
              <button
                ref={settingDropDownRef}
                onClick={() => setOpenSettingDropdown(!openSettingDropdown)}
              >
                <img
                  src={`${userInfo?.profilePicture}`}
                  alt="profile"
                  className="h-7 w-7 rounded-full object-cover"
                />
              </button>
            </CustomTooltip>
          </div>
        </div>
      </Headroom>
    </>
  );
};

export default AppBar;
