import z from "zod";

export const loginFormSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .max(100),
});

export const registerFormSchema = z
  .object({
    email: z.email(),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .max(100),
    confirmPassword: z
      .string()
      .min(6, { message: "Confirm password must be at least 6 characters." })
      .max(100),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });
