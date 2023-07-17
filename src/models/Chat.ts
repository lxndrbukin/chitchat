import mongoose, { Schema } from 'mongoose';
import { IMessage, IChat } from './types';

const ChatSchema: Schema = new Schema<IChat>({
  members: Array<String>,
  messages: Array<IMessage>
});

export default mongoose.model<IChat>('chat', ChatSchema);