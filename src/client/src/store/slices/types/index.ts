export interface UserProps {
  _id: string,
  fullName: {
    firstName: string;
    lastName: string;
  };
  role: string;
  friendRequests: {} | undefined;
  error?: string;
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