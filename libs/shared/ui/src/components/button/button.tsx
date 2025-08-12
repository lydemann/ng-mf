import { Component, Prop, h } from '@stencil/core';

// Import Shoelace components directly
import '@shoelace-style/shoelace/dist/components/button/button.js';
import { SlButton } from '@shoelace-style/shoelace';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';

export type ButtonTheme = 'primary' | 'secondary' | 'destructive';
export type ButtonSize = 'small' | 'medium' | 'large';

@Component({
  tag: 'ui-button',
  styleUrl: 'button.scss',
  shadow: true,
})
export class Button {

  /**
   * The type of button (primary, secondary, destructive)
   */
  @Prop() type: SlButton['type'] = 'button';
  /**
   * The size of the button (small, medium, large)
   */
  @Prop() size: SlButton['size'] = 'medium';

  /**
   * The variant of the button (filled, outlined, ghost)
   */
  @Prop() variant: SlButton['variant'] = 'default';

  /**
   * The text content of the button
   */
  @Prop() text = 'Button';

  /**
   * Whether the button is outlined
   */
  @Prop() outline = false;

  /**
   * Whether the button is disabled
   */
  @Prop() disabled = false;

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
   * Whether the button should be round (for icon-only buttons)
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
  @Prop() formEnctype:
    | 'application/x-www-form-urlencoded'
    | 'multipart/form-data'
    | 'text/plain';

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
    const props = {
      size: this.size,
      disabled: this.disabled,
      pill: this.pill,
      circle: this.circle,
      type: this.type,
      variant: this.variant,
      outline: this.outline,
      value: this.value,
      name: this.name,
      form: this.form,
      formAction: this.formAction,
      formMethod: this.formMethod,
      formEnctype: this.formEnctype,
      formNoValidate: this.formNoValidate,
      formTarget: this.formTarget,
    } as Partial<SlButton>;


    return props;
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
        <sl-button {...shoelaceProps} style={buttonStyles}>
          <slot name="prefix" />
          {this.text}
          <slot />
          <slot name="suffix" />
        </sl-button>
    );
  }
}
