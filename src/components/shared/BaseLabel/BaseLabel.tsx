import clsx from 'clsx';
import type { ComponentProps } from 'react';
import { baseLabel, labelDirection } from './BaseLabel.css';

type BaseLabelProps = ComponentProps<'label'> & {
  /** column: ラベル文言の下にコントロール / row: コントロールの横にラベル文言 */
  direction?: 'column' | 'row';
};

export function BaseLabel({ direction = 'column', className, ...props }: BaseLabelProps) {
  const classes = clsx(baseLabel, labelDirection[direction], className);
  // biome-ignore lint/a11y/noLabelWithoutControl: htmlFor/children are supplied by callers
  return <label className={classes} {...props} />;
}
