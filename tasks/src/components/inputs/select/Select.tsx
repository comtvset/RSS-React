import React from 'react';
import style from '../input.module.scss';

interface SelectProps {
  content: string;
  options: string[];
  label: string;
  placeholder: string;
  name: string;
  error?: string;
  rest?: React.InputHTMLAttributes<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export const Select = React.forwardRef<HTMLInputElement, SelectProps>(
  ({ content, label, name, options, placeholder, error, rest, onChange }, ref) => (
    <div className={style.container}>
      <label htmlFor={label}>
        {`${content} `}
        <span style={{ color: 'rgb(233, 86, 86)' }}>*</span>
      </label>
      <input
        id={label}
        name={name}
        placeholder={placeholder}
        list={name + '-list'}
        ref={ref}
        className={style.customInput}
        onChange={onChange}
        {...rest}
      />
      <span className={style.error}>{error}</span>
      <datalist id={name + '-list'}>
        {options.map((option) => (
          <option key={option} value={option} />
        ))}
      </datalist>
    </div>
  ),
);
