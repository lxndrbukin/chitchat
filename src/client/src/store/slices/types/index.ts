export interface UserProps {
  _id: string,
  fullName: {
    firstName: string;
    lastName: string;
  };
  role: string;
  error: string;
}

export interface SessionProps extends UserProps {
  friendRequests: {};
}

export interface ErrorMessage {
  message: string;
}

export interface UserState {
  loading: boolean;
  loggedIn?: boolean;
  userData: UserProps | SessionProps | undefined;
  error: string;
}