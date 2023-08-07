export enum RequestAction {
  accept = 'accept',
  decline = 'decline',
  send = 'send'
}

export interface AuthFormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface FriendRequest {
  userId: string;
  firstName: string;
  lastName: string;
  requestAction: RequestAction;
}