import { useEffect, useState } from 'react';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { type FeedItem, parseFeed } from '@/utils/feedParser';
import { getMockFeedKey, getMockFeedUrl } from '@/utils/mockFeed';
import * as styles from './demo-article.css';

type Article = FeedItem & { feedTitle: string };
type PageState = { article: Article | null; error: string | null; loading: boolean };

const TEXT = {
  en: {
    home: 'Home',
    journal: 'Field journal',
    read: 'A small note for a slower day',
    byline: 'Words from the Pocket Journal editors',
    caption: 'An original illustration made for this sample story.',
    note: 'A moment to notice',
    noteText:
      'Let the small details set the pace. A shape, a color, or a quiet change is enough to begin.',
    reflection:
      'There is no checklist to finish here. Keep the observation that feels like yours, and let the rest of the day unfold around it.',
    footer: 'A small collection of fictional field notes.',
    notFound: 'This sample story could not be found.',
    loadError: 'The sample story could not be loaded.',
    language: '日本語',
  },
  ja: {
    home: 'ホーム',
    journal: '観察ノート',
    read: 'いつもより少しゆっくり過ごすための小さな便り',
    byline: 'よりみち編集室',
    caption: 'このサンプル記事のために制作したオリジナルイラストです。',
    note: '立ち止まって見つけること',
    noteText:
      '形や色、ほんの小さな変化に目を向けてみましょう。気づいたことひとつで、観察は始められます。',
    reflection:
      'ここに正解や、最後までこなす項目はありません。心に残ったものをひとつ持ち帰って、あとは今日の時間にゆだねてみてください。',
    footer: '架空の風景を集めた、小さな観察ノート。',
    notFound: 'サンプル記事が見つかりませんでした。',
    loadError: 'サンプル記事を読み込めませんでした。',
    language: 'English',
  },
} as const;

function lastPathPart(value: string): string {
  try {
    return new URL(value).pathname.split('/').filter(Boolean).at(-1) ?? '';
  } catch {
    return '';
  }
}

function getReadingTime(language: 'en' | 'ja') {
  return language === 'ja' ? '約2分' : '2 min read';
}

const PAIRED_SLUGS: Record<string, string> = {
  'evening-dot': 'evening-light',
  'evening-light': 'evening-dot',
  'winter-moon': 'moon-shapes',
  'moon-shapes': 'winter-moon',
  'shades-of-green': 'leaf-greens',
  'leaf-greens': 'shades-of-green',
  'things-that-hum': 'sounds',
  sounds: 'things-that-hum',
  'small-island': 'island',
  island: 'small-island',
};

export default function DemoArticle() {
  const params = new URLSearchParams(window.location.search);
  const rawFeedKey = params.get('feed') ?? '';
  const slug = params.get('slug') ?? '';
  let feedKey: string | null = null;
  try {
    feedKey = getMockFeedKey(`mock://${rawFeedKey}`);
  } catch {
    feedKey = null;
  }
  const language = feedKey?.startsWith('ja/') ? 'ja' : 'en';
  const copy = TEXT[language];
  const [state, setState] = useState<PageState>({
    article: null,
    error: null,
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    if (!feedKey || !slug) {
      setState({ article: null, error: null, loading: false });
      return () => {
        cancelled = true;
      };
    }

    void (async () => {
      try {
        const response = await fetch(getMockFeedUrl(feedKey));
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const parsed = parseFeed(await response.text(), getMockFeedUrl(feedKey));
        const article = parsed.items.find((item) => lastPathPart(item.link) === slug);
        if (!article) {
          setState({ article: null, error: null, loading: false });
          return;
        }
        setState({
          article: { ...article, feedTitle: parsed.title },
          error: null,
          loading: false,
        });
      } catch {
        if (!cancelled) setState({ article: null, error: copy.loadError, loading: false });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [copy.loadError, feedKey, slug]);

  useEffect(() => {
    document.documentElement.lang = language;
    document.title = state.article?.title ?? 'Field Notes';
  }, [language, state.article?.title]);

  const languageUrl = new URL(window.location.href);
  languageUrl.searchParams.set(
    'feed',
    `${language === 'ja' ? 'en' : 'ja'}/${rawFeedKey.split('/').at(-1) ?? 'field-notes'}`,
  );
  languageUrl.searchParams.set('slug', PAIRED_SLUGS[slug] ?? slug);

  if (state.loading) {
    return <main className={styles.message}>{language === 'ja' ? '読み込み中…' : 'Loading…'}</main>;
  }
  if (state.error || !state.article) {
    return <main className={styles.message}>{state.error ?? copy.notFound}</main>;
  }

  const { article } = state;
  const date = article.date
    ? new Date(article.date).toLocaleDateString(language === 'ja' ? 'ja-JP' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <BaseLink
          external={false}
          className={styles.brand}
          href={browser.runtime.getURL('/feed.html?demo=1')}
        >
          <span className={styles.brandMark} aria-hidden="true">
            ◌
          </span>
          <span>FIELD NOTES</span>
        </BaseLink>
        <nav
          className={styles.nav}
          aria-label={language === 'ja' ? 'メインナビゲーション' : 'Main navigation'}
        >
          <BaseLink external={false} href={browser.runtime.getURL('/feed.html?demo=1')}>
            {copy.home}
          </BaseLink>
          <span>{copy.journal}</span>
          <BaseLink external={false} href={languageUrl.href}>
            {copy.language}
          </BaseLink>
        </nav>
      </header>

      <main className={styles.articlePage}>
        <div className={styles.breadcrumb}>
          <BaseLink external={false} href={browser.runtime.getURL('/feed.html?demo=1')}>
            {copy.home}
          </BaseLink>
          <span aria-hidden="true">/</span>
          <span>{article.feedTitle}</span>
        </div>
        <article>
          <header className={styles.articleHeader}>
            <BaseText className={styles.category}>{article.feedTitle}</BaseText>
            <BaseHeading hLv="1" className={styles.title}>
              {article.title}
            </BaseHeading>
            <BaseText className={styles.lead}>{article.description || copy.read}</BaseText>
            <div className={styles.byline}>
              <span className={styles.avatar} aria-hidden="true">
                F
              </span>
              <span>{copy.byline}</span>
              {date && <span className={styles.dot}>·</span>}
              {date && <time dateTime={article.date}>{date}</time>}
              <span className={styles.dot}>·</span>
              <span>{getReadingTime(language)}</span>
            </div>
          </header>

          {article.thumb && (
            <figure className={styles.cover}>
              <img src={article.thumb} alt="" />
              <figcaption>{copy.caption}</figcaption>
            </figure>
          )}

          <div className={styles.story}>
            <BaseText className={styles.intro}>{copy.read}</BaseText>
            <BaseText>{copy.reflection}</BaseText>
            <aside className={styles.note}>
              <span className={styles.noteLabel}>{copy.note}</span>
              <BaseText>{copy.noteText}</BaseText>
            </aside>
            <BaseText>{copy.footer}</BaseText>
          </div>
        </article>
      </main>

      <footer className={styles.footer}>{copy.footer}</footer>
    </div>
  );
}
