import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map.js';
import { defineCustomElements } from '@ng-mf/shared-ui/loader';
import { setBasePath, registerIconLibrary } from '@shoelace-style/shoelace';

// Define our custom elements
defineCustomElements();

// Set Shoelace base path for icons
setBasePath('https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.8.0/dist/');

// Register Phosphor Icons as a custom icon library
registerIconLibrary('phosphor', {
  resolver: (name) => {
    // Convert kebab-case to PascalCase for Phosphor icon names
    const iconName = name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
    
    return `ph-${iconName}`;
  },
  mutator: (svg) => {
    // Add Phosphor Icons CSS classes
    svg.classList.add('ph');
    return svg;
  }
});

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
