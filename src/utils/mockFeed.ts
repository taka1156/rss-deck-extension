const MOCK_FEEDS = new Set([
  'en/briefing',
  'en/field-notes',
  'en/studio',
  'ja/briefing',
  'ja/field-notes',
  'ja/studio',
]);

export function getMockFeedKey(url: string): string | null {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('フィードURLが不正です');
  }
  if (parsed.protocol !== 'mock:') return null;

  const key = `${parsed.hostname}${parsed.pathname}`;
  if (!MOCK_FEEDS.has(key) || parsed.search || parsed.hash) {
    throw new Error('不明なモックフィードです');
  }
  return key;
}

export function getMockFeedUrl(key: string): string {
  return new URL(`/mock-feeds/${key}.xml`, browser.runtime.getURL('/feed.html')).href;
}

export function getDemoArticleUrl(feedKey: string, itemUrl: string): string {
  let articleUrl: URL;
  try {
    articleUrl = new URL(itemUrl);
  } catch {
    throw new Error('モック記事のURLが不正です');
  }
  const slug = articleUrl.pathname.split('/').filter(Boolean).at(-1);
  if (articleUrl.hostname !== 'example.com' || !slug || !/^[a-z0-9-]+$/i.test(slug)) {
    throw new Error('モック記事のURLが不正です');
  }

  const url = new URL('/demo-article.html', browser.runtime.getURL('/feed.html'));
  url.searchParams.set('feed', feedKey);
  url.searchParams.set('slug', slug);
  return url.href;
}
