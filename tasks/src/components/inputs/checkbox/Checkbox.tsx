import React from 'react';
import style from '../input.module.scss';

interface CheckboxProps {
  content: string;
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  otherProps?: React.InputHTMLAttributes<HTMLInputElement>;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ content, label, placeholder, name, error, otherProps }, ref) => (
    <div className={style.checkbox}>
      <label htmlFor={label}>{content}</label>
      <input
        type="checkbox"
        id={label}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...otherProps}
      />
      <span className={style.error}>{error}</span>
    </div>
  ),
);
