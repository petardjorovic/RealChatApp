import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { loginFormSchema } from "@/lib/schemas";
import { useLogin } from "@/queryHooks/useLogin";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2Icon, AlertCircleIcon } from "lucide-react";

export type LoginFormValues = z.infer<typeof loginFormSchema>;

function Login() {
  const { isError, isPending, signIn } = useLogin();
  const form = useForm({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormValues) {
    signIn(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto min-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8">Sign into your account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 shadow-lg p-8 rounded-lg bg-secondary"
          >
            {isError && (
              <Alert
                variant="destructive"
                className="border-none py-0 bg-secondary"
              >
                <AlertCircleIcon />
                <AlertTitle>Invalid email or password</AlertTitle>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} autoFocus required />
                  </FormControl>
                  {/* <FormDescription>This is your public email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Password"
                      required
                      {...field}
                      type="password"
                    />
                  </FormControl>
                  {/* <FormDescription>This is your password</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="w-full text-center sm:text-right">
              <Link
                to={"/password/forgot"}
                className="text-sm text-chart-1 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
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
                "Sign in"
              )}
            </Button>
            <div className="w-full text-center text-sm">
              <span className="">Don't have an account?</span>{" "}
              <Link to={"/register"} className="text-chart-1 hover:underline">
                Sign up
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Login;
