import React from 'react';
import style from '../input.module.scss';

interface CheckboxProps {
  content: string;
  label: string;
  placeholder: string;
  name: string;
  error?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ content, label, placeholder, name, error }, ref) => (
    <div className={style.checkbox}>
      <label htmlFor={label}>{content}</label>
      <input type="checkbox" id={label} name={name} placeholder={placeholder} ref={ref} />
      <span className={style.error}>{error}</span>
    </div>
  ),
);
