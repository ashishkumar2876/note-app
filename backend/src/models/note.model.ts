import { Schema, model, Document, Types } from "mongoose";

export interface INote extends Document {
  user: Types.ObjectId;
  title: string;
  content?: string;
  createdAt: Date;
}

const NoteSchema = new Schema<INote>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  content: { type: String }
}, { timestamps: true });

export default model<INote>("Note", NoteSchema);
