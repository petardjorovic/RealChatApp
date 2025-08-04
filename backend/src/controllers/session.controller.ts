import { NOT_FOUND, OK } from "../constants/http.js";
import SessionModel from "../models/session.model.js";
import catchErrors from "../utils/catchErrors.js";
import appAssert from "../utils/appAssert.js";
import { sessionIdSchema } from "./auth.schemas.js";

export const getSessionsHandler = catchErrors(async (req, res) => {
  const sessions = await SessionModel.find(
    {
      userId: req.userId,
      expiresAt: { $gt: new Date() },
    },
    {
      id: 1,
      userAgent: 1,
      createdAt: 1,
    },
    {
      sort: { createdAt: -1 },
    }
  );

  return res.status(OK).json(
    // mark the current session
    sessions.map((session) => ({
      ...session.toObject(),
      ...(session._id.toString() === req.sessionId.toString() && {
        isCurrent: true,
      }),
    }))
  );
});

export const deleteSessionHandler = catchErrors(async (req, res) => {
  const sessionId = sessionIdSchema.parse(req.params.id);
  const deleted = await SessionModel.findOneAndDelete({
    _id: sessionId,
    userId: req.userId,
  });
  appAssert(deleted, NOT_FOUND, "Session not found");

  return res.status(OK).json({
    message: "Session removed",
  });
});
