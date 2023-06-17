import mongoose, { Schema, Document } from 'mongoose';

export interface IFriendReq extends Document {
  userId: string,
  sent: string[];
  received: string[];
}

const FriendReqSchema: Schema = new Schema<IFriendReq>({
  userId: { type: String, required: true },
  sent: Array<String>,
  received: Array<String>
});

export default mongoose.model<IFriendReq>('friendReq', FriendReqSchema);