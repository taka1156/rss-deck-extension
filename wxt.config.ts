import babel from '@rolldown/plugin-babel';
import { vanillaExtractPlugin } from '@vanilla-extract/vite-plugin';
import { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: ({ mode }) => {
    const isPreview = mode === 'preview';
    const dir = isPreview ? 'preview' : 'production';

    return {
      name: `RSS Decks ${mode === 'production' ? '' : '[Preview]'}`,
      version: '1.0.1',
      description: '複数のRSS/Atomフィードをブロック形式で一覧表示します',
      permissions: ['storage', 'alarms', 'declarativeNetRequest'],
      optional_host_permissions: ['http://*/*', 'https://*/*'],
      action: {
        default_title: 'RSS Decks を開く',
      },
      icons: {
        16: `icon/${dir}/16.png`,
        32: `icon/${dir}/32.png`,
        48: `icon/${dir}/48.png`,
        128: `icon/${dir}/128.png`,
      },
    };
  },
  srcDir: 'src',
  publicDir: 'src/public',
  alias: {
    '@': '/src',
  },
  dev: {
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  },
  webExt: {
    // Use devcontainer for development
    disabled: true,
  },
  vite: () => ({
    server: {
      host: '0.0.0.0',
      port: 3000,
      strictPort: true,
      hmr: {
        port: 3000,
      },
    },
    plugins: [
      vanillaExtractPlugin(),
      babel({
        presets: [reactCompilerPreset()],
      }),
    ],
  }),
  modules: ['@wxt-dev/module-react', '@wxt-dev/auto-icons'],
});
