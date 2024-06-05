import { Dispatch, SetStateAction } from "react";

export type ITheme = "dark" | "light";

export interface IThemeContext {
  theme: string;
  toggleTheme?: () => void;
}

export interface ISideBarContext {
  open: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
}
