import mongoose, { Schema, Document } from 'mongoose';

enum UserRoles {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

export interface IUser extends Document {
  email: string,
  password: string;
  role: string;
}

const UserSchema: Schema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String
});

export default mongoose.model<IUser>('user', UserSchema);