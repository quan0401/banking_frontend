import Drawer from "./styles";

import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import Button from "@shared/button/Button";
import { FaRegMoon } from "react-icons/fa";
import Logo from "@components/Logo";
import { useWindowSize } from "react-use";
import { useSidebar } from "@contexts/sidebarContext";

export default function SideBar() {
  const { width } = useWindowSize();
  const isPermanent = width >= 1920;
  const { setOpen, open } = useSidebar();

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
            {["DashBoard", "Products", "Statistics", "Balance"].map(
              (text, index) => (
                <Button
                  key={index}
                  label={
                    <div className="menu-item flex items-center">
                      <FaRegMoon size={24} className="icon" />
                      <p className="ml-3 text-xl font-semibold">{text}</p>
                    </div>
                  }
                />
              )
            )}
          </div>
        </List>
        <Divider />
      </Drawer>
    </div>
  );
}
