import { newSpecPage } from '@stencil/core/testing';
import { Icon } from './icon';

describe('Icon', () => {
  it('renders with default props', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="gear"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('name')).toBe('gear');
  });

  it('renders with custom size', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="heart" size="large"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.fontSize).toBe('1.5rem');
  });

  it('renders with custom color', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="star" color="warning"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.color).toBe('var(--sl-color-warning-600)');
  });

  it('renders with label for accessibility', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="info" label="Information icon"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('label')).toBe('Information icon');
  });

  it('renders as decorative when specified', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="chevron-right" decorative></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.getAttribute('label')).toBeNull();
  });

  it('renders as clickable', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="heart" clickable></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.cursor).toBe('pointer');
    expect(icon.style.pointerEvents).toBe('auto');
  });

  it('renders as hoverable', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="star" hoverable></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('ui-icon--hoverable')).toBe(true);
  });

  it('renders as spinning', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="gear" spinning></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('ui-icon--spinning')).toBe(true);
  });

  it('renders with horizontal flip', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="arrow-right" flip-horizontal></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.transform).toContain('scaleX(-1)');
  });

  it('renders with vertical flip', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="arrow-down" flip-vertical></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.transform).toContain('scaleY(-1)');
  });

  it('renders with rotation', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="arrow-right" rotate="90"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.transform).toContain('rotate(90deg)');
  });

  it('renders with multiple transformations', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="arrow-right" flip-horizontal rotate="180"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.style.transform).toContain('scaleX(-1)');
    expect(icon.style.transform).toContain('rotate(180deg)');
  });

  it('renders with custom CSS class', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="gear" class="custom-class"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('custom-class')).toBe(true);
  });

  it('applies correct size classes', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="gear" size="x-large"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('ui-icon--size-x-large')).toBe(true);
  });

  it('applies correct color classes', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="heart" color="danger"></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('ui-icon--color-danger')).toBe(true);
  });

  it('handles all size variants', async () => {
    const sizes = ['small', 'medium', 'large', 'x-large'];
    
    for (const size of sizes) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ui-icon name="gear" size="${size}"></ui-icon>`,
      });

      const icon = page.root.querySelector('sl-icon');
      expect(icon).toBeTruthy();
      expect(icon.classList.contains(`ui-icon--size-${size}`)).toBe(true);
    }
  });

  it('handles all color variants', async () => {
    const colors = ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'];
    
    for (const color of colors) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ui-icon name="gear" color="${color}"></ui-icon>`,
      });

      const icon = page.root.querySelector('sl-icon');
      expect(icon).toBeTruthy();
      expect(icon.classList.contains(`ui-icon--color-${color}`)).toBe(true);
    }
  });

  it('handles all rotation values', async () => {
    const rotations = [0, 90, 180, 270];
    
    for (const rotation of rotations) {
      const page = await newSpecPage({
        components: [Icon],
        html: `<ui-icon name="gear" rotate="${rotation}"></ui-icon>`,
      });

      const icon = page.root.querySelector('sl-icon');
      expect(icon).toBeTruthy();
      
      if (rotation !== 0) {
        expect(icon.style.transform).toContain(`rotate(${rotation}deg)`);
      } else {
        expect(icon.style.transform).toBe('');
      }
    }
  });

  it('combines multiple boolean props correctly', async () => {
    const page = await newSpecPage({
      components: [Icon],
      html: '<ui-icon name="gear" clickable hoverable spinning></ui-icon>',
    });

    const icon = page.root.querySelector('sl-icon');
    expect(icon).toBeTruthy();
    expect(icon.classList.contains('ui-icon--clickable')).toBe(true);
    expect(icon.classList.contains('ui-icon--hoverable')).toBe(true);
    expect(icon.classList.contains('ui-icon--spinning')).toBe(true);
    expect(icon.style.cursor).toBe('pointer');
    expect(icon.style.pointerEvents).toBe('auto');
  });
});
