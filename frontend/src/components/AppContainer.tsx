import { useAuth } from "@/queryHooks/useAuth";
import { Loader2 } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

function AppContainer() {
  const { user, isLoading } = useAuth();

  return isLoading ? (
    <div className="flex w-screen h-{90vh} flex-col">
      <Loader2 className="mb-4" />
    </div>
  ) : user ? (
    <div className="min-h-screen p-4">
      {/* <UserMenu />  */}
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
