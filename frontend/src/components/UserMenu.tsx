import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { logout } from "@/lib/api";
import queryClient from "@/config/queryClient";
import { useDarkMode } from "@/hooks/useDarkMode";
import { Moon, Sun } from "lucide-react";

function UserMenu() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const { mutate: signOut } = useMutation({
    mutationFn: logout,
    onSettled: () => {
      queryClient.clear();
      navigate("/login", { replace: true });
    },
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className="absolute left-6 bottom-6 w-12 h-12"
      >
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>PD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigate("/")}>
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigate("/settings")}>
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem onClick={toggleDarkMode}>
            {isDarkMode ? (
              <>
                Light mode
                <DropdownMenuShortcut>
                  <Sun />
                </DropdownMenuShortcut>
              </>
            ) : (
              <>
                Dark mode
                <DropdownMenuShortcut>
                  <Moon />
                </DropdownMenuShortcut>
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default UserMenu;
