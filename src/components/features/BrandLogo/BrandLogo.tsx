import clsx from 'clsx';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { baseBadge, brand, brandIcon, title } from './BrandLogo.css';
import { getBrandIcon, getModeBadge } from './resolveModeBadge';

type BrandLogoProps = {
  demoMode?: boolean;
  onClick?: () => void;
};

export function BrandLogo({ demoMode = false, onClick }: BrandLogoProps) {
  const mode = import.meta.env.MODE;
  const badge = getModeBadge(demoMode, mode);

  return (
    <button className={brand} type="button" aria-label="RSS Decks" onClick={onClick}>
      <img className={brandIcon} src={getBrandIcon(mode)} alt="RSS Decks Logo" />
      <BaseHeading hLv="1" className={title}>
        RSS Decks
      </BaseHeading>
      {badge && (
        <span className={clsx(baseBadge, badge.className)} aria-hidden="true">
          {badge.label}
        </span>
      )}
    </button>
  );
}
