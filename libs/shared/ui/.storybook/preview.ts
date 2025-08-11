import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { defineCustomElements } from '@ng-mf/shared-ui/loader';

// Import Shoelace components from local installation
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

// Define our custom elements
defineCustomElements();

const withThemeProvider = (storyFn, context) => {
  const cssClasses = { centered: context.parameters.layout === 'centered' };

  return html`
    <div class="bq-root ${classMap(cssClasses)}">${storyFn()}</div>
  `;
};
export const decorators = [withThemeProvider];

// Global parameters
export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
