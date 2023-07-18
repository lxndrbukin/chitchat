import mongoose, { Schema } from 'mongoose';
import { IFriends, FriendProps } from './types';

const friendsSchema: Schema = new Schema<IFriends>({
  userId: { type: String, required: true },
  friendsList: Array<FriendProps>
});

export default mongoose.model('friends', friendsSchema);