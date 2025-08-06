import { getSessions, type Session } from "@/lib/api";
import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

export const SESSIONS = "sessions";

export const useSession = (opts?: UseQueryOptions<Session[], Error>) => {
  const { data: sessions = [], ...rest } = useQuery<Session[], Error>({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });

  return { sessions, ...rest };
};
