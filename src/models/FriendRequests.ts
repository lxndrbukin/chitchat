import mongoose, { Schema, Document } from 'mongoose';

interface RequestProps {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

export interface IFriendReq extends Document {
  userId: string,
  sent: RequestProps[];
  received: RequestProps[];
}

const FriendReqSchema: Schema = new Schema<IFriendReq>({
  userId: { type: String, required: true },
  sent: Array<RequestProps>,
  received: Array<RequestProps>
});

export default mongoose.model<IFriendReq>('friendReq', FriendReqSchema);