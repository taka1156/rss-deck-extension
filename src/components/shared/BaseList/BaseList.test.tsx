import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BaseList } from './BaseList';
import { baseList } from './BaseList.css';

describe('BaseList', () => {
  it('renders a ul with the base class and children', () => {
    render(
      <BaseList aria-label="items">
        <li>one</li>
        <li>two</li>
      </BaseList>,
    );
    const list = screen.getByRole('list', { name: 'items' });
    expect(list.tagName).toBe('UL');
    expect(list).toHaveClass(baseList);
    expect(screen.getAllByRole('listitem')).toHaveLength(2);
  });

  it('merges className and passes extra attributes', () => {
    render(<BaseList className="custom" id="groups" data-group="x" />);
    const list = screen.getByRole('list');
    expect(list).toHaveClass('custom', baseList);
    expect(list).toHaveAttribute('id', 'groups');
    expect(list).toHaveAttribute('data-group', 'x');
  });
});
