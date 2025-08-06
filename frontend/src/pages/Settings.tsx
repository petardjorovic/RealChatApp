import SessionCard from "@/components/SessionCard";
import { useSession } from "@/queryHooks/useSession";
import { Loader2 } from "lucide-react";

function Settings() {
  const { sessions, isPending, isSuccess, isError } = useSession();
  return (
    <div className="container mt-16 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-semibold mb-6">My Sessions</h1>
      {isPending && <Loader2 />}
      {isError && <p className="text-destructive">Failed to get sessions.</p>}
      {isSuccess && (
        <div className="flex flex-col space-y-3 items-start">
          {sessions.map((session) => (
            <SessionCard key={session._id} session={session} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Settings;
