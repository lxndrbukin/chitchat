// CHAT MODEL INTERFACES
export interface IMessage {
  messageId: number,
  messageText: string,
  senderId: string,
  timestamp: Date;
}

export interface IChat extends Document {
  members: string[],
  messages: IMessage[];
}

// FRIEND REQUESTS MODEL INTERFACES
export interface RequestProps {
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

// USER MODEL INTERFACES
export enum UserRoles {
  Admin = 'Admin',
  Moderator = 'Moderator',
  User = 'User'
}

export interface FullName {
  firstName: string;
  lastName: string;
}

export interface IUser extends Document {
  fullName: FullName;
  email: string;
  password: string;
  role: UserRoles;
}

// FRIENDS MODEL INTERFACES
export interface FriendProps {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

export interface IFriends extends Document {
  userId: string;
  friendsList: FriendProps[];
}