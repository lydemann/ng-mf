import type { StorybookConfig } from '@storybook/web-components-vite';

export default {
  stories: [
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  logLevel: 'warn',
  features: {
    storyStoreV7: true,
  },
} as StorybookConfig;
