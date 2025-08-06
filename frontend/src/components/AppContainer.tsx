import { useAuth } from "@/queryHooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";
import UserMenu from "./UserMenu";

function AppContainer() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <Loader2 className="mb-4" />
    </div>
  ) : user ? (
    <div className="min-h-screen p-4">
      <UserMenu />
      <Outlet />
    </div>
  ) : (
    <Navigate
      to={"/login"}
      replace
      state={{
        redirectUrl: window.location.pathname,
      }}
    />
  );
}

export default AppContainer;
