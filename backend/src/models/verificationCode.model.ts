import mongoose from "mongoose";
import VerificationCodeTypes from "../constants/verificationCodeTypes.js";

export interface VerificationCodeDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId; // typescript typing for this ObjectId
  type: VerificationCodeTypes;
  expiresAt: Date;
  createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // schema typing for this ObjectId
    ref: "User",
    required: true,
    index: true,
  },
  type: { type: String, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const VerificationCodeModel = mongoose.model<
  VerificationCodeDocument,
  mongoose.Model<VerificationCodeDocument>
>("VerificationCode", verificationCodeSchema, "verification_codes");

export default VerificationCodeModel;
