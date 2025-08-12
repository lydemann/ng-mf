import type { Meta, StoryObj } from '@storybook/web-components';
import { Button } from './button';

const meta: Meta = {
  title: 'Components/Button',
  component: 'ui-button',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The type of button (button, submit, reset)',
      table: {
        type: { summary: 'ButtonType' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'primary', 'success', 'neutral', 'warning', 'danger', 'text'],
      description: 'The variant of the button (default, primary, success, neutral, warning, danger, text)',
      table: {
        type: { summary: 'ButtonVariant' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button (small, medium, large)',
      table: {
        type: { summary: 'ButtonSize' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'The text content of the button',
      table: {
        type: { summary: 'string' },
      },
    },
    destructive: {
      control: { type: 'boolean' },
      description: 'Whether the button should use destructive styling',
      table: {
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        type: { summary: 'boolean' },
      },
    },
    minWidth: {
      control: { type: 'text' },
      description: 'Minimum width for the button',
      table: {
        type: { summary: 'string' },
      },
    },
    fullWidth: {
      control: { type: 'boolean' },
      description: 'Whether the button should be full width',
      table: {
        type: { summary: 'boolean' },
      },
    },
    pill: {
      control: { type: 'boolean' },
      description: 'Whether the button should be pill-shaped',
      table: {
        type: { summary: 'boolean' },
      },
    },
    round: {
      control: { type: 'boolean' },
      description: 'Whether the button should be round (for icon-only buttons)',
      table: {
        type: { summary: 'boolean' },
      },
    },
    buttonType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The button type for form submission',
      table: {
        type: { summary: 'string' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// Basic Button Stories
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    variant: 'primary',
    type: 'button',
  } as Button,
};

export const Neutral: Story = {
  args: {
    text: 'Secondary Button',
    variant: 'neutral',
    type: 'button',
  } as Button,
};

export const Destructive: Story = {
  args: {
    text: 'Destructive Button',
    variant: 'danger',
    type: 'button',
  } as Button,
};

// Variant Stories
export const Filled: Story = {
  args: {
    text: 'Filled Button',
    variant: 'default',
  } as Button,
};

export const Outlined: Story = {
  args: {
    text: 'Outlined Button',
    variant: 'default',
    outline: true,
  } as Button,
};

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'text',
  } as Button,
};

// Size Stories
export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'small',
  } as Button,
};

export const Medium: Story = {
  args: {
    text: 'Medium Button',
    size: 'medium',
  } as Button,
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'large',
  } as Button,
};

// Icon Slot Stories
export const WithPrefixIcon: Story = {
  args: {
    text: 'Upload',
    variant: 'primary',
    type: 'button',
  } as Button,
  render: (args) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <ui-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
        <ui-icon slot="prefix" name="upload" size="small"></ui-icon>
      </ui-button>
    `;
    return div.firstElementChild;
  },
};

export const WithSuffixIcon: Story = {
  args: {
    text: 'Download',
    variant: 'primary',
    type: 'button',
  } as Button,
  render: (args) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <ui-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
        <ui-icon slot="suffix" name="download" size="small"></ui-icon>
      </ui-button>
    `;
    return div.firstElementChild;
  },
};

export const IconOnlyRound: Story = {
  args: {
    text: '',
    variant: 'primary',
    type: 'button',
    circle: true,
  } as Button,
  render: (args) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <ui-button ${Object.entries(args).map(([key, value]) => `${key}="${value}"`).join(' ')}>
        <ui-icon name="gear-six" size="medium"></ui-icon>
      </ui-button>
    `;
    return div.firstElementChild;
  },
};

// State Stories
export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

export const Pill: Story = {
  args: {
    text: 'Pill Button',
    pill: true,
  },
};

// Layout Stories
export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true,
  },
};

export const CustomMinWidth: Story = {
  args: {
    text: 'Custom Width',
    minWidth: '200px',
  },
};

// Form Button Stories
export const SubmitButton: Story = {
  args: {
    text: 'Submit',
    buttonType: 'submit',
    type: 'primary',
  },
};

export const ResetButton: Story = {
  args: {
    text: 'Reset',
    buttonType: 'reset',
    type: 'secondary',
  },
};

// Button Group Example
export const ButtonGroup: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 8px; align-items: center;">
        <ui-button text="Cancel" variant="neutral" type="button"></ui-button>
        <ui-button text="Save" variant="primary" type="button">
          <ui-icon slot="prefix" name="check" size="small"></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

// Complex Example with Multiple Icons
export const ComplexButton: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <ui-button text="Export Data" variant="primary" type="button" size="large">
        <ui-icon slot="prefix" name="download" color="neutral" size="medium"></ui-icon>
        <ui-icon slot="suffix" name="arrow-right" color="neutral" size="medium"></ui-icon>
      </ui-button>
    `;
    return div.firstElementChild;
  },
};

