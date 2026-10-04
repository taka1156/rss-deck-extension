import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AddFeedDialog } from '@/components/features/AddFeedDialog/AddFeedDialog.js';
import { ArticlePane } from '@/components/features/ArticlePane/ArticlePane.js';
import { CopyrightFooter } from '@/components/features/CopyrightFooter/CopyrightFooter';
import { DashboardHeader } from '@/components/features/DashboardHeader/DashboardHeader.js';
import { FeedBoard } from '@/components/features/FeedBoard/FeedBoard.js';
import { SettingsDialog } from '@/components/features/SettingsDialog/SettingsDialog.js';
import { ShortcutSection } from '@/components/features/ShortcutSection/ShortcutSection.js';
import { useDashboardHydration } from '@/hooks/useDashboardHydration.js';
import { useDashboardPersistence } from '@/hooks/useDashboardPersistence.js';
import { useFeedActions } from '@/hooks/useFeedActions.js';
import { useFeedRefresh } from '@/hooks/useFeedRefresh.js';
import { useGroupActions } from '@/hooks/useGroupActions.js';
import { useShortcutActions } from '@/hooks/useShortcutActions.js';
import { saveDashboardState, saveShortcuts } from '@/storage/feedDashboard';
import { getDemoSettings } from '@/utils/demoSettings';
import { requestHostAccess } from '@/utils/hostPermission';

