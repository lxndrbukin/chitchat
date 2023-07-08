import './Auth.scss';
import React from 'react';
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
    [key: string]: string | null;
  };
  emptyFields: {
    [key: string]: boolean | null;
  };
}

class _Login extends React.Component<LoginFormProps, LoginFormState> {
  constructor(props: LoginFormProps) {
    super(props);
  }

  handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { fieldValues } = this.state;
    fieldValues[e.target.name] = e.target.value;
    this.setState({ fieldValues });
  };

  handleOnBlur = (e: React.FocusEvent<HTMLInputElement, Element>): void => {
    const { emptyFields } = this.state;
    if (e.target.value === '') {
      emptyFields[e.target.name] = true;
      this.setState({ emptyFields });
      return;
    }
    emptyFields[e.target.name] = null;
    this.setState({ emptyFields });
  };

  onFormSubmit = (formValues: FormProps): void => {
    this.props.loginUser(formValues);
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
            emptyFields={this.state ? this.state.emptyFields : {}}
            showErrorMessage={() => console.log('Error')}
          />
          <Input
            name='password'
            label='Password:'
            placeholder='Password'
            onChange={this.handleOnChange}
            onBlur={this.handleOnBlur}
            emptyFields={this.state ? this.state.emptyFields : {}}
            showErrorMessage={() => console.log('Error')}
          />
          <Button buttonType='primary'>Submit</Button>
        </form>
      </div>
    );
  }
}

export const Login = connect(null, { loginUser })(_Login);
