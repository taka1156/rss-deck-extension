import type { DashboardState } from '@/storage/feedDashboard';

const settings: Record<'en' | 'ja', DashboardState> = {
  en: {
    feeds: [
      {
        url: 'mock://en/briefing',
        title: 'Pocket Observatory',
        color: '#eb2455',
        group: 'demo-briefing',
      },
      {
        url: 'mock://en/field-notes',
        title: 'Field Notes for Curious Minds',
        color: '#2766ec',
        group: 'demo-field-notes',
      },
      {
        url: 'mock://en/studio',
        title: 'The Little Idea Studio',
        color: '#8a2be2',
        group: 'demo-studio',
      },
    ],
    groups: [
      { id: 'demo-briefing', title: 'Briefing', color: '#eb2455', collapsed: false },
      { id: 'demo-field-notes', title: 'Field Notes', color: '#2766ec', collapsed: false },
      { id: 'demo-studio', title: 'Studio', color: '#8a2be2', collapsed: true },
    ],
    shortcuts: [
      { url: 'https://example.com/sky' },
      { url: 'https://example.com/field-notes' },
      { url: 'https://example.com/studio' },
    ],
    sideOpen: true,
  },
  ja: {
    feeds: [
      {
        url: 'mock://ja/briefing',
        title: '小さな星空便り',
        color: '#eb2455',
        group: 'demo-briefing',
      },
      {
        url: 'mock://ja/field-notes',
        title: '好奇心の観察ノート',
        color: '#2766ec',
        group: 'demo-field-notes',
      },
      {
        url: 'mock://ja/studio',
        title: 'よりみちアイデア室',
        color: '#8a2be2',
        group: 'demo-studio',
      },
    ],
    groups: [
      { id: 'demo-briefing', title: '星空便り', color: '#eb2455', collapsed: false },
      { id: 'demo-field-notes', title: '観察ノート', color: '#2766ec', collapsed: false },
      { id: 'demo-studio', title: 'アイデア室', color: '#8a2be2', collapsed: true },
    ],
    shortcuts: [
      { url: 'https://example.com/hoshizora' },
      { url: 'https://example.com/kansatsu' },
      { url: 'https://example.com/yorimichi' },
    ],
    sideOpen: true,
  },
};

export function getDemoSettings(language: string): DashboardState {
  const locale = language.startsWith('ja') ? 'ja' : 'en';
  const state = settings[locale];
  return {
    ...state,
    feeds: state.feeds.map((feed) => ({ ...feed })),
    groups: state.groups.map((group) => ({ ...group })),
    shortcuts: state.shortcuts.map((shortcut) => ({ ...shortcut })),
  };
}
