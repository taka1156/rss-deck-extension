import { afterEach, describe, expect, it, vi } from 'vitest';
import { getDemoArticleUrl, getMockFeedKey, getMockFeedUrl } from './mockFeed';

describe('mockFeed', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('validates bundled feed keys', () => {
    expect(getMockFeedKey('mock://ja/field-notes')).toBe('ja/field-notes');
    expect(() => getMockFeedKey('mock://ja/unknown')).toThrow('不明なモックフィードです');
    expect(() => getMockFeedKey('mock://ja/field-notes?x=1')).toThrow('不明なモックフィードです');
    expect(getMockFeedKey('https://feeds.example.test/rss')).toBeNull();
  });

  it('builds an extension-local RSS fixture URL', () => {
    vi.stubGlobal('browser', {
      runtime: { getURL: () => 'chrome-extension://test/feed.html' },
    });
    expect(getMockFeedUrl('ja/field-notes')).toBe(
      'chrome-extension://test/mock-feeds/ja/field-notes.xml',
    );
  });

  it('routes mock story links to the bundled bilingual article page', () => {
    vi.stubGlobal('browser', {
      runtime: { getURL: () => 'chrome-extension://test/feed.html' },
    });
    expect(getDemoArticleUrl('ja/field-notes', 'https://example.com/kansatsu/river-of-light')).toBe(
      'chrome-extension://test/demo-article.html?feed=ja%2Ffield-notes&slug=river-of-light',
    );
    expect(() => getDemoArticleUrl('ja/field-notes', 'https://outside.test/a')).toThrow(
      'モック記事のURLが不正です',
    );
  });
});
