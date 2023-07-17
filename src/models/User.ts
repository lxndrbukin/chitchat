import mongoose, { Schema } from 'mongoose';
import { IUser } from './types';

const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: Object, firstName: String, lastName: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String
});

export default mongoose.model<IUser>('user', UserSchema);