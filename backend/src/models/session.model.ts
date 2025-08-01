import mongoose from "mongoose";
import { thirtyDaysFromNow } from "../utils/date.js";

export interface SessionDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  userAgent?: string;
  createdAt: Date;
  expiresAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userAgent: { type: String },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, default: thirtyDaysFromNow },
});

const SessionModel = mongoose.model<
  SessionDocument,
  mongoose.Model<SessionDocument>
>("Session", sessionSchema);

export default SessionModel;
