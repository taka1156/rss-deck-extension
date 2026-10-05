import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { baseButton, buttonSub } from '../BaseButton/BaseButton.css';
import { BaseLink } from './BaseLink';
import { baseLink } from './BaseLink.css';

describe('BaseLink', () => {
  it('opens in a new tab with safe rel by default', () => {
    render(<BaseLink href="https://example.com">link</BaseLink>);
    const link = screen.getByRole('link', { name: 'link' });
    expect(link).toHaveAttribute('href', 'https://example.com');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    expect(link).toHaveClass(baseLink);
  });

  it('omits target and rel when external is false', () => {
    render(
      <BaseLink href="/feed.html" external={false}>
        internal
      </BaseLink>,
    );
    const link = screen.getByRole('link', { name: 'internal' });
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('applies button classes for variant="button"', () => {
    render(
      <BaseLink href="/x" variant="button">
        btn
      </BaseLink>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass(baseLink, baseButton, buttonSub);
  });

  it('does not apply button classes for the default variant', () => {
    render(<BaseLink href="/x">plain</BaseLink>);
    expect(screen.getByRole('link')).not.toHaveClass(baseButton);
  });

  it('merges className and passes extra attributes', () => {
    render(
      <BaseLink href="/x" className="custom" id="help">
        x
      </BaseLink>,
    );
    const link = screen.getByRole('link');
    expect(link).toHaveClass('custom');
    expect(link).toHaveAttribute('id', 'help');
  });
});
