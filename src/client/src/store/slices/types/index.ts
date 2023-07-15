export interface UserProps {
  _id: string,
  fullName: {
    firstName: string;
    lastName: string;
  };
  role: string;
}

export interface ErrorMessage {
  message: string;
}

export interface UserState {
  loading: boolean;
  loggedIn?: boolean;
  userData: UserProps | {};
  error?: string | undefined;
}