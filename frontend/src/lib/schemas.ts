import z from "zod";

export const emailSchema = z.email();

export const loginFormSchema = z.object({
  email: emailSchema,
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(255, {
      message: "Password length cannot be more than 255 characters.",
    }),
});

export const registerFormSchema = z
  .object({
    email: emailSchema,
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(255, {
        message: "Password length cannot be more than 255 characters.",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." })
      .max(255, {
        message: "Confirm password length cannot be more than 255 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: emailSchema,
});

export const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(255, {
      message: "Password length cannot be more than 255 characters.",
    }),
});
