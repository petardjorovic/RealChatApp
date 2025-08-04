import { register, type User } from "@/lib/api";
import type { RegisterFormValues } from "@/pages/Register";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useRegister = () => {
  const navigate = useNavigate();
  const {
    mutate: createAccount,
    isPending,
    isError,
    error,
  } = useMutation<User, Error, RegisterFormValues>({
    mutationFn: register,
    onSuccess: () => {
      navigate("/");
    },
  });

  return { createAccount, isPending, isError, error };
};
