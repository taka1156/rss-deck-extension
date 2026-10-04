import { globalStyle, style } from '@vanilla-extract/css';

globalStyle('body', {
  paddingBottom: '48px',
});

export const copyrightFooter = style({
  position: 'fixed',
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  padding: '12px 24px',
  borderTop: '1px solid var(--line)',
  background: 'var(--bg)',
  color: 'var(--muted)',
  fontSize: '14px',
});

export const copyrightLink = style({
  color: 'var(--text-soft)',
  ':hover': {
    textDecoration: 'underline',
  },
});
