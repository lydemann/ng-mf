import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { defineCustomElements } from '@ng-mf/shared-ui/loader';
import { setBasePath } from '@shoelace-style/shoelace';

// Define our custom elements
defineCustomElements();

// Set Shoelace base path for icons
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/dist/');

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
