import { Component, Prop, h, Element } from '@stencil/core';
import '@shoelace-style/shoelace/dist/components/button/button.js';

export type ButtonType = 'primary' | 'secondary' | 'destructive';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonVariant = 'filled' | 'outlined' | 'ghost';

@Component({
  tag: 'ui-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {
  @Element() el: HTMLElement;

  /**
   * The type of button (primary, secondary, destructive)
   */
  @Prop() type: ButtonType = 'primary';

  /**
   * The size of the button (small, medium, large)
   */
  @Prop() size: ButtonSize = 'medium';

  /**
   * The variant of the button (filled, outlined, ghost)
   */
  @Prop() variant: ButtonVariant = 'filled';

  /**
   * The icon to display (SVG path or icon name)
   */
  @Prop() icon: string;

  /**
   * The text content of the button
   */
  @Prop() text = 'Button';

  /**
   * Whether the button is destructive (red variant)
   */
  @Prop() destructive = false;

  /**
   * Whether the button is disabled
   */
  @Prop() disabled = false;

  /**
   * Whether the button is in loading state
   */
  @Prop() loading = false;

  /**
   * Minimum width for the button
   */
  @Prop() minWidth: string;

  /**
   * Whether the button should be full width
   */
  @Prop() fullWidth = false;

  /**
   * Whether the button should be pill-shaped
   */
  @Prop() pill = false;

  /**
   * The button type for form submission
   */
  @Prop() buttonType: 'button' | 'submit' | 'reset' = 'button';

  /**
   * Whether the button should be circular (for icon-only buttons)
   */
  @Prop() circle = false;

  /**
   * Whether the button should have a caret
   */
  @Prop() caret = false;

  /**
   * Link URL (renders as anchor when provided)
   */
  @Prop() href: string;

  /**
   * Target for link buttons
   */
  @Prop() target: '_blank' | '_parent' | '_self' | '_top';

  /**
   * Download attribute for link buttons
   */
  @Prop() download: string;

  /**
   * Rel attribute for link buttons
   */
  @Prop() rel: string;

  /**
   * Form ID to associate with
   */
  @Prop() form: string;

  /**
   * Form action override
   */
  @Prop() formAction: string;

  /**
   * Form method override
   */
  @Prop() formMethod: 'post' | 'get';

  /**
   * Form encoding type override
   */
  @Prop() formEnctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';

  /**
   * Form no validate override
   */
  @Prop() formNoValidate = false;

  /**
   * Form target override
   */
  @Prop() formTarget: '_self' | '_blank' | '_parent' | '_top' | string;

  /**
   * Button name for form submission
   */
  @Prop() name: string;

  /**
   * Button value for form submission
   */
  @Prop() value: string;

  /**
   * Map our design system props to Shoelace props
   */
  private getShoelaceProps() {
    const props: any = {
      size: this.size,
      disabled: this.disabled,
      loading: this.loading,
      pill: this.pill,
      circle: this.circle,
      caret: this.caret,
      type: this.buttonType,
    };

    // Map variant and type to Shoelace variant
    if (this.destructive) {
      props.variant = 'danger';
    } else if (this.type === 'primary') {
      props.variant = 'primary';
    } else if (this.type === 'secondary') {
      props.variant = 'default';
    } else {
      props.variant = 'default';
    }

    // Map our variant to Shoelace outline
    if (this.variant === 'outlined') {
      props.outline = true;
    } else if (this.variant === 'ghost') {
      props.variant = 'text';
    }

    // Add link properties if href is provided
    if (this.href) {
      props.href = this.href;
      if (this.target) props.target = this.target;
      if (this.download) props.download = this.download;
      if (this.rel) props.rel = this.rel;
    }

    // Add form properties
    if (this.form) props.form = this.form;
    if (this.formAction) props.formAction = this.formAction;
    if (this.formMethod) props.formMethod = this.formMethod;
    if (this.formEnctype) props.formEnctype = this.formEnctype;
    if (this.formNoValidate) props.formNoValidate = this.formNoValidate;
    if (this.formTarget) props.formTarget = this.formTarget;
    if (this.name) props.name = this.name;
    if (this.value) props.value = this.value;

    return props;
  }

  /**
   * Get the button content with icon if provided
   */
  private getButtonContent() {
    if (this.icon && this.circle) {
      // For circular icon buttons, render just the icon
      return (
        <sl-icon 
          name={this.icon} 
          slot="prefix"
        />
      );
    }

    if (this.icon) {
      // For regular buttons with icons, render icon + text
      return [
        <sl-icon 
          name={this.icon} 
          slot="prefix"
        />,
        this.text
      ];
    }

    // Just text
    return this.text;
  }

  /**
   * Get button styles
   */
  private getButtonStyles() {
    const styles: any = {};
    
    if (this.minWidth) {
      styles.minWidth = this.minWidth;
    }
    
    if (this.fullWidth) {
      styles.width = '100%';
    }
    
    return styles;
  }

  render() {
    const shoelaceProps = this.getShoelaceProps();
    const buttonStyles = this.getButtonStyles();

    return (
      <sl-button
        {...shoelaceProps}
        style={buttonStyles}
      >
        {this.getButtonContent()}
      </sl-button>
    );
  }
} 