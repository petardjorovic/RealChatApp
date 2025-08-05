import ResetPasswordForm from "@/components/ResetPasswordForm";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";

function ResetPassword() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");
  const exp = searchParams.get("exp");
  const now = Date.now();
  const expNum = exp ? Number(exp) : NaN;
  const linkIsValid =
    typeof code === "string" &&
    code.trim().length > 0 &&
    Number.isFinite(expNum) &&
    expNum > now;

  return (
    <div className="flex min-h-screen justify-center">
      <div className="mx-auto max-w-md py-12 px-6 text-center">
        {linkIsValid ? (
          <ResetPasswordForm code={code} />
        ) : (
          <div className="text-center space-y-4">
            <Alert variant={"destructive"}>
              <AlertTitle className="flex items-center gap-x-2 justify-center">
                <AlertCircleIcon />
                Invalid Link
              </AlertTitle>
            </Alert>
            <p className="">The link is either invalid or expired.</p>
            <Link
              to={"/password/forgot"}
              replace={true}
              className="text-chart-1 hover:underline"
            >
              Request a new password reset link
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;
