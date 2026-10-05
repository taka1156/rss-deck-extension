import { style } from '@vanilla-extract/css';

export const baseButton = style({
  padding: '8px 14px',
  border: '1px solid var(--line)',
  borderRadius: '8px',
  background: 'var(--card)',
  color: 'var(--text)',
  cursor: 'pointer',
});

export const buttonSub = style({
  background: 'var(--card)',
  color: 'var(--text)',
  border: '1px solid var(--line)',
});

export const buttonIcon = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '32px',
  minHeight: '32px',
  padding: '4px 8px',
  borderRadius: '6px',
});

export const buttonGhost = style({
  padding: '2px 8px',
  border: 0,
  background: 'transparent',
  color: 'var(--muted)',
  fontSize: '16px',
  ':hover': {
    color: 'var(--accent)',
  },
});

export const buttonMenuItem = style({
  display: 'block',
  width: '100%',
  padding: '8px 12px',
  border: 0,
  borderRadius: '6px',
  background: 'transparent',
  color: 'inherit',
  fontSize: '13px',
  textAlign: 'left',
  ':hover': {
    background: 'var(--line)',
  },
});
