import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px 20px',
  alignItems: 'center',
  padding: '16px 24px',
});

export const tools = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
});
