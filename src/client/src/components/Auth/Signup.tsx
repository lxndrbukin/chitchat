import './Auth.scss';
import React from 'react';
import { SignupFormProps, FormState, FormValues } from './types';
import { connect } from 'react-redux';
import { signupUser } from '../../store/thunks/signupUser';
import { Input } from '../../assets/components/Inputs';
import { Button } from '../../assets/components/Button';

class _Signup extends React.Component<SignupFormProps, FormState> {
  constructor(props: SignupFormProps) {
    super(props);
    this.state = {
      fieldValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
      },
      empty: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
      },
    };
  }

  onFormSubmit = (formValues: FormValues): void => {
    this.props.signupUser(formValues);
  };

  render(): JSX.Element {
    const { firstName, lastName, email, password } = this.state.fieldValues;
    return (
      <div className='auth-container'>
        <form
          method='POST'
          className='auth-form box'
          onSubmit={(e) => {
            e.preventDefault();
            this.onFormSubmit({
              firstName,
              lastName,
              email,
              password,
            });
          }}
        >
          <Input
            name='firstName'
            label='First Name:'
            placeholder='First Name'
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
          <Input
            name='lastName'
            label='Last Name:'
            placeholder='Last Name'
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
          <Input
            name='email'
            label='Email:'
            placeholder='Email'
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
          <Input
            name='password'
            label='Password:'
            placeholder='Password'
            empty={this.state ? this.state.empty : {}}
            message={'Error'}
          />
        </form>
      </div>
    );
  }
}

export const Signup = connect(null, { signupUser })(_Signup);
