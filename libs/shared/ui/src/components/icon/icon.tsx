import { Component, Prop, h } from '@stencil/core';

export type IconSize = 'small' | 'medium' | 'large' | 'x-large';
export type IconColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral' | null;

@Component({
  tag: 'ui-icon',
  styleUrl: 'icon.scss',
  shadow: true,
})
export class Icon {

  /**
   * The name of the icon to display (Phosphor icon name)
   */
  @Prop() name: string;

  /**
   * The size of the icon
   */
  @Prop() size: IconSize = 'medium';

  /**
   * The color of the icon
   */
  @Prop() color: IconColor = null;

  /**
   * The label for accessibility (aria-label)
   */
  @Prop() label: string;

  /**
   * Whether the icon is decorative (no aria-label needed)
   */
  @Prop() decorative = false;

  /**
   * Custom CSS class to apply
   */
  @Prop() class: string;

  /**
   * Whether the icon should be clickable
   */
  @Prop() clickable = false;

  /**
   * Whether the icon should have a hover effect
   */
  @Prop() hoverable = false;

  /**
   * Whether the icon should be spinning
   */
  @Prop() spinning = false;

  /**
   * Whether the icon should be flipped horizontally
   */
  @Prop() flipHorizontal = false;

  /**
   * Whether the icon should be flipped vertically
   */
  @Prop() flipVertical = false;

  /**
   * Whether the icon should be rotated
   */
  @Prop() rotate: 0 | 90 | 180 | 270 = 0;

  /**
   * The type/weight of the Phosphor icon (regular, bold, fill, duotone, light, thin)
   */
  @Prop() type: 'regular' | 'bold' | 'fill' | 'duotone' | 'light' | 'thin' = 'regular';

  /**
   * Get icon styles based on our design system props
   */
  private getIconStyles() {
    const styles: any = {};

    // Size mapping
    const sizeMap = {
      'small': '1rem',
      'medium': '1.25rem',
      'large': '1.5rem',
      'x-large': '2rem',
    };

    if (this.size) {
      styles.fontSize = sizeMap[this.size];
    }

    // Color mapping
    const colorMap = {
      'primary': 'var(--sl-color-primary-600)',
      'secondary': 'var(--sl-color-neutral-600)',
      'success': 'var(--sl-color-success-600)',
      'warning': 'var(--sl-color-warning-600)',
      'danger': 'var(--sl-color-danger-600)',
      'neutral': 'var(--sl-color-neutral-600)',
    };

    if (this.color) {
      styles.color = colorMap[this.color];
    }

    // Transform properties
    const transforms = [];
    
    if (this.flipHorizontal) {
      transforms.push('scaleX(-1)');
    }
    
    if (this.flipVertical) {
      transforms.push('scaleY(-1)');
    }
    
    if (this.rotate !== 0) {
      transforms.push(`rotate(${this.rotate}deg)`);
    }

    if (transforms.length > 0) {
      styles.transform = transforms.join(' ');
    }

    // Cursor and pointer events for clickable icons
    if (this.clickable) {
      styles.cursor = 'pointer';
      styles.pointerEvents = 'auto';
    } else {
      styles.pointerEvents = 'none';
    }

    return styles;
  }

  /**
   * Get CSS classes for the icon
   */
  private getIconClasses() {
    const classes = ['ui-icon'];

    if (this.clickable) {
      classes.push('ui-icon--clickable');
    }

    if (this.hoverable) {
      classes.push('ui-icon--hoverable');
    }

    if (this.spinning) {
      classes.push('ui-icon--spinning');
    }

    if (this.color) {
      classes.push(`ui-icon--color-${this.color}`);
    }

    if (this.size) {
      classes.push(`ui-icon--size-${this.size}`);
    }

    return classes.join(' ');
  }

  /**
   * Get the Phosphor icon class name
   */
  private getPhosphorIconClass() {
    if (!this.name) return '';
    
    // Phosphor icons use kebab-case, so we keep the name as is
    const iconName = this.name;
    
    // For different weights, we need to import the specific CSS or use different class names
    // For now, we'll use the regular weight and handle other weights through CSS
    const weightClass = this.type !== 'regular' ? `-${this.type}` : '';
    
    return `ph ph-${iconName}${weightClass}`;
  }

  render() {
    const iconStyles = this.getIconStyles();
    const iconClasses = this.getIconClasses();
    const phosphorIconClass = this.getPhosphorIconClass();

    return (
      <i 
        class={`${iconClasses} ${phosphorIconClass}`}
        style={iconStyles}
        aria-label={this.decorative ? undefined : this.label}
        role={this.decorative ? 'presentation' : undefined}
      />
    );
  }
}
