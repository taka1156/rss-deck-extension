import { globalStyle, style } from '@vanilla-extract/css';

export const group = style({
  display: 'flex',
  flexDirection: 'column',
  width: 'fit-content',
  maxWidth: '100%',
  border: '2px solid var(--gc, var(--line))',
  borderRadius: '16px',
  background: 'color-mix(in srgb, var(--gc, var(--muted)) 7%, var(--bg))',
});

export const dragging = style({
  opacity: 0.4,
});

export const collapsed = style({
  borderColor: 'var(--line)',
});

export const groupHead = style({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  padding: '10px 14px',
});

export const handle = style({
  color: 'var(--muted)',
  fontSize: '16px',
  userSelect: 'none',
  cursor: 'grab',
});

export const groupTitle = style({
  flex: 1,
  fontSize: '16px',
});

export const actions = style({
  display: 'flex',
  gap: '8px',
  marginLeft: 'auto',
});

export const feedList = style({
  padding: '0 14px 14px',
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'flex-start',
  gap: '16px',
  minHeight: '90px',
  selectors: {
    '&:empty::after': {
      content: 'attr(data-empty-label)',
      width: '292px',
      padding: '28px 0',
      border: '1px dashed var(--line)',
      borderRadius: '10px',
      color: 'var(--muted)',
      fontSize: '13px',
      textAlign: 'center',
    },
  },
});

export const collapsedList = style({
  display: 'none',
});

export const over = style({
  outline: '2px dashed var(--accent)',
  outlineOffset: '4px',
  borderRadius: '8px',
});

globalStyle(`${feedList} > li`, {
  flex: 'none',
  width: '320px',
});
