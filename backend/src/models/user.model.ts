import { Schema, model, Document,Types } from "mongoose";

export interface IUser extends Document {
  _id: Types.ObjectId;
  email: string;
  name?: string;
  googleId?: string;
  createdAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  name: { type: String },
  googleId: { type: String }
}, { timestamps: true });

export default model<IUser>("User", UserSchema);
