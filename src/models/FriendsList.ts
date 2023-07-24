import mongoose, { Schema } from 'mongoose';
import { IFriendsList, FriendProps } from './types';

const friendsListSchema: Schema = new Schema<IFriendsList>({
  userId: { type: String, required: true },
  friendsList: Array<FriendProps>
});

export default mongoose.model('friends', friendsListSchema);