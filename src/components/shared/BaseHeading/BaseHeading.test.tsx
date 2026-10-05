import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { BaseHeading } from './BaseHeading';

describe('BaseHeading', () => {
  it.each(['1', '2', '3', '4', '5', '6'] as const)('hLv="%s" のとき h%s 要素を描画する', (hLv) => {
    const { container } = render(<BaseHeading hLv={hLv}>見出しテキスト</BaseHeading>);
    expect(container.querySelector(`h${hLv}`)).toBeInTheDocument();
  });

  it('children を表示する', () => {
    const { container } = render(<BaseHeading hLv="1">テスト</BaseHeading>);
    expect(container.textContent).toBe('テスト');
  });

  it('className を結合して適用する', () => {
    const { container } = render(
      <BaseHeading hLv="2" className="custom-class">
        見出し
      </BaseHeading>,
    );
    expect(container.querySelector('h2')).toHaveClass('custom-class');
  });

  it('追加の HTML 属性（id など）を受け付ける', () => {
    const { container } = render(
      <BaseHeading hLv="3" id="section-1">
        見出し
      </BaseHeading>,
    );
    expect(container.querySelector('#section-1')).toBeInTheDocument();
  });
});
