import { verifyEmail } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { Loader2, AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

function VerifyEmail() {
  const { code } = useParams();

  const isCodeValid = typeof code === "string" && code.trim().length > 0;

  const { isLoading, isError, isSuccess } = useQuery({
    queryKey: ["emailVerification", code],
    queryFn: () => verifyEmail(code!), // siguran si da je string jer si proverio gore
    enabled: isCodeValid, // sprečava izvršavanje ako je `code` undefined
  });

  if (!isCodeValid) {
    return <div>Invalid or missing verification code.</div>;
  }

  return (
    <div className="flex min-h-screen justify-center mt-12">
      <div className="mx-auto max-w-md py-12 text-center">
        {!isCodeValid && (
          <Alert variant={"destructive"} className="mb-4">
            <AlertTitle className="flex items-center gap-x-2 justify-center">
              <AlertCircleIcon className="h-4 w-4" /> Invalid code
            </AlertTitle>

            <AlertDescription>
              The verification code is missing or invalid.
            </AlertDescription>
          </Alert>
        )}
        {isLoading && (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        )}
        {isError && (
          <Alert variant={"destructive"} className="mb-4">
            <AlertTitle className="flex items-center gap-x-2 justify-center">
              <AlertCircleIcon className="h-4 w-4" /> Verification failed
            </AlertTitle>

            <AlertDescription>
              The link is either invalid or expired.{" "}
              <div className="mt-4 w-full">
                <Link to="/forgot/password" className="mx-auto">
                  <Button variant="link" className="text-chart-1 p-0 h-auto">
                    Request a new link
                  </Button>
                </Link>
              </div>
            </AlertDescription>
          </Alert>
        )}
        {isSuccess && (
          <Alert className="mb-4">
            <AlertTitle className="flex items-center gap-x-2 justify-center text-chart-2">
              <CheckCircle2Icon className="h-4 w-4" /> Email verified!
            </AlertTitle>
          </Alert>
        )}
        <Link to={"/"} className="text-chart-1">
          Back to home
        </Link>
      </div>
    </div>
  );
}

export default VerifyEmail;
