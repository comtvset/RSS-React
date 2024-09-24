import React from 'react';
import style from '../input.module.scss';

interface CheckboxProps {
  content: string;
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ content, label, placeholder, name, error, rest, onChange }, ref) => (
    <div className={style.checkbox}>
      <label htmlFor={label}>
        {`${content} `}
        <span style={{ color: 'rgb(233, 86, 86)' }}>*</span>
      </label>
      <input
        type="checkbox"
        id={label}
        name={name}
        placeholder={placeholder}
        ref={ref}
        onChange={onChange}
        {...rest}
      />
      <span className={style.error}>{error}</span>
    </div>
  ),
);
