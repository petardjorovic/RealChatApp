import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { registerFormSchema } from "@/lib/schemas";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { Loader2Icon, AlertCircleIcon } from "lucide-react";
import { useRegister } from "@/queryHooks/useRegister";

export type RegisterFormValues = z.infer<typeof registerFormSchema>;

function Register() {
  const { createAccount, isError, isPending, error } = useRegister();
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    createAccount(values);
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-auto min-w-md py-12 px-6 text-center">
        <h1 className="text-4xl mb-8">Create an account</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 shadow-lg p-8 rounded-lg bg-secondary"
          >
            {isError && (
              <Alert variant="destructive" className="border-none py-0">
                <AlertCircleIcon />
                <AlertTitle>{error?.message || "An error occurred"}</AlertTitle>
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
                  <FormMessage className="text-left" />
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
                  <FormDescription className="text-left text-xs py-0 my-0">
                    * Must be at least 6 characters long.
                  </FormDescription>
                  <FormMessage className="text-left" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Confirm password"
                      required
                      {...field}
                      type="password"
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
                "Create Account"
              )}
            </Button>
            <div className="w-full text-center text-sm">
              <span className="">Already have an account?</span>{" "}
              <Link to={"/login"} className="text-chart-1 hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default Register;
