import { createContext } from "react";

type DarkModeCtxProps = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

export const DarkModeContext = createContext<DarkModeCtxProps | undefined>(
  undefined
);
