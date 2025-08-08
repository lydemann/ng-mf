/* eslint-disable @nx/enforce-module-boundaries */
// Imports the Storybook's configuration and options API
import type { StorybookConfig, Options } from '@storybook/core-common';
import type { Configuration } from 'webpack';
import { resolve } from 'path';
import rootMain from '../../../../.storybook/main';

/**
 * @see https://github.com/storybookjs/storybook/blob/main/docs/configure/overview.md#using-storybook-api
 * @see https://github.com/storybookjs/storybook/blob/main/lib/client-logger/src/index.ts
 */
export default {
  ...rootMain,
  stories: [
    ...rootMain.stories,
    '../src/**/*.stories.mdx',
    '../src/**/*.stories.@(js|jsx|ts|tsx)',
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
    // apply any global webpack configs that might have been specified in .storybook/main.ts
    if (rootMain.webpackFinal) {
      config = await rootMain.webpackFinal(config, options);
    }

    // Add path resolution for TypeScript aliases
    config.resolve = config.resolve || {};
    config.resolve.alias = {
      ...config.resolve.alias,
      '@ng-mf/shared-ui/loader': resolve(__dirname, '../../../../dist/libs/shared/ui/loader/index.js'),
    };

    // Ensure TypeScript files are properly handled
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // Add TypeScript loader if not already present
    const hasTypeScriptRule = config.module.rules.some(rule => 
      rule && typeof rule === 'object' && 'test' in rule && rule.test && rule.test.toString().includes('ts')
    );
    
    if (!hasTypeScriptRule) {
      config.module.rules.push({
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              configFile: resolve(__dirname, 'tsconfig.json'),
            },
          },
        ],
        exclude: /node_modules/,
      });
    }

    // add your own webpack tweaks if needed
    return config;
  },
} as StorybookConfig;
