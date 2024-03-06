import { createContext, useContext, useState } from "react";
import { IChildren } from "../interfaces/children-interface";
import { ITheme } from "../interfaces/theme-interface";

interface IThemeContext {
  theme: ITheme | null;
  changeTheme: () => void;
}

const LightTheme: ITheme = {
  theme: "Light",
  colors: {
    primary: "white",
  },
};

const DarkTheme: ITheme = {
  theme: "Dark",
  colors: {
    primary: "black",
  },
};

const context = createContext<IThemeContext>({} as IThemeContext);

export function ThemeProvider({ children }: IChildren) {
  const [theme, setTheme] = useState<ITheme | null>(LightTheme);

  const changeTheme = () => {
    setTheme((prevTheme) => {
      return prevTheme === LightTheme ? DarkTheme : LightTheme;
    });
  };

  const data = { theme, changeTheme };

  return <context.Provider value={data}>{children}</context.Provider>;
}

export function useTheme(): IThemeContext {
  return useContext(context);
}
