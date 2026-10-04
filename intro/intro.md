# Chrome Web Store Review Information

## Detailed description

RSS Decks brings RSS and Atom feeds together in a single dashboard. It displays up to 15 recent items per feed as movable blocks, and lets users group, reorder, rename, and color-code their feeds. Users can open an article in an in-extension side pane or in a new tab, and play audio enclosures when a feed item provides one. The built-in demo includes a three-second sine-tone test clip for checking audio playback; it contains no voice or narration. Website shortcuts, thumbnail and side-pane preferences, Japanese and English interface languages, and JSON settings import and export are also included. New feeds are fetched when added, and users can fetch updates with the Refresh button.

If no feeds have been saved, the dashboard starts with sample feeds from Zenn, Qiita, and Yahoo! News. Feed data and preferences are stored in Chrome Sync storage.

## Single purpose

The extension's single purpose is to help users collect, organize, and read RSS/Atom updates in one dashboard. Feed blocks, groups, article viewing, audio playback, website shortcuts, and settings are all provided to support that feed-reading workflow.

## Permission justifications

- **`storage`** — Saves the user's feed URLs and display settings, groups, website shortcuts, and article-pane preference in Chrome Sync storage so they are available when the extension is reopened and can sync through Chrome.
- **`alarms`** — Registers a recurring four-hour alarm in the background. In the current version, feed requests are initiated when a feed is added or the user selects **Refresh**; the alarm does not itself fetch feeds.
- **`declarativeNetRequest`** — Allows an article to be shown in the extension's side pane when its website blocks framing. The rule removes `X-Frame-Options` and `Content-Security-Policy` response headers only for subframes initiated by RSS Decks; it does not modify pages opened outside the extension.
- **Optional host access (`http://*/*`, `https://*/*`)** — Host access is not granted at installation. RSS Decks requests access to the specific HTTP or HTTPS origins needed for a user-added or imported feed, a feed refresh, or an article opened in the side pane. Feed-origin access is needed to retrieve the RSS/Atom document; article-origin access is needed to load the selected page in the side pane. Chrome asks the user to grant access, and denying access does not grant the extension access to that origin.

## Reviewer test instructions

No account or sign-in is required. There are no test credentials.

1. Install RSS Decks from the Chrome Web Store and select its toolbar icon.
2. To inspect the interface without relying on a third-party feed, click the RSS Decks logo ten times. Dismiss the alert shown after the fifth click. The built-in demo shows sample feeds, groups, articles, and images without changing the user's saved settings or requesting website access. Click the logo again while **DEMO** is visible to return to the regular dashboard.
3. To test feed and host access, select **Add**, enter `https://zenn.dev/feed`, and submit. Grant Chrome's origin permission when prompted. The feed should appear as a block and load its items. Select **Refresh** to fetch it again.
4. Select a feed item to open its article in the side pane. If the article is on an origin not yet permitted, grant the requested origin when Chrome prompts. Use the pane's open-in-new-tab button to check the alternate viewing option.
5. Add a group and a website shortcut, move a feed into the group, and use **Settings** to export and re-import the JSON settings. These actions require no sign-in.
6. To check audio playback, open the **Pocket Observatory** feed in DEMO mode and select the play button on the first item, **"[TEST TONE] A brighter dot on the evening horizon."** A three-second sine tone will play. It contains no voice, narration, or podcast content.

If access to external websites is unavailable, the built-in demo in step 2 can still be used to inspect the dashboard and article pane.