// New stories showcasing ui-icon features in buttons
export const ButtonWithColoredIcons: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center; flex-wrap: wrap;">
        <ui-button text="Success Action" variant="success" type="button">
          <ui-icon slot="prefix" name="check-circle" size="small"></ui-icon>
        </ui-button>
        <ui-button text="Warning Action" variant="warning" type="button">
          <ui-icon slot="prefix" name="triangle" size="small"></ui-icon>
        </ui-button>
        <ui-button text="Danger Action" variant="danger" type="button">
          <ui-icon slot="prefix" name="x-circle" size="small"></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

export const ButtonWithAnimatedIcons: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center;">
        <ui-button text="Loading..." variant="primary" type="button" disabled>
          <ui-icon slot="prefix" name="gear-six" spinning size="small"></ui-icon>
        </ui-button>
        <ui-button text="Refresh" variant="secondary" type="button">
          <ui-icon slot="prefix" name="arrow-clockwise" size="small"></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

export const ButtonWithTransformedIcons: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center;">
        <ui-button text="Previous" variant="neutral" type="button">
          <ui-icon slot="prefix" name="arrow-right" flip-horizontal size="small"></ui-icon>
        </ui-button>
        <ui-button text="Next" variant="primary" type="button">
          <ui-icon slot="suffix" name="arrow-right" size="small"></ui-icon>
        </ui-button>
        <ui-button text="Expand" variant="secondary" type="button">
          <ui-icon slot="suffix" name="caret-down" size="small"></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

export const IconOnlyButtons: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center;">
        <ui-button text="" variant="primary" type="button" circle>
          <ui-icon name="plus" size="medium"></ui-icon>
        </ui-button>
        <ui-button text="" variant="secondary" type="button" circle>
          <ui-icon name="minus" size="medium"></ui-icon>
        </ui-button>
        <ui-button text="" variant="success" type="button" circle>
          <ui-icon name="check" size="medium"></ui-icon>
        </ui-button>
        <ui-button text="" variant="danger" type="button" circle>
          <ui-icon name="x" size="medium"></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

export const ButtonWithHoverableIcons: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 12px; align-items: center;">
        <ui-button text="Like" variant="primary" type="button">
          <ui-icon slot="prefix" name="heart" color="danger" size="small" hoverable></ui-icon>
        </ui-button>
        <ui-button text="Star" variant="warning" type="button">
          <ui-icon slot="prefix" name="star" color="warning" size="small" hoverable></ui-icon>
        </ui-button>
        <ui-button text="Share" variant="secondary" type="button">
          <ui-icon slot="prefix" name="share" color="neutral" size="small" hoverable></ui-icon>
        </ui-button>
      </div>
    `;
    return div.firstElementChild;
  },
};

// Test story for icon-only round buttons to ensure proper centering
export const IconOnlyRoundTest: Story = {
  render: () => {
    const div = document.createElement('div');
    div.innerHTML = `
      <div style="display: flex; gap: 16px; align-items: center; flex-wrap: wrap;">
        <div style="text-align: center;">
          <ui-button text="" variant="primary" type="button" circle size="small">
            <ui-icon name="gear-six" size="small"></ui-icon>
          </ui-button>
          <div style="margin-top: 8px; font-size: 12px;">Small</div>
        </div>
        <div style="text-align: center;">
          <ui-button text="" variant="primary" type="button" circle size="medium">
            <ui-icon name="gear-six" size="medium"></ui-icon>
          </ui-button>
          <div style="margin-top: 8px; font-size: 12px;">Medium</div>
        </div>
        <div style="text-align: center;">
          <ui-button text="" variant="primary" type="button" circle size="large">
            <ui-icon name="gear-six" size="large"></ui-icon>
          </ui-button>
          <div style="margin-top: 8px; font-size: 12px;">Large</div>
        </div>
      </div>
    `;
    return div.firstElementChild;
  },
}; 