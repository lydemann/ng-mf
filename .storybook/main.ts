import type { StorybookConfig } from '@storybook/core-common';

export default {
  stories: [
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  core: {
    builder: {
      name: 'webpack5',
      options: {
        fsCache: false,
        lazyCompilation: false,
      },
    },
  },
  framework: '@storybook/web-components-vite',
  logLevel: 'warn',
  features: {
    babelModeV7: true,
    storyStoreV7: true,
    postcss: true,
  },
} as StorybookConfig;
