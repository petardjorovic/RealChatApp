import { Alert, AlertTitle } from "@/components/ui/alert";
import { useAuth } from "@/queryHooks/useAuth";
import { AlertCircleIcon } from "lucide-react";

function Profile() {
  const { user } = useAuth();

  return (
    <div className="flex flex-col my-16 items-center justify-center">
      <h1 className="mb-4 text-3xl font-semibold">My Account</h1>
      {!user?.verified && (
        <Alert variant={"destructive"} className="w-fit rounded-2xl mb-3">
          <AlertTitle className="flex items-center gap-x-2 justify-center">
            <AlertCircleIcon />
            Please verify your email
          </AlertTitle>
        </Alert>
      )}
      <p className="text-foreground mb-2">
        Email: <span className="text-foreground text-sm">{user?.email}</span>
      </p>
      {user?.createdAt && (
        <p className="text-foreground mb-2">
          Created on:{" "}
          <span className="text-foreground text-sm">
            {new Date(user.createdAt).toLocaleDateString("en-US")}
          </span>
        </p>
      )}
    </div>
  );
}

export default Profile;
