import { newSpecPage } from '@stencil/core/testing';
import { Button } from './button';

describe('ui-button', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button).toBeTruthy();
    expect(button.getAttribute('variant')).toBe('primary');
    expect(button.getAttribute('size')).toBe('medium');
    expect(button.textContent.trim()).toBe('Button');
  });

  it('renders with custom text', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button text="Custom Text"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.textContent.trim()).toBe('Custom Text');
  });

  it('maps type prop correctly', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button type="secondary"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('variant')).toBe('default');
  });

  it('maps destructive type correctly', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button type="destructive"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('variant')).toBe('danger');
  });

  it('maps variant prop correctly', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button variant="outlined"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('outline')).toBe('true');
  });

  it('maps ghost variant correctly', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button variant="ghost"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('variant')).toBe('text');
  });

  it('applies size prop', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button size="large"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('size')).toBe('large');
  });

  it('applies disabled prop', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button disabled="true"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('disabled')).toBe('true');
  });

  it('applies pill prop', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button pill="true"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('pill')).toBe('true');
  });

  it('applies round prop', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button round="true"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('round')).toBe('true');
  });

  it('applies buttonType prop', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button button-type="submit"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('type')).toBe('submit');
  });

  it('applies form props', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button form="test-form" form-action="/submit" form-method="post"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('form')).toBe('test-form');
    expect(button.getAttribute('formaction')).toBe('/submit');
    expect(button.getAttribute('formmethod')).toBe('post');
  });

  it('applies custom styles for minWidth', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button min-width="200px"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.style.minWidth).toBe('200px');
  });

  it('applies custom styles for fullWidth', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button full-width="true"></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.style.width).toBe('100%');
  });

  it('renders prefix icon slot', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button><sl-icon slot="prefix" name="gear"></sl-icon></ui-button>',
    });

    const icon = page.root.querySelector('sl-icon[slot="prefix"]');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('name')).toBe('gear');
  });

  it('renders suffix icon slot', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button><sl-icon slot="suffix" name="arrow-right"></sl-icon></ui-button>',
    });

    const icon = page.root.querySelector('sl-icon[slot="suffix"]');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('name')).toBe('arrow-right');
  });

  it('renders both prefix and suffix icons', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: `
        <ui-button>
          <sl-icon slot="prefix" name="download"></sl-icon>
          <sl-icon slot="suffix" name="arrow-right"></sl-icon>
        </ui-button>
      `,
    });

    const prefixIcon = page.root.querySelector('sl-icon[slot="prefix"]');
    const suffixIcon = page.root.querySelector('sl-icon[slot="suffix"]');
    
    expect(prefixIcon).toBeTruthy();
    expect(suffixIcon).toBeTruthy();
    expect(prefixIcon.getAttribute('name')).toBe('download');
    expect(suffixIcon.getAttribute('name')).toBe('arrow-right');
  });

  it('renders round button with icon', async () => {
    const page = await newSpecPage({
      components: [Button],
      html: '<ui-button round="true"><sl-icon slot="prefix" name="gear"></sl-icon></ui-button>',
    });

    const button = page.root.querySelector('sl-button');
    expect(button.getAttribute('round')).toBe('true');
    
    const icon = page.root.querySelector('sl-icon[slot="prefix"]');
    expect(icon).toBeTruthy();
  });
}); 