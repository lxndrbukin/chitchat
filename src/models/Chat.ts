import mongoose, { Schema, Document } from 'mongoose';

interface IMessage {
  messageId: number,
  messageText: string,
  senderId: string,
  timestamp: Date;
}

export interface IChat extends Document {
  members: string[],
  messages: IMessage[];
}

const ChatSchema: Schema = new Schema<IChat>({
  members: Array<String>,
  messages: Array<IMessage>
});

export default mongoose.model<IChat>('chat', ChatSchema);