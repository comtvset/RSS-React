import React from 'react';
import style from '../input.module.scss';

type InputType = 'text' | 'number' | 'email' | 'password' | 'file';

interface InputProps {
  content: string;
  type: InputType;
  label: string;
  placeholder: string;
  name: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ content, type, label, placeholder, name, error }, ref) =>
    type !== 'password' ? (
      <div className={style.container}>
        <label htmlFor={label}>{content}</label>
        <input
          className={style.customInput}
          type={type}
          id={label}
          name={name}
          placeholder={placeholder}
          ref={ref}
        />
        <span className={style.error}>{error}</span>
      </div>
    ) : (
      <div className={style.container}>
        <label htmlFor={label}>{content}</label>
        <input
          className={style.customInput}
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
        />
        <span className={style.error}>{error}</span>
        <label htmlFor={label}></label>
        <progress id={label} max="100" value="40"></progress>
      </div>
    ),
);
