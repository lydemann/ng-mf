import { newSpecPage } from '@stencil/core/testing';
import { Button } from './button';

describe('ui-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton).toBeTruthy();
    expect(slButton.textContent.trim()).toBe('Button');
    expect(slButton.getAttribute('variant')).toBe('primary');
    expect(slButton.getAttribute('size')).toBe('medium');
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button text="Custom Text"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.textContent.trim()).toBe('Custom Text');
  });

  it('renders with different types', async () => {
    const types = ['primary', 'secondary', 'destructive'];
    
    for (const type of types) {
      const page = await newSpecPage({
        components: [Button],
        html: `<ui-button type="${type}"></ui-button>`,
      });

      const slButton = page.root.shadowRoot.querySelector('sl-button');
      if (type === 'destructive') {
        expect(slButton.getAttribute('variant')).toBe('danger');
      } else if (type === 'primary') {
        expect(slButton.getAttribute('variant')).toBe('primary');
      } else {
        expect(slButton.getAttribute('variant')).toBe('default');
      }
    }
  });

  it('renders with different sizes', async () => {
    const sizes = ['small', 'medium', 'large'];
    
    for (const size of sizes) {
      const page = await newSpecPage({
        components: [Button],
        html: `<ui-button size="${size}"></ui-button>`,
      });

      const slButton = page.root.shadowRoot.querySelector('sl-button');
      expect(slButton.getAttribute('size')).toBe(size);
    }
  });

  it('renders with different variants', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button variant="outlined"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('outline')).toBe('');

    const page2 = await newSpecPage({
      components: [Button],
      html: '<ui-button variant="ghost"></ui-button>',
    });

    const slButton2 = page2.root.shadowRoot.querySelector('sl-button');
    expect(slButton2.getAttribute('variant')).toBe('text');
  });

  it('renders with icon', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button icon="gear" text="Button with Icon"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    const icon = slButton.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('name')).toBe('gear');
    expect(icon.getAttribute('slot')).toBe('prefix');
  });

  it('renders icon-only button when circle is true', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button icon="gear" circle="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('circle')).toBe('');
    expect(slButton.textContent.trim()).toBe('');
  });

  it('renders disabled state', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button disabled="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('disabled')).toBe('');
  });

  it('renders loading state', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button loading="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('loading')).toBe('');
  });

  it('renders destructive variant', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button destructive="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('variant')).toBe('danger');
  });

  it('renders full width', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button full-width="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.style.width).toBe('100%');
  });

  it('renders pill shape', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button pill="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('pill')).toBe('');
  });

  it('renders with caret', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button caret="true"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('caret')).toBe('');
  });

  it('renders as link when href is provided', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button href="https://example.com" target="_blank"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('href')).toBe('https://example.com');
    expect(slButton.getAttribute('target')).toBe('_blank');
  });

  it('renders as submit button', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button button-type="submit"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('type')).toBe('submit');
  });

  it('applies custom min-width', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button min-width="100px"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.style.minWidth).toBe('100px');
  });

  it('maps form properties correctly', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button form="myForm" form-action="/submit" form-method="post"></ui-button>',
    });

    const slButton = page.root.shadowRoot.querySelector('sl-button');
    expect(slButton.getAttribute('form')).toBe('myForm');
    expect(slButton.getAttribute('formaction')).toBe('/submit');
    expect(slButton.getAttribute('formmethod')).toBe('post');
  });
}); 