import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

export const useVerifyEmail = () => {
  const { code } = useParams();

  const isCodeValid = typeof code === "string" && code.trim().length > 0;

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code!), // siguran si da je string jer si proverio gore
    enabled: isCodeValid, // sprečava izvršavanje ako je `code` undefined
  });

  return { isLoading, isError, isSuccess, isCodeValid };
};
