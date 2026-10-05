import { style, styleVariants } from '@vanilla-extract/css';

export const baseLabel = style({
  display: 'flex',
  gap: '4px',
  fontSize: '13px',
});

export const labelDirection = styleVariants({
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    cursor: 'pointer',
  },
});
