import Drawer from "./styles";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@shared/button/Button";
import { FaHome, FaMoneyBill, FaRegMoon, FaUser } from "react-icons/fa";
import Logo from "@components/Logo";
import { useWindowSize } from "react-use";
import { useSidebar } from "@contexts/sidebarContext";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { FaBoxesPacking } from "react-icons/fa6";
import { IReduxState } from "@interfaces/store.interface";
import { useAppSelector } from "@redux/store";
import { findIndex } from "lodash";

const routes = [
  {
    route: "/",
    title: "Home",
    icon: <FaHome size={24} />,
  },
  {
    route: "/userSaving/all/view",
    title: "View Your Savings",
    icon: <FaBoxesPacking size={24} />,
  },
  {
    route: "/profile",
    title: "View Your info",
    icon: <FaUser size={24} />,
  },
  {
    route: "/userSaving/all/view",
    title: "View all of your savings",
    icon: <FaMoneyBill size={24} />,
  },
];

export default function SideBar() {
  const { width } = useWindowSize();
  const isPermanent = width >= 1920;
  const { setOpen, open } = useSidebar();
  const navigate: NavigateFunction = useNavigate();
  const authUser = useAppSelector((state: IReduxState) => state.authUser);
  if (authUser?.isAdmin === 1) {
    if (findIndex(routes, { route: "/admin" }) === -1)
      routes.unshift({
        route: "/admin",
        title: "Switch to Admin",
        icon: <FaUser size={24} />,
      });
  }

  const handleSetOpen = (show: boolean) => {
    if (setOpen) {
      setOpen(show);
    }
  };

  return (
    <div className="bg-widget">
      {/* 
      // @ts-ignore */}
      <Drawer
        id="appMenu"
        anchor="left"
        transitionDuration={350}
        open={open}
        onOpen={() => handleSetOpen(true)}
        onClose={() => handleSetOpen(false)}
        variant={isPermanent ? "permanent" : "temporary"}
      >
        <Logo />
        <span className="menu_divider mt-5" />

        <List>
          <div className="menu">
            {routes.map((route, index) => (
              <Button
                key={index}
                onClick={() => navigate(route.route)}
                className="hover:opacity-80"
                label={
                  <div className="menu-item flex items-center">
                    {route.icon ? (
                      route.icon
                    ) : (
                      <FaRegMoon size={24} className="icon" />
                    )}
                    <p className="ml-3 text-xl font-semibold">{route.title}</p>
                  </div>
                }
              />
            ))}
          </div>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
