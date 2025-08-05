import { Link } from "react-router-dom";
import { Loader2, AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useVerifyEmail } from "@/queryHooks/useVerifyEmail";

function VerifyEmail() {
  const { isCodeValid, isError, isLoading, isSuccess } = useVerifyEmail();

  return (
    <div className="flex min-h-screen justify-center mt-12">
      <div className="mx-auto max-w-md py-12 text-center">
        {!isCodeValid && (
          <>
            <Alert variant={"destructive"} className="mb-4">
              <AlertTitle className="flex items-center gap-x-2 justify-center">
                <AlertCircleIcon className="h-4 w-4" /> Invalid code
              </AlertTitle>
            </Alert>
            <p>
              The verification code is missing or invalid.{" "}
              <Link to="/forgot/password" className="mx-auto">
                <Button variant="link" className="text-chart-1 p-0 h-auto">
                  Get a new link
                </Button>
              </Link>
            </p>
          </>
        )}
        {isLoading && (
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        )}
        {isError && (
          <>
            <Alert variant={"destructive"} className="mb-4">
              <AlertTitle className="flex items-center gap-x-2 justify-center">
                <AlertCircleIcon className="h-4 w-4" /> Verification failed
              </AlertTitle>
            </Alert>
            <p className="mb-4">
              The link is either invalid or expired.{" "}
              <Link to="/forgot/password" className="mx-auto">
                <Button variant="link" className="text-chart-1 p-0 h-auto">
                  Get a new link
                </Button>
              </Link>
            </p>
          </>
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
