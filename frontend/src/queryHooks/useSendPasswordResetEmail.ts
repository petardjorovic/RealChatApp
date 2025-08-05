import { sendPasswordResetEmail } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";

type ReturnType = {
  message: string;
};

export const useSendPasswordResetEmail = () => {
  const {
    isPending,
    mutate: sendPasswordReset,
    isError,
    isSuccess,
    error,
  } = useMutation<ReturnType, Error, { email: string }>({
    mutationFn: sendPasswordResetEmail,
  });

  return { isPending, sendPasswordReset, isError, error, isSuccess };
};
