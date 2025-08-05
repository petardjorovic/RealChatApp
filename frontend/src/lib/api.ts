import API from "@/config/apiClient";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type User = {
  email: string;
  verified: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export const login = async (
  data: LoginParams
): Promise<{
  message: string;
}> => API.post("/auth/login", data);

export const register = async (data: RegisterParams): Promise<User> =>
  API.post("/auth/register", data);

export const verifyEmail = async (code: string): Promise<{ message: string }> =>
  API.get(`/auth/email/verify/${code}`);

export const sendPasswordResetEmail = async (data: {
  email: string;
}): Promise<{ message: string }> => API.post("/auth/password/forgot", data);

export const resetPassword = async (data: {
  password: string;
  code: string;
}): Promise<{ message: string }> =>
  API.post("/auth/password/reset", {
    verificationCode: data.code,
    password: data.password,
  });

export const getUser = async () => API.get("/user");
