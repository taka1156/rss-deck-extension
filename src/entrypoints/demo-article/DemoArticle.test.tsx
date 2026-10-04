import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import DemoArticle from './DemoArticle';

const feedUrl = 'chrome-extension://test/mock-feeds/ja/field-notes.xml';

describe('DemoArticle', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('renders the selected Japanese story with the bundled artwork', async () => {
    window.history.replaceState({}, '', '?feed=ja%2Ffield-notes&slug=river-of-light');
    vi.stubGlobal('browser', {
      runtime: { getURL: () => 'chrome-extension://test/feed.html' },
    });
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(readFileSync(resolve('src/public/mock-feeds/ja/field-notes.xml'), 'utf8')),
      ),
    );

    const { container } = render(<DemoArticle />);

    expect(
      await screen.findByRole('heading', { name: '光でできた川をたどって' }),
    ).toBeInTheDocument();
    await waitFor(() => expect(document.documentElement.lang).toBe('ja'));
    expect(
      screen.getByText('水たまりを小さな地図に見立てた、架空の散歩道です。'),
    ).toBeInTheDocument();
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      'chrome-extension://test/mock-feeds/art/blue-hour.svg',
    );
    expect(fetch).toHaveBeenCalledWith(feedUrl);
  });

  it('shows a localized not-found state for unknown articles', async () => {
    window.history.replaceState({}, '', '?feed=en%2Fstudio&slug=missing');
    vi.stubGlobal('browser', {
      runtime: { getURL: () => 'chrome-extension://test/feed.html' },
    });
    vi.stubGlobal(
      'fetch',
      vi.fn(
        async () =>
          new Response(readFileSync(resolve('src/public/mock-feeds/en/studio.xml'), 'utf8')),
      ),
    );

    render(<DemoArticle />);

    expect(await screen.findByText('This sample story could not be found.')).toBeInTheDocument();
  });
});
