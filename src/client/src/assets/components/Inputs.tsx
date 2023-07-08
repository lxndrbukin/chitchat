import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value?: string;
  emptyFields: {
    [key: string]: boolean | null;
  };
  disabled?: boolean;
  transparent?: boolean;
  type?: string;
  showErrorMessage: Function;
}

export class Input extends React.Component<InputProps> {
  render(): JSX.Element {
    const { ...rest } = this.props;
    return (
      <div className='form-input'>
        <label>{this.props.label}</label>
        <div
          className={`input-container ${
            this.props.emptyFields && this.props.emptyFields[this.props.name]
              ? 'error'
              : ''
          } ${this.props.disabled ? 'disabled' : ''}${
            this.props.transparent ? 'transparent' : ''
          }`}
        >
          <input
            {...rest}
            type={this.props.type}
            name={this.props.name}
            value={this.props.value}
          />
        </div>
        {this.props.showErrorMessage()}
      </div>
    );
  }
}
