import type { StorybookConfig, Options } from '@storybook/core-common';
import type { Configuration } from 'webpack';

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
  webpackFinal: async (config: Configuration, options: Options) => {
    return config;
  },
} as StorybookConfig;
