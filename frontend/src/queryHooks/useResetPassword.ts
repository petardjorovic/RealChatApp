import { resetPassword } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type ReturnType = {
  message: string;
};

export const useResetPassword = () => {
  const {
    isPending,
    isSuccess,
    mutate: resetUserPassword,
    isError,
    error,
  } = useMutation<ReturnType, Error, { code: string; password: string }>({
    mutationFn: resetPassword,
  });

  return { isError, isPending, isSuccess, resetUserPassword, error };
};
