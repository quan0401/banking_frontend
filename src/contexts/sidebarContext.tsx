import { ISideBarContext } from "@interfaces/contexts.interface";
import {
  useState,
  createContext,
  useContext,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

const SidebarContext = createContext<ISideBarContext>({
  open: false,
});

export const SidebarProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close sidebar when route changes
  useEffect(() => {
    setOpen(false);
  }, [location]);

  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
