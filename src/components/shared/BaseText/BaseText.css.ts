import { style } from '@vanilla-extract/css';

export type FONT_COLOR = 'base' | 'strong' | 'highlight' | 'white' | 'muted' | 'soft';
export type FONT_WEIGHT = 'regular' | 'bold';
export type FONT_SIZE =
  | 'extraSmall'
  | 'tiny'
  | 'compact'
  | 'small'
  | 'medium'
  | 'large'
  | 'extraLarge';

export const FONT_COLORS: Record<FONT_COLOR, string> = {
  base: '#333',
  strong: '#B3B3B3',
  highlight: '#616161',
  white: '#fff',
  muted: 'var(--muted)',
  soft: 'var(--text-soft)',
};

export const FONT_WEIGHTS: Record<FONT_WEIGHT, number> = {
  regular: 400,
  bold: 700,
};

export const FONT_SIZES: Record<FONT_SIZE, number> = {
  extraSmall: 10,
  tiny: 11,
  compact: 13,
  small: 14,
  medium: 16,
  large: 18,
  extraLarge: 24,
};

export const baseText = style({ margin: 0 });

export const truncateStyle = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const colorStyles: Record<FONT_COLOR, string> = {
  base: style({
    color: FONT_COLORS.base,
  }),
  strong: style({
    color: FONT_COLORS.strong,
  }),
  highlight: style({
    color: FONT_COLORS.highlight,
  }),
  white: style({
    color: FONT_COLORS.white,
  }),
  muted: style({ color: FONT_COLORS.muted }),
  soft: style({ color: FONT_COLORS.soft }),
};

export const weightStyles: Record<FONT_WEIGHT, string> = {
  regular: style({ fontWeight: FONT_WEIGHTS.regular }),
  bold: style({ fontWeight: FONT_WEIGHTS.bold }),
};

export const sizeStyles: Record<FONT_SIZE, string> = {
  extraSmall: style({
    fontSize: FONT_SIZES.extraSmall,
  }),
  tiny: style({ fontSize: FONT_SIZES.tiny }),
  compact: style({ fontSize: FONT_SIZES.compact }),
  small: style({ fontSize: FONT_SIZES.small }),
  medium: style({ fontSize: FONT_SIZES.medium }),
  large: style({ fontSize: FONT_SIZES.large }),
  extraLarge: style({
    fontSize: FONT_SIZES.extraLarge,
  }),
};
