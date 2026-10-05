import clsx from 'clsx';
import type { ElementType, ReactNode } from 'react';
import { baseHeading } from './BaseHeading.css';

type BaseHeadingProps = {
  /**
   * - 1 ~ 6 (h1~h6)
   */
  hLv: '1' | '2' | '3' | '4' | '5' | '6';
  children: ReactNode;
  className?: string;
} & React.ComponentPropsWithoutRef<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>;

/**
 * 見出しを表示するコンポーネント
 *
 * hLvに応じてh1~h6の見出しを表示
 */
const BaseHeading = ({ hLv, children, className, ...props }: BaseHeadingProps) => {
  const Heading = `h${hLv}` as ElementType;

  return (
    <Heading className={clsx(baseHeading, className)} {...props}>
      {children}
    </Heading>
  );
};

export { BaseHeading };
