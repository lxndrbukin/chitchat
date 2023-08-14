export enum RequestAction {
  Accept = 'Accept',
  Decline = 'Decline',
  Send = 'Send',
  Cancel = 'Cancel'
}

export interface AuthFormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface FriendProps {
  userId: string;
  firstName: string;
  lastName: string;
  requestAction: string;
};

export interface FriendRequestProps extends FriendProps {
  requestAction: RequestAction;
}