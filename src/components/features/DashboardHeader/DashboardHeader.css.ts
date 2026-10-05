import { style } from '@vanilla-extract/css';

export const header = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px 20px',
  alignItems: 'center',
  padding: '16px 24px',
});

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

export const demoBadge = style({
  marginLeft: '4px',
  padding: '3px 7px',
  borderRadius: '999px',
  background: '#fff0c2',
  color: '#7a4b00',
  fontSize: '10px',
  fontWeight: 800,
  letterSpacing: '0.08em',
  lineHeight: 1.2,
});

export const tools = style({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  flexWrap: 'wrap',
});
