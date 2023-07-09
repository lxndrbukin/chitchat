import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: string;
  value?: string;
  empty: {
    [key: string]: boolean;
  };
  disabled?: boolean;
  transparent?: boolean;
  type?: string;
  message: string;
}

export class Input extends React.Component<InputProps> {
  showErrorMessage = (): JSX.Element | null => {
    if (this.props.empty && this.props.empty[this.props.name]) {
      return <div className='error-msg'>{this.props.message}</div>;
    }
    return null;
  };

  render(): JSX.Element {
    const { ...rest } = this.props;
    return (
      <div className='form-input'>
        <label>{this.props.label}</label>
        <div
          className={`input-container ${
            this.props.empty && this.props.empty[this.props.name] ? 'error' : ''
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
        {this.showErrorMessage()}
      </div>
    );
  }
}