export default function Feed() {
  const { t, i18n } = useTranslation();
  const demoMode = new URLSearchParams(window.location.search).get('demo') === '1';
  const feedState = useFeedActions();
  const groupState = useGroupActions();
  const shortcutState = useShortcutActions();
  const [sideOpen, setSideOpen] = useState(true);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);
  const [article, setArticle] = useState({ title: '', url: '' });
  const [audio, setAudio] = useState({ label: '', url: '' });
  const demoState = useMemo(
    () => (demoMode ? getDemoSettings(i18n.language) : undefined),
    [demoMode, i18n.language],
  );
  const dashboardState = {
    feeds: feedState.feeds,
    groups: groupState.groups,
    shortcuts: shortcutState.shortcuts,
    sideOpen,
  };

  const persistence = useDashboardPersistence(
    feedState.feeds,
    groupState.groups,
    shortcutState.shortcuts,
    setSideOpen,
  );

  useDashboardHydration(
    setSideOpen,
    groupState.loadGroups,
    shortcutState.loadShortcuts,
    feedState.setFeeds,
    demoState,
  );

  const persistDashboardState = useCallback(
    async (feeds: typeof feedState.feeds, groups: typeof groupState.groups) => {
      if (!demoMode) await saveDashboardState(feeds, groups);
    },
    [demoMode],
  );
  const persistShortcuts = useCallback(
    async (shortcuts: typeof shortcutState.shortcuts) => {
      if (!demoMode) await saveShortcuts(shortcuts);
    },
    [demoMode],
  );

  const updateFeed = useCallback(
    async (url: string, patch: Partial<(typeof feedState.feeds)[number]>) => {
      const result = feedState.updateFeed(url, patch);
      if (result.ok) {
        await persistDashboardState(result.nextFeeds, groupState.groups);
      }
      return result;
    },
    [feedState.updateFeed, groupState.groups, persistDashboardState],
  );
  const feedRefresh = useFeedRefresh(feedState.feeds, updateFeed);

  const addFeed = useCallback(
    async (url: string) => {
      if (!(await requestHostAccess([url]))) return { ok: false as const, reason: 'denied' };
      const result = feedState.addFeed(url);
      if (result.ok) {
        await persistDashboardState(result.nextFeeds, groupState.groups);
      }
      return result;
    },
    [feedState, groupState.groups, persistDashboardState],
  );

  const addShortcut = useCallback(
    async (url: string) => {
      const result = shortcutState.addShortcut(url);
      if (result.ok) {
        await persistShortcuts(result.nextShortcuts);
      }
      return result;
    },
    [persistShortcuts, shortcutState],
  );

  const addGroup = useCallback(
    async (title?: string) => {
      const result = groupState.addGroup(title);
      if (result.ok) {
        await persistDashboardState(feedState.feeds, result.nextGroups);
      }
      return result;
    },
    [feedState.feeds, groupState, persistDashboardState],
  );

  return (
    <>
      <DashboardHeader
        demoMode={demoMode}
        sideOpen={sideOpen}
        onOpenAddPanel={() => setAddDialogOpen(true)}
        onOpenSettingsPanel={() => setSettingsDialogOpen(true)}
        onAddGroup={addGroup}
        onRefresh={() => {
          void requestHostAccess(feedState.feeds.map((feed) => feed.url)).then(() =>
            feedRefresh.refreshAll(),
          );
        }}
        onSideOpenChange={(checked) => {
          void persistence.persistFlags(checked);
        }}
      />
      <AddFeedDialog
        open={addDialogOpen}
        onOpenChange={setAddDialogOpen}
        onSubmitFeed={async (url) => {
          const result = await addFeed(url);
          return result.ok;
        }}
        onSubmitShortcut={async (url) => {
          const result = await addShortcut(url);
          return result.ok;
        }}
      />
      <SettingsDialog
        open={settingsDialogOpen}
        onOpenChange={setSettingsDialogOpen}
        persist={!demoMode}
        state={dashboardState}
        onImport={async (nextState) => {
          if (!demoMode) await requestHostAccess(nextState.feeds.map((feed) => feed.url));
          feedState.setFeeds(nextState.feeds);
          groupState.loadGroups(nextState.groups);
          shortcutState.loadShortcuts(nextState.shortcuts);
          setArticle({ title: '', url: '' });
          setSideOpen(nextState.sideOpen);
          void persistence.persistFlags(nextState.sideOpen);
        }}
      />
      <ShortcutSection
        shortcuts={shortcutState.shortcuts}
        onRemoveShortcut={(url) => {
          const result = shortcutState.removeShortcut(url);
          if (result.ok) {
            void persistShortcuts(result.nextShortcuts);
          }
        }}
      />
      <FeedBoard
        feeds={feedState.feeds}
        groups={groupState.groups}
        statusByUrl={feedRefresh.statusByUrl}
        itemsByUrl={feedRefresh.itemsByUrl}
        onOpenArticle={(title, url) => {
          if (!sideOpen) return false;
          void requestHostAccess([url]).then((granted) => {
            if (granted) setArticle({ title, url });
            else window.open(url, '_blank', 'noopener');
          });
          return true;
        }}
        onPlayAudio={(label, url) => setAudio({ label, url })}
        onGrantAccess={(url) => {
          void requestHostAccess([url]).then((granted) => {
            const target = feedState.feeds.find((feed) => feed.url === url);
            if (granted && target) void feedRefresh.refreshFeed(target);
          });
        }}
        onRemoveFeed={async (url) => {
          const result = feedState.removeFeed(url);
          if (result.ok) {
            await persistDashboardState(result.nextFeeds, groupState.groups);
          }
          return result;
        }}
        onUpdateFeed={(url, patch) => {
          const nextUrl = patch.url || url;
          if (nextUrl !== url) void requestHostAccess([nextUrl]);
          if (feedState.feeds.some((feed) => feed.url === nextUrl && feed.url !== url)) {
            window.alert(t('feed.duplicateUrl'));
            return false;
          }
          const result = feedState.updateFeed(url, { ...patch, url: nextUrl });
          void persistDashboardState(result.nextFeeds, groupState.groups);
          return true;
        }}
        onUpdateGroup={(groupId, patch) => {
          const result = groupState.updateGroup(groupId, patch);
          void persistDashboardState(feedState.feeds, result.nextGroups);
        }}
        onMoveFeed={async (url, group) => {
          const result = feedState.moveFeed(url, group);
          if (result.ok) {
            await persistDashboardState(result.nextFeeds, groupState.groups);
          }
          return result;
        }}
        onRemoveGroup={async (groupId) => {
          const result = groupState.removeGroup(groupId);
          if (result.ok) {
            const nextFeeds = feedState.feeds.map((feed) =>
              feed.group === groupId ? { ...feed, group: '' } : feed,
            );
            await persistDashboardState(nextFeeds, result.nextGroups);
          }
          return result;
        }}
        onToggleGroupCollapse={async (groupId) => {
          const result = groupState.toggleGroupCollapse(groupId);
          if (result.ok) {
            await persistDashboardState(feedState.feeds, result.nextGroups);
          }
          return result;
        }}
        onMoveGroup={async (fromId, toId) => {
          const result = groupState.moveGroup(fromId, toId);
          if (result.ok) {
            await persistDashboardState(feedState.feeds, result.nextGroups);
          }
          return result;
        }}
      />
      <ArticlePane
        title={article.title}
        url={sideOpen ? article.url : ''}
        audioLabel={audio.label}
        audioUrl={audio.url}
        onCloseArticle={() => setArticle({ title: '', url: '' })}
        onCloseAudio={() => setAudio({ label: '', url: '' })}
      />
      <CopyrightFooter />
    </>
  );
}
