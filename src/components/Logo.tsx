import { ILogoProps } from "@interfaces/components.interface";
import { FC, ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { useTheme } from "styled-components";

// assets
import coin from "@assets/bank.svg";

const Logo: FC<ILogoProps> = ({ imgClass, textClass }): ReactElement => {
  const { theme } = useTheme();
  return (
    <NavLink className="logo" to="/">
      <span className={`logo_img relative ${imgClass || ""}`}>
        <img src={coin} alt="ShopPoint" />
        <img
          className={`absolute top-0 left-0 ${
            theme === "light" ? "hidden" : ""
          }`}
          src={coin}
          alt="ShopPoint"
        />
      </span>
      <h4 className={`logo_text ${textClass || ""}`}>Banking</h4>
    </NavLink>
  );
};

export default Logo;
