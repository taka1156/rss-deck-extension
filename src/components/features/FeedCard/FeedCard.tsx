import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FeedItemRow } from '@/components/features/FeedItemRow/FeedItemRow';
import { BaseButton } from '@/components/shared/BaseButton/BaseButton';
import { BaseHeading } from '@/components/shared/BaseHeading/BaseHeading';
import { BaseList } from '@/components/shared/BaseList/BaseList';
import { BaseText } from '@/components/shared/BaseText/BaseText';
import { useCardDragState } from '@/hooks/useCardDragState';
import { useColorPreview } from '@/hooks/useColorPreview';
import { useEditState } from '@/hooks/useEditState';
import type { Feed } from '@/storage/feedDashboard';
import type { FeedItem } from '@/utils/feedParser';
import { EditForm, type EditValues } from '../EditForm/EditForm';
import {
  actions,
  block,
  blockHead,
  dragging,
  errorStatus,
  handle,
  itemList,
  removeIcon,
  status,
  title,
} from './FeedCard.css';

type FeedCardProps = {
  feed: Feed;
  groupId?: string;
  status?: { loading?: boolean; error?: string | null; needsPermission?: boolean };
  items?: FeedItem[];
  onOpenArticle: (title: string, url: string) => boolean;
  onPlayAudio: (title: string, url: string) => void;
  onGrantAccess: (url: string) => void;
  onRemove: (url: string) => void;
  onUpdate: (url: string, patch: EditValues) => boolean;
  onDragStart: (event: React.DragEvent<HTMLElement>, feed: Feed) => void;
  onDrop: (event: React.DragEvent<HTMLElement>, groupId: string) => void;
};

export function FeedCard({
  feed,
  groupId = '',
  status: feedStatus,
  items = [],
  onOpenArticle,
  onPlayAudio,
  onGrantAccess,
  onRemove,
  onUpdate,
  onDragStart,
  onDrop,
}: FeedCardProps) {
  const { t } = useTranslation();
  const { editing, setEditing } = useEditState();
  const { dragReady, setDragReady, isDragging, setIsDragging } = useCardDragState();
  const { finalColor: borderColor, setPreviewColor, resetPreview } = useColorPreview(feed.color);
  const [openArticleUrl, setOpenArticleUrl] = useState<string>('');
  const [playingAudioUrl, setPlayingAudioUrl] = useState<string>('');

  const closeEdit = () => {
    setEditing(false);
    resetPreview();
  };
  const handleOpenArticle = (title: string, url: string) => {
    setOpenArticleUrl(url);
    return onOpenArticle(title, url);
  };
  const handlePlayAudio = (title: string, url: string) => {
    setPlayingAudioUrl(playingAudioUrl === url ? '' : url);
    onPlayAudio(title, url);
  };
  const statusText = feedStatus?.loading ? t('feed.loading') : (feedStatus?.error ?? '');

  return (
    <li
      className={clsx(block, isDragging && dragging)}
      style={borderColor ? { borderColor } : undefined}
      draggable={dragReady}
      onDragStart={(event) => {
        if (!dragReady) return;
        event.stopPropagation();
        setIsDragging(true);
        onDragStart(event, feed);
      }}
      onDragEnd={() => {
        setIsDragging(false);
        setDragReady(false);
      }}
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        event.stopPropagation();
        onDrop(event, groupId);
      }}
    >
      <div className={blockHead}>
        {/* biome-ignore lint/a11y/noStaticElementInteractions: pointer-only drag handle */}
        <span
          className={handle}
          title={t('feed.dragToMove')}
          onMouseDown={() => setDragReady(true)}
          onMouseUp={() => setDragReady(false)}
        >
          ⠿
        </span>
        <BaseHeading hLv="2" className={title}>
          <BaseText as="span" truncate>
            {feed.title || feed.url}
          </BaseText>
          <BaseText as="small" color="muted" size="tiny" weight="regular" truncate>
            {feed.url}
          </BaseText>
        </BaseHeading>
        <div className={actions}>
          <BaseButton
            variant="ghost"
            title={t('common.edit')}
            onClick={() => (editing ? closeEdit() : setEditing(true))}
          >
            ✎
          </BaseButton>
          <BaseButton
            variant="ghost"
            className={removeIcon}
            title={t('common.delete')}
            onClick={() => onRemove(feed.url)}
          >
            ×
          </BaseButton>
        </div>
      </div>
      {editing && (
        <EditForm
          titleLabel={t('feed.titleLabel')}
          titlePlaceholder={t('feed.titlePlaceholder')}
          showUrl
          initial={{ title: feed.title, url: feed.url, color: feed.color }}
          onColorPreview={setPreviewColor}
          onCancel={closeEdit}
          onSubmit={(values) => {
            if (onUpdate(feed.url, values)) closeEdit();
          }}
        />
      )}
      {statusText && (
        <div className={clsx(status, feedStatus?.error && errorStatus)}>
          {statusText}
          {feedStatus?.needsPermission && (
            <BaseButton onClick={() => onGrantAccess(feed.url)}>{t('feed.grantAccess')}</BaseButton>
          )}
        </div>
      )}
      {items.length > 0 && (
        <BaseList className={itemList}>
          {items.map((item) => (
            <FeedItemRow
              key={item.link || `${item.title}-${item.date}`}
              item={item}
              isArticleOpen={!!item.link && openArticleUrl === item.link}
              isAudioPlaying={playingAudioUrl === item.audio}
              onOpenArticle={handleOpenArticle}
              onPlayAudio={handlePlayAudio}
            />
          ))}
        </BaseList>
      )}
    </li>
  );
}
