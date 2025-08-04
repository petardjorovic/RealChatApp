import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      //   staleTime: 0
    },
  },
});

export default queryClient;
