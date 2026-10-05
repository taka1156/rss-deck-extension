import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import {
  entry,
  fallback,
  icon,
  link,
  list,
  removeButton,
  section,
  toolbar,
  toolbarTitle,
} from './ShortcutSection.css';

function ShortcutEntry({ url, onRemove }: { url: string; onRemove: (url: string) => void }) {
  const { t } = useTranslation();
  const [iconFailed, setIconFailed] = useState(false);
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }
  const hostname = parsed.hostname.replace(/^www\./, '');

  return (
    <div className={entry}>
      <BaseLink className={link} href={parsed.href} title={parsed.href}>
        {iconFailed ? (
          <span className={fallback}>{hostname.charAt(0).toUpperCase()}</span>
        ) : (
          <img
            className={icon}
            alt=""
            src={`https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(parsed.href)}&sz=64`}
            onError={() => setIconFailed(true)}
          />
        )}
        <span>{hostname}</span>
      </BaseLink>
      <button
        type="button"
        className={removeButton}
        aria-label={t('shortcut.remove', { hostname })}
        title={t('shortcut.remove', { hostname })}
        onClick={() => onRemove(url)}
      >
        ×
      </button>
    </div>
  );
}

type ShortcutSectionProps = {
  shortcuts: { url: string }[];
  onRemoveShortcut: (url: string) => void;
};

export function ShortcutSection({ shortcuts, onRemoveShortcut }: ShortcutSectionProps) {
  const { t } = useTranslation();
  return (
    <section id="shortcuts" className={section} aria-labelledby="shortcutsTitle">
      <div className={toolbar}>
        <BaseHeading hLv="2" id="shortcutsTitle" className={toolbarTitle}>
          {t('shortcut.title')}
        </BaseHeading>
      </div>
      <div id="shortcutList" className={list}>
        {shortcuts.length === 0 ? (
          <BaseText as="span">{t('shortcut.empty')}</BaseText>
        ) : (
          shortcuts.map((shortcut) => (
            <ShortcutEntry key={shortcut.url} url={shortcut.url} onRemove={onRemoveShortcut} />
          ))
        )}
      </div>
    </section>
  );
}
