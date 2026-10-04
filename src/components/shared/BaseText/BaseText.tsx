import clsx from 'clsx';
import type { ComponentProps } from 'react';
import {
  baseText,
  colorStyles,
  type FONT_COLOR,
  type FONT_SIZE,
  type FONT_WEIGHT,
  sizeStyles,
  truncateStyle,
  weightStyles,
} from './BaseText.css';

type BaseTextProps = Omit<ComponentProps<'p'>, 'color'> & {
  /** 描画する要素。デフォルトは p */
  as?: 'p' | 'span' | 'small';
  /**
   * - Base: #333
   * - Strong: #B3B3B3
   * - Highlight: #616161
   * - White: #fff
   * - Muted: var(--muted)
   * - Soft: var(--text-soft)
   *
   * 未指定の場合は親から継承
   */
  color?: FONT_COLOR;
  /**
   * - Regular: 400
   * - Bold: 700
   *
   * 未指定の場合は親から継承
   */
  weight?: FONT_WEIGHT;
  /**
   * - Extra Small: 10px
   * - Tiny: 11px
   * - Compact: 13px
   * - Small: 14px
   * - Medium: 16px
   * - Large: 18px
   * - Extra Large: 24px
   *
   * 未指定の場合は親から継承
   */
  size?: FONT_SIZE;
  /** はみ出した文字を省略記号(…)で切り詰める */
  truncate?: boolean;
};

/**
 * テキストを表示するコンポーネント
 *
 * color、weight、sizeの組み合わせでテキストのスタイルを変更可能
 */
const BaseText = ({
  as: Tag = 'p',
  color,
  weight,
  size,
  truncate = false,
  className,
  ...props
}: BaseTextProps) => {
  return (
    <Tag
      {...props}
      className={clsx(
        baseText,
        color && colorStyles[color],
        weight && weightStyles[weight],
        size && sizeStyles[size],
        truncate && truncateStyle,
        className,
      )}
    />
  );
};

export { BaseText };
