import React from 'react';
import { connect } from 'react-redux';
import { FormState, EditFormProps, InputProps } from './types';
import { Input } from '../../assets/components/Inputs';

const inputs: InputProps[] = [
  { name: 'firstName', label: 'First Name:', placeholder: 'First Name' },
  { name: 'lastName', label: 'Last Name:', placeholder: 'Last Name' },
  { name: 'email', label: 'Email:', placeholder: 'Email' },
];

class _ProfileEdit extends React.Component<EditFormProps, FormState> {
  constructor(props: EditFormProps) {
    super(props);
    this.state = {
      fieldValues: {
        firstName: '',
        lastName: '',
        email: '',
      },
      empty: {
        firstName: false,
        lastName: false,
        email: false,
      },
    };
  }

  renderInputs(): JSX.Element[] {
    return inputs.map((input: InputProps): JSX.Element => {
      return (
        <Input
          key={input.name}
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
    return (
      <div className='profile-edit box'>
        <form className='profile-edit-form'>{this.renderInputs()}</form>
      </div>
    );
  }
}

export const ProfileEdit = connect(null)(_ProfileEdit);
