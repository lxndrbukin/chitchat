import React from 'react';

interface ButtonTypes {
  primary: string;
  secondary: string;
  danger: string;
  success: string;
  light: string;
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  buttonType: keyof ButtonTypes;
}

export class Button extends React.Component<ButtonProps> {
  get buttonTypes(): ButtonTypes {
    return {
      primary:
        'text-white bg-zinc-700 border border-zinc-700 rounded-lg px-3 py-1',
      secondary:
        'text-white bg-gray-400 border border-gray-400 rounded-lg px-3 py-1',
      danger:
        'text-white bg-red-500 border border-red-500 rounded-lg px-3 py-1',
      success:
        'text-white bg-lime-500 border border-lime-500 rounded-lg px-3 py-1',
      light: 'bg-white border border-white rounded-lg px-3 py-1',
    };
  }

  render(): JSX.Element {
    const { buttonType, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={`custom-button ${this.buttonTypes[this.props.buttonType]} ${
          this.props.className
        } mx-0.5 flex flex-row`}
      >
        {this.props.children}
      </button>
    );
  }
}
