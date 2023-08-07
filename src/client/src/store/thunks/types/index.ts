export enum RequestAction {
  Accept = 'Accept',
  Decline = 'Decline',
  Send = 'Send'
}

export interface AuthFormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface FriendRequest {
  userId: string;
  firstName?: string;
  lastName?: string;
  requestAction: RequestAction;
}