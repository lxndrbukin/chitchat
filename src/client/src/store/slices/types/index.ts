export interface UserProps {
  _id: string,
  fullName: {
    firstName: string;
    lastName: string;
  };
  role: string;
  error: string;
}

export interface ErrorMessage {
  message: string;
}

export interface UserState {
  loading: boolean;
  loggedIn?: boolean;
  userData: UserProps | undefined;
  error: string;
}

export interface FriendRequestsPayload {
  sent: FriendRequestProps[],
  received: FriendRequestProps[];
}

export interface FriendRequestProps {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

export interface FriendRequestsState {
  loading: boolean;
  requests: {
    sent: FriendRequestProps[];
    received: FriendRequestProps[];
  };
  error: string;
}