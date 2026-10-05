import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { baseList } from './BaseList.css';

export function BaseList({ className, ...props }: ComponentProps<'ul'>) {
  return <ul className={clsx(baseList, className)} {...props} />;
}
