import './Auth.scss';
import React from 'react';
import { LoginFormProps, FormState, FormValues } from './types';
import { redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store';
import { Input } from '../../assets/components/Inputs';
import { Button } from '../../assets/components/Button';

class _Login extends React.Component<LoginFormProps, FormState> {
  constructor(props: LoginFormProps) {
    super(props);
    this.state = {
      fieldValues: {
        email: '',
        password: '',
      },
      empty: {
        email: false,
        password: false,
      },
    };
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { fieldValues } = this.state;
    fieldValues[e.target.name] = e.target.value;
    this.setState({ fieldValues });
  };

  handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    const { empty } = this.state;
    if (e.target.value === '') {
      empty[e.target.name] = true;
      this.setState({ empty });
      return;
    }
    empty[e.target.name] = false;
    this.setState({ empty });
  };

  onFormSubmit = (formValues: FormValues): void => {
    this.props.loginUser(formValues);
  };

  render(): JSX.Element {
    const { email, password } = this.state.fieldValues;
    return (
      <div className='auth-container'>
        <form
          method='POST'
          className='auth-form box'
          onSubmit={(e) => {
            e.preventDefault();
            this.onFormSubmit({
              email,
              password,
            });
          }}
        >
          <Input
            name='email'
            label='Email:'
            placeholder='Email'
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
          <Input
            name='password'
            label='Password:'
            placeholder='Password'
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
          <Button buttonType='primary'>Submit</Button>
        </form>
      </div>
    );
  }
}

export const Login = connect(null, { loginUser })(_Login);
