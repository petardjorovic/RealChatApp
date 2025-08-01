import jwt, { SignOptions, VerifyOptions } from "jsonwebtoken";
import { SessionDocument } from "../models/session.model.js";
import { UserDocument } from "../models/user.model.js";
import { JWT_REFRESH_SECRET, JWT_SECRET } from "../constants/env.js";

export type RefreshTokenPayload = {
  sessionId: SessionDocument["_id"];
};

export type AccessTokenPayload = {
  userId: UserDocument["_id"];
  sessionId: SessionDocument["_id"];
};

type SignOptionsAndSecret = SignOptions & {
  secret: string;
};

const signTokenDefaults: SignOptions = {
  audience: ["user"],
};

const accessTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "15m",
  secret: JWT_SECRET,
};

export const refreshTokenSignOptions: SignOptionsAndSecret = {
  expiresIn: "30d",
  secret: JWT_REFRESH_SECRET,
};

export const signToken = (
  payload: AccessTokenPayload | RefreshTokenPayload,
  options?: SignOptionsAndSecret
) => {
  const { secret, ...signOpts } = options || accessTokenSignOptions;
  return jwt.sign(payload, secret, { ...signTokenDefaults, ...signOpts });
};

const verifyDefaults: VerifyOptions = {
  audience: ["user"],
};

export const verifyToken = <TPayload extends object = AccessTokenPayload>(
  token: string,
  options?: VerifyOptions & { secret: string }
) => {
  const { secret = JWT_SECRET, ...verifyOpts } = options || {};
  try {
    const payload = jwt.verify(token, secret, {
      ...verifyDefaults,
      ...verifyOpts,
    }) as TPayload;
    return { payload };
  } catch (error: any) {
    return { message: error.message };
  }
};
