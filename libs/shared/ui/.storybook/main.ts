/* eslint-disable @nx/enforce-module-boundaries */
// Imports the Storybook's configuration and options API
import type { StorybookConfig } from '@storybook/web-components-vite';
import { resolve } from 'path';
import rootMain from '../../../../.storybook/main';

/**
 * @see https://github.com/storybookjs/storybook/blob/main/docs/configure/overview.md#using-storybook-api
 * @see https://github.com/storybookjs/storybook/blob/main/lib/client-logger/src/index.ts
 */
export default {
  ...rootMain,
  stories: [
    ...(Array.isArray(rootMain.stories) ? rootMain.stories : []),
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
  ],

  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },

  logLevel: 'warn',
  features: {
    storyStoreV7: true,
  },

  viteFinal: async (config) => {
    // Add path resolution for TypeScript aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ng-mf/shared-ui/loader': resolve(__dirname, '../../../../dist/libs/shared/ui/loader/index.js'),
    };

    // Add Phosphor Icons CSS
    if (!config.css) {
      config.css = {};
    }
    if (!config.css.preprocessorOptions) {
      config.css.preprocessorOptions = {};
    }

    // Add Phosphor Icons CSS import
    if (!config.define) {
      config.define = {};
    }

    // Add CSS import to the HTML head
    if (!config.plugins) {
      config.plugins = [];
    }

    return config;
  },
} as StorybookConfig;
