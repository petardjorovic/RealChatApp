import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ForgotPasswordSchema } from "@/lib/schemas";
import { useSendPasswordResetEmail } from "@/queryHooks/useSendPasswordResetEmail";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type z from "zod";

type ForgotPasswordFormValues = z.infer<typeof ForgotPasswordSchema>;

function ForgotPassword() {
  const { isError, error, isPending, isSuccess, sendPasswordReset } =
    useSendPasswordResetEmail();
  const form = useForm({
    resolver: zodResolver(ForgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: ForgotPasswordFormValues) {
    sendPasswordReset(values);
  }
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto min-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8">Reset your password</h1>
        <div className="shadow-lg p-8 rounded-lg bg-secondary">
          <Form {...form}>
            {isSuccess ? (
              <Alert className="mb-4">
                <AlertTitle className="flex items-center gap-x-2 justify-center text-chart-2">
                  <CheckCircle2Icon className="h-4 w-4" /> Email sent! Check
                  your inbox for further instructions.
                </AlertTitle>
              </Alert>
            ) : (
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5 "
              >
                {isError && (
                  <Alert
                    variant="destructive"
                    className="border-none py-0 bg-secondary"
                  >
                    <AlertTitle className="flex items-center gap-x-2 justify-center">
                      <AlertCircleIcon />
                      {error?.message || "An error occurred"}
                    </AlertTitle>
                  </Alert>
                )}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          {...field}
                          autoFocus
                          required
                        />
                      </FormControl>
                      <FormMessage className="text-left" />
                    </FormItem>
                  )}
                />
                <Button
                  variant={"custom"}
                  type="submit"
                  className="w-full cursor-pointer"
                  disabled={isPending}
                >
                  {isPending ? (
                    <>
                      <Loader2Icon className="mr-2 h-4 w-4 animate-spin" />
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            )}
            <FormDescription className="text-center text-sm mt-4">
              Go back to&nbsp;
              <Link
                to={"/login"}
                replace={true}
                className="text-chart-1 hover:underline"
              >
                Sign in
              </Link>{" "}
              &nbsp;or&nbsp;{" "}
              <Link
                to={"/register"}
                replace={true}
                className="text-chart-1 hover:underline"
              >
                Sign up
              </Link>
            </FormDescription>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
