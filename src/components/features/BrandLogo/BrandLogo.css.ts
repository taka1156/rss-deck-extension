import { style } from '@vanilla-extract/css';

export const brand = style({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  padding: 0,
  border: 0,
  background: 'transparent',
  color: 'inherit',
  textAlign: 'left',
  cursor: 'pointer',
});

export const brandIcon = style({
  width: '28px',
  height: '28px',
});

export const title = style({
  fontSize: '20px',
});

export const baseBadge = style({
  marginLeft: '4px',
  padding: '3px 7px',
  borderRadius: '999px',

  fontSize: '10px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  lineHeight: 1.2,
});

export const demoBadge = style({
  background: '#fff0c2',
  color: '#7a4b00',
});

export const previewBadge = style({
  background: '#00a982',
  color: '#fff',
});
