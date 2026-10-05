import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { BrandLogo } from '@/components/features/BrandLogo/BrandLogo';
import { LanguageMenu } from '@/components/features/LanguageMenu/LanguageMenu';
import { BaseButton } from '@/components/shared/BaseButton/BaseButton';
import { BaseInput } from '@/components/shared/BaseInput/BaseInput';
import { BaseLabel } from '@/components/shared/BaseLabel/BaseLabel';
import { BaseLink } from '@/components/shared/BaseLink/BaseLink';
import { header, tools } from './DashboardHeader.css';

type DashboardHeaderProps = {
  // Omit the dashboard handlers to render the minimal header used by the help page.
  sideOpen?: boolean;
  onOpenAddPanel?: () => void;
  onOpenSettingsPanel?: () => void;
  onAddGroup?: () => void;
  onRefresh?: () => void;
  onSideOpenChange?: (checked: boolean) => void;
  onDemoMode?: () => void;
  demoMode?: boolean;
};

export function DashboardHeader({
  sideOpen = false,
  onOpenAddPanel,
  onOpenSettingsPanel,
  onAddGroup,
  onRefresh,
  onSideOpenChange,
  onDemoMode,
  demoMode = false,
}: DashboardHeaderProps) {
  const { t } = useTranslation();
  const isDashboard = Boolean(onOpenAddPanel);
  const logoClickCount = useRef(0);

  const handleLogoClick = () => {
    // Clicking the logo 10 times when demo mode is not enabled will activate demo mode.
    // If demo mode is enabled, you will be redirected to the feed page to disable Demo Mode.
    if (!demoMode) {
      logoClickCount.current += 1;

      if (logoClickCount.current === 5) {
        alert(t('header.demoAlert'));
        return;
      }

      if (logoClickCount.current < 10) {
        return;
      }

      logoClickCount.current = 0;

      if (onDemoMode) {
        onDemoMode();
        return;
      }

      window.location.assign(browser.runtime.getURL('/feed.html?demo=1'));
      return;
    }

    window.location.assign(browser.runtime.getURL('/feed.html'));
  };

  return (
    <header className={header}>
      <BrandLogo demoMode={demoMode} onClick={handleLogoClick} />
      <div className={tools}>
        {isDashboard && (
          <>
            <BaseButton
              id="addPanelToggle"
              type="button"
              aria-controls="addPanel"
              onClick={onOpenAddPanel}
            >
              {t('header.add')}
            </BaseButton>
            <BaseButton id="addGroupBtn" type="button" variant="secondary" onClick={onAddGroup}>
              {t('header.addGroup')}
            </BaseButton>
            <BaseButton id="refreshBtn" type="button" variant="secondary" onClick={onRefresh}>
              {t('header.refresh')}
            </BaseButton>
            <BaseButton
              id="settingsToggle"
              type="button"
              variant="secondary"
              aria-haspopup="dialog"
              onClick={onOpenSettingsPanel}
            >
              {t('header.settings')}
            </BaseButton>
            <BaseLink id="helpLink" variant="button" href="/help.html">
              {t('header.help')}
            </BaseLink>
            <BaseLabel direction="row" htmlFor="sideToggle">
              <BaseInput
                type="checkbox"
                id="sideToggle"
                checked={sideOpen}
                onChange={(event) => onSideOpenChange?.(event.target.checked)}
              />
              {t('header.sideToggle')}
            </BaseLabel>
          </>
        )}
        <LanguageMenu />
      </div>
    </header>
  );
}
