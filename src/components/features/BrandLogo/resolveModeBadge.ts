import previewIcon from '@/assets/icon.preview.png';
import productionIcon from '@/assets/icon.production.png';
import { demoBadge, previewBadge } from './BrandLogo.css';

export type ModeBadgeInfo = { label: string; className: string };

/**
 * Resolves the badge to show. Priority: DEMO > PREVIEW > none.
 */
export const getModeBadge = (demoMode: boolean, mode: string): ModeBadgeInfo | null => {
  if (demoMode) {
    return { label: 'DEMO', className: demoBadge };
  }

  if (mode === 'preview') {
    return { label: 'PREVIEW', className: previewBadge };
  }

  return null;
};

export const getBrandIcon = (mode: string) => (mode === 'preview' ? previewIcon : productionIcon);
