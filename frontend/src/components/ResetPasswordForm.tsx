import { resetPasswordSchema } from "@/lib/schemas";
import { useResetPassword } from "@/queryHooks/useResetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AlertCircleIcon, CheckCircle2Icon, Loader2Icon } from "lucide-react";
import { Alert, AlertTitle } from "./ui/alert";
import { Link } from "react-router-dom";

function ResetPasswordForm({ code }: { code: string | null }) {
  const { isError, isPending, isSuccess, error, resetUserPassword } =
    useResetPassword();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  function onSubmit(values: { password: string }) {
    if (code) {
      resetUserPassword({ code, password: values.password });
    }
  }

  return (
    <>
      <h1 className="text-4xl mb-8">Change your password</h1>
      <div className="shadow-lg p-8 rounded-lg bg-secondary">
        <Form {...form}>
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
          {isSuccess ? (
            <>
              <Alert className="mb-4">
                <AlertTitle className="flex items-center gap-x-2 justify-center text-chart-2">
                  <CheckCircle2Icon className="h-4 w-4" /> Password updated
                  successfully!
                </AlertTitle>
              </Alert>
              <Link
                to={"/login"}
                replace
                className="text-chart-1 hover:underline"
              >
                Sign in
              </Link>
            </>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        required
                        {...field}
                        type="password"
                      />
                    </FormControl>
                    <FormDescription className="text-left text-xs py-0 my-0">
                      * Must be at least 6 characters long.
                    </FormDescription>
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
                  "Change Password"
                )}
              </Button>
            </form>
          )}
        </Form>
      </div>
    </>
  );
}

export default ResetPasswordForm;
