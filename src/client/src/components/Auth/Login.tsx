import './Auth.scss';
import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, InjectedFormProps } from 'redux-form';
import { loginUser } from '../../store';
import { Button } from '../../assets/components/Button';

interface LoginProps {
  loginUser: Function;
  handleSubmit: Function;
}

interface FormProps {
  email: string;
  password: string;
}

class _Login extends React.Component<
  LoginProps,
  InjectedFormProps<{}, LoginProps>
> {
  onFormSubmit = (formValues: FormProps) => {
    this.props.loginUser(formValues);
  };

  render(): JSX.Element {
    const { handleSubmit } = this.props;
    return (
      <form
        className='auth box'
        onSubmit={this.props.handleSubmit(this.onFormSubmit)}
      >
        <label>Email:</label>
        <input name='email' placeholder='Email' />
        <label>Password:</label>
        <input name='password' placeholder='Password' />
        <Button buttonType='primary'>Submit</Button>
      </form>
    );
  }
}

const __Login = reduxForm<{}, LoginProps>({ form: 'login' })(_Login);

export const Login = connect(null, { loginUser })(__Login);
