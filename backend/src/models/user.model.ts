import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { compareValue, hashValue } from "../utils/brcypt.js";

export interface UserDocument extends mongoose.Document {
  email: string;
  password: string;
  verified: boolean;
  createAt: Date;
  updateAt: Date;
  comparePassword: (val: string) => Promise<boolean>;
}

const UserSchema = new mongoose.Schema<UserDocument>(
  {
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    verified: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await hashValue(this.password);
  next();
});

UserSchema.methods.comparePassword = async function (val: string) {
  return compareValue(val, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", UserSchema);
export default UserModel;
