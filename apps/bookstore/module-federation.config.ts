import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'bookstore',
  exposes: {
    './Routes': 'apps/bookstore/src/app/remote-entry/entry.routes.ts',
  },
  shared: () => {
    return {
      singleton: true,
      strictVersion: true,
    };
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
