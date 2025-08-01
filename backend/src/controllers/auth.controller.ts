import z from "zod";
import catchErrors from "../utils/catchErrors.js";
import { createAccount, loginUser } from "../services/auth.service.js";
import { CREATED, OK } from "../constants/http.js";
import { clearAuthCookies, setAuthCookies } from "../utils/cookies.js";
import { loginSchema, registerSchema } from "./auth.schemas.js";
import { verifyToken } from "../utils/jwt.js";
import SessionModel from "../models/session.model.js";

export const registerHandler = catchErrors(async (req, res) => {
  // validate request
  const request = registerSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { user, accessToken, refreshToken } = await createAccount(request);

  // return response
  return setAuthCookies({ res, accessToken, refreshToken })
    .status(CREATED)
    .json(user);
});

export const loginHandler = catchErrors(async (req, res) => {
  // validate request
  const request = loginSchema.parse({
    ...req.body,
    userAgent: req.headers["user-agent"],
  });

  // call service
  const { accessToken, refreshToken } = await loginUser(request);

  //return response
  return setAuthCookies({ res, accessToken, refreshToken }).status(OK).json({
    message: "Login successfull",
  });
});

export const logoutHandler = catchErrors(async (req, res) => {
  const accessToken = req.cookies.accessToken;
  const { payload } = verifyToken(accessToken); // moze i ovde kroz generic da se postavi AccessTokenPaylod ili RefeshTokenPayload

  if (payload) {
    await SessionModel.findByIdAndDelete(payload.sessionId);
  }

  return clearAuthCookies(res).status(OK).json({
    message: "Logout successfull",
  });
});
