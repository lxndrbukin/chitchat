export interface FormValues {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

export interface FormState {
  fieldValues: {
    [key: string]: string;
  };
  empty: {
    [key: string]: boolean;
  };
}

export interface SignupFormProps {
  signupUser: Function;
}

export interface LoginFormProps {
  loginUser: Function;
}