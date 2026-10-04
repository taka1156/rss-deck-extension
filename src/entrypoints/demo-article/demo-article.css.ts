import { globalStyle, style } from '@vanilla-extract/css';

export const page = style({
  minHeight: '100vh',
  background: '#fbfaf6',
  color: '#27312e',
  fontFamily: 'Georgia, "Yu Mincho", "Hiragino Mincho ProN", serif',
});

export const header = style({
  width: 'min(1160px, calc(100% - 48px))',
  minHeight: '82px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #e8e7df',
  '@media': {
    '(max-width: 640px)': {
      width: 'calc(100% - 32px)',
      minHeight: '68px',
    },
  },
});

export const brand = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '11px',
  color: '#334940',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.78rem',
  fontWeight: 800,
  letterSpacing: '0.18em',
});

export const brandMark = style({
  display: 'grid',
  width: '34px',
  height: '34px',
  placeItems: 'center',
  borderRadius: '50%',
  background: '#dce8d9',
  color: '#3d6854',
  fontSize: '1.5rem',
});

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: 'clamp(14px, 3vw, 34px)',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.82rem',
  color: '#66726a',
});

globalStyle(`${nav} a:hover`, { color: '#314f41', textDecoration: 'underline' });

export const articlePage = style({
  width: 'min(900px, calc(100% - 40px))',
  margin: '0 auto',
  padding: '30px 0 72px',
  '@media': {
    '(max-width: 640px)': {
      width: 'calc(100% - 32px)',
      paddingTop: '20px',
    },
  },
});

export const breadcrumb = style({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
  marginBottom: '42px',
  color: '#879088',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.76rem',
});

export const articleHeader = style({
  maxWidth: '760px',
  margin: '0 auto',
  textAlign: 'center',
});

export const category = style({
  margin: '0 0 18px',
  color: '#57816a',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.74rem',
  fontWeight: 700,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
});

export const title = style({
  fontSize: 'clamp(2.1rem, 5.5vw, 3.5rem)',
  lineHeight: 1.35,
  letterSpacing: '0.025em',
  fontWeight: 600,
  textWrap: 'balance',
});

export const lead = style({
  maxWidth: '640px',
  margin: '20px auto 0',
  color: '#737d74',
  fontSize: '1.05rem',
  lineHeight: 1.9,
});

export const byline = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  marginTop: '24px',
  color: '#737d74',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.76rem',
});

export const avatar = style({
  display: 'grid',
  width: '30px',
  height: '30px',
  placeItems: 'center',
  borderRadius: '50%',
  background: '#dce8d9',
  color: '#3d6854',
  fontWeight: 700,
});

export const dot = style({ color: '#b1b8ae' });

export const cover = style({
  margin: '42px 0 0',
});

globalStyle(`${cover} img`, {
  width: '100%',
  maxHeight: '490px',
  objectFit: 'cover',
  borderRadius: '8px',
  background: '#dce8d9',
});
globalStyle(`${cover} figcaption`, {
  marginTop: '10px',
  color: '#899188',
  textAlign: 'right',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.7rem',
});

export const story = style({
  maxWidth: '650px',
  margin: '54px auto 0',
  color: '#454e48',
  fontSize: '1.08rem',
  lineHeight: 2.15,
});

globalStyle(`${story} p`, { margin: '0 0 24px' });

export const intro = style({
  fontSize: '1.3rem',
  color: '#334940',
});

export const note = style({
  margin: '36px 0',
  padding: '24px 28px',
  borderLeft: '3px solid #88a88c',
  background: '#f0f3eb',
});

globalStyle(`${note} p`, { margin: '8px 0', color: '#334940', fontSize: '1.15rem' });
globalStyle(`${note} span:last-child`, { color: '#707b70', fontSize: '0.92rem' });

export const noteLabel = style({
  color: '#57816a',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.7rem',
  fontWeight: 700,
  letterSpacing: '0.14em',
  textTransform: 'uppercase',
});

export const footer = style({
  padding: '26px 20px',
  borderTop: '1px solid #e8e7df',
  color: '#899188',
  textAlign: 'center',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '0.76rem',
});

export const message = style({
  width: 'min(680px, calc(100% - 40px))',
  margin: '15vh auto',
  color: '#536258',
  textAlign: 'center',
  fontFamily: '"Segoe UI", sans-serif',
  fontSize: '1.1rem',
});
