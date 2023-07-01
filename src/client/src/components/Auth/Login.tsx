import './Auth.scss';
import React from 'react';
import { connect } from 'react-redux';
import { loginUser } from '../../store';
import { Button } from '../../assets/components/Button';

interface FormProps {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginUser: Function;
}

interface LoginFormState {
  email: string | null;
  password: string | null;
}

class _Login extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);

    this.state = {
      email: null,
      password: null,
    };
  }

  onFormSubmit = (formValues: FormProps) => {
    this.props.loginUser(formValues);
  };

  render(): JSX.Element {
    return (
      <form
        className='auth box'
        onSubmit={(e) => {
          e.preventDefault();
          console.log(this.state);
          this.onFormSubmit({
            email: this.state.email as string,
            password: this.state.password as string,
          });
        }}
      >
        <label>Email:</label>
        <input
          onChange={(e) => this.setState({ email: e.target.value })}
          name='email'
          placeholder='Email'
        />
        <label>Password:</label>
        <input
          onChange={(e) => this.setState({ password: e.target.value })}
          name='password'
          placeholder='Password'
        />
        <Button buttonType='primary'>Submit</Button>
      </form>
    );
  }
}

export const Login = connect(null, { loginUser })(_Login);
