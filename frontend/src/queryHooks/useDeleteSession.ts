import { deleteSession, type Session } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SESSIONS } from "./useSession";

export const useDeleteSession = (sessionId: string) => {
  const queryClient = useQueryClient();

  const { mutate, ...rest } = useMutation({
    mutationFn: () => deleteSession(sessionId),
    onSuccess: () => {
      //* sigurnije je se odmah nakon delete uradi refetch
      //   queryClient.invalidateQueries({ queryKey: [SESSIONS] });

      //* optimistic resenje odmah ga brise iz client cache
      queryClient.setQueryData<Session[]>([SESSIONS], (cache) =>
        cache?.filter((session) => session._id !== sessionId)
      );
    },
  });

  return { deleteSession: mutate, ...rest };
};
