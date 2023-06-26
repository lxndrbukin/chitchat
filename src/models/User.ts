import mongoose, { Schema, Document } from 'mongoose';

enum UserRoles {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

interface FullName {
  firstName: string;
  lastName: string;
}

export interface IUser extends Document {
  fullName: FullName;
  email: string;
  password: string;
  role: UserRoles;
}

const UserSchema: Schema = new Schema<IUser>({
  fullName: { type: Object, firstName: String, lastName: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String
});

export default mongoose.model<IUser>('user', UserSchema);