import mongoose, { Schema } from 'mongoose';
import { IFriendReq, RequestProps } from './types';

const FriendReqSchema: Schema = new Schema<IFriendReq>({
  userId: { type: String, required: true },
  sent: Array<RequestProps>,
  received: Array<RequestProps>
});

export default mongoose.model<IFriendReq>('friendReq', FriendReqSchema);