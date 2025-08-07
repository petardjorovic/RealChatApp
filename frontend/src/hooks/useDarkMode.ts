import { DarkModeContext } from "@/contexts/DarkModeContext";
import { useContext } from "react";

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error("Context must be used within ContextProvider");
  }

  return context;
};
