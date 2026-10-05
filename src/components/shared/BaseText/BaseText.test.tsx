import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BaseText } from './BaseText';
import { baseText, colorStyles, sizeStyles, truncateStyle, weightStyles } from './BaseText.css';

describe('BaseText', () => {
  it('renders a p element by default', () => {
    render(<BaseText data-testid="t">text</BaseText>);
    const el = screen.getByTestId('t');
    expect(el.tagName).toBe('P');
    expect(el).toHaveClass(baseText);
  });

  it.each(['span', 'small'] as const)('renders %s via the as prop', (tag) => {
    render(
      <BaseText as={tag} data-testid="t">
        text
      </BaseText>,
    );
    expect(screen.getByTestId('t').tagName).toBe(tag.toUpperCase());
  });

  it('applies no color/weight/size classes when unspecified', () => {
    render(<BaseText data-testid="t">text</BaseText>);
    const el = screen.getByTestId('t');
    for (const cls of [
      ...Object.values(colorStyles),
      ...Object.values(weightStyles),
      ...Object.values(sizeStyles),
      truncateStyle,
    ]) {
      expect(el).not.toHaveClass(cls);
    }
  });

  it('applies color, weight and size classes', () => {
    render(
      <BaseText color="soft" weight="bold" size="compact" data-testid="t">
        text
      </BaseText>,
    );
    expect(screen.getByTestId('t')).toHaveClass(
      colorStyles.soft,
      weightStyles.bold,
      sizeStyles.compact,
    );
  });

  it('applies the muted color and tiny size', () => {
    render(
      <BaseText color="muted" size="tiny" data-testid="t">
        text
      </BaseText>,
    );
    expect(screen.getByTestId('t')).toHaveClass(colorStyles.muted, sizeStyles.tiny);
  });

  it('applies the truncate class only when truncate is set', () => {
    render(
      <>
        <BaseText truncate data-testid="a">
          a
        </BaseText>
        <BaseText data-testid="b">b</BaseText>
      </>,
    );
    expect(screen.getByTestId('a')).toHaveClass(truncateStyle);
    expect(screen.getByTestId('b')).not.toHaveClass(truncateStyle);
  });

  it('merges className and passes extra attributes', () => {
    render(
      <BaseText className="custom" id="x" data-testid="t">
        text
      </BaseText>,
    );
    const el = screen.getByTestId('t');
    expect(el).toHaveClass('custom');
    expect(el).toHaveAttribute('id', 'x');
  });
});
