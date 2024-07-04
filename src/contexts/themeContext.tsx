import {
  createContext,
  FC,
  ReactElement,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { ITheme, IThemeContext } from "../interfaces/contexts.interface";

export const ThemeContext = createContext<IThemeContext>({
  theme: "light",
});

const ThemeProvider: FC<{ children: ReactNode }> = ({
  children,
}): ReactElement => {
  const browserTheme = window.matchMedia("(prefers-color-scheme: light)");

  const persisted: string | undefined = JSON.parse(
    `${localStorage.getItem("theme")}`
  );

  const [theme, setTheme] = useState<ITheme>(
    persisted === "dark" ? "dark" : "light"
  );

  const saveThemePreference = () => {
    localStorage.setItem("theme", JSON.stringify(theme));
  };

  const toggleTheme = (newTheme?: ITheme) => {
    if (!newTheme) {
      setTheme(theme === "light" ? "dark" : "light");
    } else setTheme(newTheme);
  };

  useEffect(() => {
    saveThemePreference();
    browserTheme.addEventListener("change", (e: MediaQueryListEvent) => {
      e.matches ? setTheme("light") : setTheme("dark");
    });
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): IThemeContext => useContext(ThemeContext);

export default ThemeProvider;
