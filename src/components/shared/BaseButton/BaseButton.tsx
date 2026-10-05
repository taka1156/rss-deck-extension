import clsx from 'clsx';
import type { ButtonHTMLAttributes } from 'react';
import { baseButton, buttonGhost, buttonIcon, buttonMenuItem, buttonSub } from './BaseButton.css';

type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'secondary' | 'icon' | 'ghost' | 'menuItem';
};

export function BaseButton({
  className = '',
  type = 'button',
  variant = 'default',
  ...props
}: BaseButtonProps) {
  const classes = clsx(
    baseButton,
    variant === 'secondary' && buttonSub,
    variant === 'icon' && buttonIcon,
    variant === 'ghost' && buttonGhost,
    variant === 'menuItem' && buttonMenuItem,
    className,
  );

  return <button className={classes} type={type} {...props} />;
}
