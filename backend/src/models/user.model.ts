import mongoose from "mongoose";
import { compareValue, hashValue } from "../utils/brcypt.js";

export interface UserDocument
  extends mongoose.Document<mongoose.Types.ObjectId> {
  _id: mongoose.Types.ObjectId;
  email: string;
  password: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword: (val: string) => Promise<boolean>;
  omitPassword: () => Pick<
    UserDocument,
    "_id" | "email" | "verified" | "createdAt" | "updatedAt"
  >;
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

UserSchema.methods.omitPassword = function () {
  const user = this.toObject(); // samo object bez metoda
  delete user.password;
  return user;
};

const UserModel = mongoose.model<UserDocument, mongoose.Model<UserDocument>>(
  "User",
  UserSchema
);
export default UserModel;
