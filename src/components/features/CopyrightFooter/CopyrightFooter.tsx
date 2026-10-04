import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { copyrightFooter, copyrightLink } from './CopyrightFooter.css';

export function CopyrightFooter() {
  const { name, version } = browser.runtime.getManifest();

  return (
    <footer className={copyrightFooter}>
      ©{' '}
      <BaseLink className={copyrightLink} href="https://github.com/taka1156">
        taka1156
      </BaseLink>
      <BaseText size="small" aria-hidden="true">
        ·
      </BaseText>
      <BaseLink
        className={copyrightLink}
        href="https://github.com/taka1156/rss-decks-extension/releases/latest"
      >
        {name} - v{version}
      </BaseLink>
    </footer>
  );
}
