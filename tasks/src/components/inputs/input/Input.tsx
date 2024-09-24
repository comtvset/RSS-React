import React, { useState } from 'react';
import style from '../input.module.scss';

type InputType = 'text' | 'number' | 'email' | 'password' | 'file';

interface InputProps {
  content: string;
  type: InputType;
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ content, type, label, placeholder, name, error, rest, onChange }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div className={style.container}>
        <label htmlFor={label}>
          {`${content} `}
          <span style={{ color: 'rgb(233, 86, 86)' }}>*</span>
        </label>
        <input
          className={style.customInput}
          type={type === 'password' && isPasswordVisible ? 'text' : type}
          id={label}
          name={name}
          placeholder={placeholder}
          ref={ref}
          onChange={onChange}
          {...rest}
        />
        <span className={style.error}>{error}</span>

        {type === 'password' && (
          <div className={style.showPassword}>
            <input type="checkbox" id={`toggle-${label}`} onChange={togglePasswordVisibility} />
            <label htmlFor={`toggle-${label}`}>Show password</label>
          </div>
        )}
      </div>
    );
  },
);
