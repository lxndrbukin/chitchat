import { RequestAction } from '../../thunks/types';

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
  userId: string;
  firstName: string;
  lastName: string;
  requestAction: string;
}

export interface FriendRequests {
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

export interface FriendProps {
  userId: string;
  fullName: {
    firstName: string;
    lastName: string;
  };
}

export interface FriendsListState {
  loading: boolean;
  list: FriendProps[];
  error: string;
}