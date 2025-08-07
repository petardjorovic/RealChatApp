import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <button
      className="bg-none border-none p-[0.6rem] rounded-[5px] transition-all duration-200 hover:bg-gray-100"
      onClick={toggleDarkMode}
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}

export default DarkModeToggle;
