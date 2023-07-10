import './Auth.scss';
import React from 'react';
import { SignupFormProps, FormState, FormValues, InputProps } from './types';
import { connect } from 'react-redux';
import { signupUser } from '../../store/thunks/signupUser';
import { Input } from '../../assets/components/Inputs';
import { Button } from '../../assets/components/Button';

const inputs: InputProps[] = [
  { name: 'firstName', label: 'First Name:', placeholder: 'First Name' },
  { name: 'lastName', label: 'Last Name:', placeholder: 'Last Name' },
  { name: 'email', label: 'Email:', placeholder: 'Email' },
  { name: 'password', label: 'Password:', placeholder: 'Password' },
];

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
    this.props.signupUser(formValues);
  };

  renderInputs(): JSX.Element[] {
    return inputs.map((input: InputProps) => {
      return (
        <Input
          key={input.name}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
          name={input.name}
          label={input.label}
          placeholder={input.placeholder}
          empty={this.state ? this.state.empty : {}}
          message={'Error'}
        />
      );
    });
  }

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
          {this.renderInputs()}
          <Button buttonType={'primary'}>Submit</Button>
        </form>
      </div>
    );
  }
}

export const Signup = connect(null, { signupUser })(_Signup);
