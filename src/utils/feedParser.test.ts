import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { formatFeedDate, parseFeed } from './feedParser';

const BASE = 'https://example.com/feed.xml';

const rss = (channel: string, item = '') =>
  `<rss version="2.0" xmlns:media="http://search.yahoo.com/mrss/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd"><channel><title>Site</title>${channel}${item}</channel></rss>`;

describe('parseFeed', () => {
  it('parses RSS title, link, date and resolves relative links', () => {
    const result = parseFeed(
      rss(
        '',
        '<item><title>A</title><link>/a</link><pubDate>Mon, 01 Jan 2024 00:00:00 GMT</pubDate></item>',
      ),
      BASE,
    );
    expect(result.title).toBe('Site');
    expect(result.items).toEqual([
      {
        title: 'A',
        link: 'https://example.com/a',
        date: 'Mon, 01 Jan 2024 00:00:00 GMT',
        thumb: '',
        audio: '',
        description: '',
      },
    ]);
  });

  it('parses Atom entries using the alternate link and updated date', () => {
    const xml = `<feed xmlns="http://www.w3.org/2005/Atom"><title>Atom</title><entry><title>E</title><link rel="self" href="/self"/><link rel="alternate" href="/e"/><updated>2024-01-01T00:00:00Z</updated></entry></feed>`;
    const result = parseFeed(xml, BASE);
    expect(result.title).toBe('Atom');
    expect(result.items[0]).toMatchObject({
      title: 'E',
      link: 'https://example.com/e',
      date: '2024-01-01T00:00:00Z',
    });
  });

  it('falls back to the link when the title is missing and to (無題) for the feed', () => {
    const xml = '<rss version="2.0"><channel><item><link>/a</link></item></channel></rss>';
    const result = parseFeed(xml, BASE);
    expect(result.title).toBe('(無題)');
    expect(result.items[0]?.title).toBe('https://example.com/a');
  });

  it('uses a permalink guid as link but ignores non-permalink guids', () => {
    const xml = rss(
      '',
      '<item><title>P</title><guid>/p</guid></item><item><title>N</title><guid isPermaLink="false">abc</guid></item>',
    );
    const { items } = parseFeed(xml, BASE);
    expect(items[0]?.link).toBe('https://example.com/p');
    expect(items[1]?.link).toBe('');
  });

  it('limits items to 15', () => {
    const items = Array.from({ length: 20 }, (_, i) => `<item><title>${i}</title></item>`).join('');
    expect(parseFeed(rss('', items), BASE).items).toHaveLength(15);
  });

  describe('thumbnails', () => {
    const thumb = (item: string, channel = '') =>
      parseFeed(rss(channel, `<item><title>t</title>${item}</item>`), BASE).items[0]?.thumb;

    it('prefers media:thumbnail', () => {
      expect(
        thumb('<media:thumbnail url="/t.png"/><media:content url="/m.jpg" medium="image"/>'),
      ).toBe('https://example.com/t.png');
    });

    it('uses media:content unless it is video', () => {
      expect(thumb('<media:content url="/m.jpg" medium="image"/>')).toBe(
        'https://example.com/m.jpg',
      );
      expect(thumb('<media:content url="/v.mp4" medium="video"/>')).toBe('');
    });

    it('uses an image enclosure', () => {
      expect(thumb('<enclosure url="/e.png" type="image/png"/>')).toBe('https://example.com/e.png');
    });

    it('extracts the first img from description html', () => {
      expect(thumb('<description>&lt;p&gt;&lt;img src="/d.png"&gt;&lt;/p&gt;</description>')).toBe(
        'https://example.com/d.png',
      );
    });

    it('falls back to the channel image', () => {
      expect(thumb('', '<image><url>/c.png</url></image>')).toBe('https://example.com/c.png');
    });
  });

  describe('audio', () => {
    const audio = (item: string) =>
      parseFeed(rss('', `<item><title>t</title>${item}</item>`), BASE).items[0]?.audio;

    it('detects audio enclosures by type', () => {
      expect(audio('<enclosure url="/a" type="audio/mpeg"/>')).toBe('https://example.com/a');
    });

    it('detects audio by file extension', () => {
      expect(audio('<enclosure url="/a.mp3?x=1" type=""/>')).toBe('https://example.com/a.mp3?x=1');
    });

    it('detects Atom enclosure links', () => {
      const xml = `<feed xmlns="http://www.w3.org/2005/Atom"><title>A</title><entry><title>E</title><link rel="enclosure" type="audio/mpeg" href="/a.mp3"/></entry></feed>`;
      expect(parseFeed(xml, BASE).items[0]?.audio).toBe('https://example.com/a.mp3');
    });

    it('ignores non-audio enclosures', () => {
      expect(audio('<enclosure url="/a.png" type="image/png"/>')).toBe('');
    });
  });

  it('throws a Japanese error for unsupported input', () => {
    expect(() => parseFeed('<html></html>', BASE)).toThrow('XMLを解析できません');
    expect(() => parseFeed('', BASE)).toThrow('XMLを解析できません');
  });

  for (const fixture of [
    'en/briefing',
    'en/field-notes',
    'en/studio',
    'ja/briefing',
    'ja/field-notes',
    'ja/studio',
  ]) {
    it(`parses the bundled ${fixture} mock feed and resolves its local artwork`, () => {
      const xml = readFileSync(
        resolve(process.cwd(), 'src/public/mock-feeds', `${fixture}.xml`),
        'utf8',
      );
      const base = `chrome-extension://test/mock-feeds/${fixture}.xml`;
      const { title, items } = parseFeed(xml, base);

      expect(title).not.toBe('(無題)');
      expect(items).toHaveLength(4);
      expect(
        items.every((item) => item.thumb.startsWith('chrome-extension://test/mock-feeds/art/')),
      ).toBe(true);
      expect(items.every((item) => item.link.startsWith('https://example.com/'))).toBe(true);

      const demoAudio =
        fixture === 'en/briefing'
          ? {
              file: 'podcast-test-en.mp3',
              title: '[TEST TONE]',
              description: 'No speech, narration, or podcast content',
            }
          : fixture === 'ja/briefing'
            ? {
                file: 'podcast-test-ja.mp3',
                title: '【テスト音】',
                description: '人の声や読み上げ、ポッドキャストの内容は含みません',
              }
            : null;
      if (demoAudio) {
        expect(items[0]?.title).toContain(demoAudio.title);
        expect(items[0]?.description).toContain(demoAudio.description);
        expect(items[0]?.audio).toBe(`chrome-extension://test/mock-feeds/audio/${demoAudio.file}`);
        expect(
          readFileSync(resolve(process.cwd(), 'src/public/mock-feeds/audio', demoAudio.file))
            .byteLength,
        ).toBeGreaterThan(0);
      } else {
        expect(items.every((item) => item.audio === '')).toBe(true);
      }
    });
  }
});

describe('formatFeedDate', () => {
  it('formats valid dates in ja-JP', () => {
    expect(formatFeedDate('2024-01-01T00:00:00Z')).toMatch(/2024/);
  });

  it('returns an empty string for invalid dates', () => {
    expect(formatFeedDate('not a date')).toBe('');
    expect(formatFeedDate('')).toBe('');
  });
});
