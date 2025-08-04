import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

type LoginReturnType = {
  message: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation<LoginReturnType, Error, { email: string; password: string }>({
    mutationFn: login,
    onSuccess: () => {
      navigate("/", { replace: true });
    },
  });

  return { signIn, isPending, isError };
};
