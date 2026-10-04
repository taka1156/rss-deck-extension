import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BaseInput } from '../BaseInput/BaseInput';
import { BaseLabel } from './BaseLabel';
import { baseLabel, labelDirection } from './BaseLabel.css';

describe('BaseLabel', () => {
  it('associates the label with its control via htmlFor', () => {
    render(
      <BaseLabel htmlFor="name">
        Name
        <BaseInput id="name" />
      </BaseLabel>,
    );
    expect(screen.getByLabelText('Name')).toBeInTheDocument();
  });

  it('uses the column direction by default', () => {
    render(<BaseLabel data-testid="label">Text</BaseLabel>);
    const label = screen.getByTestId('label');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass(baseLabel, labelDirection.column);
    expect(label).not.toHaveClass(labelDirection.row);
  });

  it('applies the row direction', () => {
    render(
      <BaseLabel direction="row" data-testid="label">
        Text
      </BaseLabel>,
    );
    const label = screen.getByTestId('label');
    expect(label).toHaveClass(labelDirection.row);
    expect(label).not.toHaveClass(labelDirection.column);
  });

  it('merges className', () => {
    render(
      <BaseLabel className="custom" data-testid="label">
        Text
      </BaseLabel>,
    );
    expect(screen.getByTestId('label')).toHaveClass('custom', baseLabel);
  });
});
