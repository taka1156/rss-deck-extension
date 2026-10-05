import { style } from '@vanilla-extract/css';

export const baseInput = style({
  font: 'inherit',
  padding: '8px 12px',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  background: 'var(--card)',
  color: 'var(--text)',
});
