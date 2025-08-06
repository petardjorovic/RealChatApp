import { login } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";

type LoginReturnType = {
  message: string;
};

type LoginState = {
  redirectUrl?: string;
};

export const useLogin = () => {
  const navigate = useNavigate();
  const location = useLocation() as { state: LoginState };
  const redirectUrl = location.state?.redirectUrl || "/";
  const {
    mutate: signIn,
    isPending,
    isError,
  } = useMutation<LoginReturnType, Error, { email: string; password: string }>({
    mutationFn: login,
    onSuccess: () => {
      navigate(redirectUrl, { replace: true });
    },
  });

  return { signIn, isPending, isError };
};
