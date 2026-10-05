import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BrandLogo } from './BrandLogo';
import { getBrandIcon, getModeBadge } from './resolveModeBadge';

describe('getModeBadge', () => {
  it('prioritizes DEMO over PREVIEW', () => {
    expect(getModeBadge(true, 'preview')?.label).toBe('DEMO');
  });

  it('returns PREVIEW in preview mode', () => {
    expect(getModeBadge(false, 'preview')?.label).toBe('PREVIEW');
  });

  it('returns null otherwise', () => {
    expect(getModeBadge(false, 'production')).toBeNull();
  });
});

describe('getBrandIcon', () => {
  it('switches icon by mode', () => {
    expect(getBrandIcon('preview')).not.toBe(getBrandIcon('production'));
  });
});

describe('BrandLogo', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('renders the logo and title without a badge by default', () => {
    vi.stubEnv('MODE', 'production');
    render(<BrandLogo />);
    expect(screen.getByRole('button', { name: 'RSS Decks' })).toBeInTheDocument();
    expect(screen.getByAltText('RSS Decks Logo')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1, name: 'RSS Decks' })).toBeInTheDocument();
    expect(screen.queryByText('DEMO')).not.toBeInTheDocument();
    expect(screen.queryByText('PREVIEW')).not.toBeInTheDocument();
  });

  it('renders DEMO', () => {
    render(<BrandLogo demoMode />);
    expect(screen.getByText('DEMO')).toBeInTheDocument();
  });

  it('renders PREVIEW', () => {
    vi.stubEnv('MODE', 'preview');
    render(<BrandLogo />);
    expect(screen.getByText('PREVIEW')).toBeInTheDocument();
  });

  it('calls onClick', async () => {
    const onClick = vi.fn();
    render(<BrandLogo onClick={onClick} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'RSS Decks' }));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
