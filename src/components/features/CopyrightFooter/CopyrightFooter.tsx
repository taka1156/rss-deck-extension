import { copyrightFooter, copyrightLink } from './CopyrightFooter.css';

export function CopyrightFooter() {
  const { name, version } = browser.runtime.getManifest();

  return (
    <footer className={copyrightFooter}>
      ©{' '}
      <a
        className={copyrightLink}
        href="https://github.com/taka1156"
        target="_blank"
        rel="noopener noreferrer"
      >
        taka1156
      </a>
      <span aria-hidden="true">·</span>
      <a
        className={copyrightLink}
        href="https://github.com/taka1156/rss-decks-extension/releases/latest"
        target="_blank"
        rel="noopener noreferrer"
      >
        {name} - v{version}
      </a>
    </footer>
  );
}
