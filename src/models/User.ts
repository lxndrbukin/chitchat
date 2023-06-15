import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string,
  password: string;
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

export default mongoose.model<IUser>('user', UserSchema);