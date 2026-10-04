import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { baseButton, buttonSub } from '../BaseButton/BaseButton.css';
import { baseLink } from './BaseLink.css';

type BaseLinkProps = Omit<ComponentProps<'a'>, 'target' | 'rel'> & {
  variant?: 'default' | 'button';
  /** false の場合は同じタブで開く(内部リンク用) */
  external?: boolean;
};

/**
 * 新しいタブで開く外部リンク
 *
 * external(デフォルト)のとき target と rel は固定。variant="button" で BaseButton(secondary)と同じ見た目になる
 */
export function BaseLink({
  variant = 'default',
  external = true,
  className,
  ...props
}: BaseLinkProps) {
  const classes = clsx(baseLink, variant === 'button' && [baseButton, buttonSub], className);

  return <a {...props} className={classes} target="_blank" rel="noopener noreferrer" />;
}
