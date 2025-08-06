import type { Session } from "@/lib/api";
import { Button } from "./ui/button";
import { Loader2Icon } from "lucide-react";
import { useDeleteSession } from "@/queryHooks/useDeleteSession";

function SessionCard({ session }: { session: Session }) {
  const { _id, createdAt, userAgent, isCurrent } = session;

  const { deleteSession, isPending } = useDeleteSession(_id);

  return (
    <div className="flex p-3 border rounded-md">
      <div className="min-w-md">
        <p className="font-bold text-sm mb-2">
          {new Date(createdAt).toLocaleDateString("en-US")}
          {isCurrent && " (current session)"}
        </p>
        <p className="text-xs text-muted-foreground">{userAgent}</p>
      </div>
      {!isCurrent && (
        <Button
          variant={"ghost"}
          className="ml-4 self-center text-xs text-destructive flex items-center justify-center cursor-pointer"
          size={"sm"}
          onClick={() => deleteSession()}
          disabled={isPending}
        >
          {isPending ? <Loader2Icon /> : "❌"}
        </Button>
      )}
    </div>
  );
}

export default SessionCard;
