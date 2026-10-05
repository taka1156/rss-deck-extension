import type { InputHTMLAttributes } from 'react';
import { baseInput } from './BaseInput.css';

export function BaseInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  const classes = [baseInput, className].filter(Boolean).join(' ');

  return <input className={classes} {...props} />;
}
