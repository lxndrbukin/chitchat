import './Auth.scss';
import React from 'react';
import { redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../store';
import { Input } from '../../assets/components/Inputs';
import { Button } from '../../assets/components/Button';

interface FormProps {
  email: string;
  password: string;
}

interface LoginFormProps {
  loginUser: Function;
}

interface LoginFormState {
  fieldValues: {
    [key: string]: string;
  };
  empty: {
    [key: string]: boolean;
  };
}

class _Login extends React.Component<LoginFormProps, LoginFormState> {
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

  onFormSubmit = (formValues: FormProps): Response => {
    this.props.loginUser(formValues);
    return redirect('/');
  };

  render(): JSX.Element {
    return (
      <div className='auth-container'>
        <form
          method='POST'
          className='auth-form box'
          onSubmit={(e) => {
            e.preventDefault();
            console.log(this.state);
            this.onFormSubmit({
              email: this.state.fieldValues.email as string,
              password: this.state.fieldValues.password as string,
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
