import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/Button',
  component: 'ui-button',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A button component that wraps Shoelace sl-button, providing a consistent design system interface with support for all Shoelace button features.',
      },
    },
  },
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'destructive'],
      description: 'The type of button (primary, secondary, destructive)',
      table: {
        defaultValue: {  },
        type: { summary: 'ButtonType' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
      description: 'The size of the button',
      table: {
        defaultValue: { summary: 'medium' },
        type: { summary: 'ButtonSize' },
      },
    },
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined', 'ghost'],
      description: 'The visual variant of the button',
      table: {
        defaultValue: { summary: 'filled' },
        type: { summary: 'ButtonVariant' },
      },
    },
    icon: {
      control: { type: 'text' },
      description: 'Icon name from Shoelace icon library',
      table: {
        type: { summary: 'string' },
      },
    },
    text: {
      control: { type: 'text' },
      description: 'The text content of the button',
      table: {
        defaultValue: { summary: 'Button' },
        type: { summary: 'string' },
      },
    },
    destructive: {
      control: { type: 'boolean' },
      description: 'Whether the button should use destructive styling',
      table: {
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the button is disabled',
      table: {
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    loading: {
      control: { type: 'boolean' },
      description: 'Whether the button is in loading state',
      table: {
        defaultValue: {  },
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
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    pill: {
      control: { type: 'boolean' },
      description: 'Whether the button should be pill-shaped',
      table: {
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    circle: {
      control: { type: 'boolean' },
      description: 'Whether the button should be circular (for icon-only)',
      table: {
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    caret: {
      control: { type: 'boolean' },
      description: 'Whether the button should have a caret',
      table: {
        defaultValue: {  },
        type: { summary: 'boolean' },
      },
    },
    buttonType: {
      control: { type: 'select' },
      options: ['button', 'submit', 'reset'],
      description: 'The button type for form submission',
      table: {
        defaultValue: { summary: 'button' },
        type: { summary: 'string' },
      },
    },
    href: {
      control: { type: 'text' },
      description: 'Link URL (renders as anchor when provided)',
      table: {
        type: { summary: 'string' },
      },
    },
    target: {
      control: { type: 'select' },
      options: ['_blank', '_parent', '_self', '_top'],
      description: 'Target for link buttons',
      table: {
        type: { summary: 'string' },
      },
    },
  },
  args: {
    text: 'Button',
    type: 'primary',
    size: 'medium',
    variant: 'filled',
    destructive: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    pill: false,
    circle: false,
    caret: false,
    buttonType: 'button',
  },
};

export default meta;
type Story = StoryObj;

// Default story
export const Default: Story = {
  args: {
    text: 'Button',
    type: 'primary',
    size: 'medium',
    variant: 'filled',
  },
};

// Button Types Section
export const Primary: Story = {
  args: {
    text: 'Primary Button',
    type: 'primary',
    variant: 'filled',
  },
};

export const Secondary: Story = {
  args: {
    text: 'Secondary Button',
    type: 'secondary',
    variant: 'filled',
  },
};

export const Destructive: Story = {
  args: {
    text: 'Destructive Button',
    type: 'destructive',
    variant: 'filled',
  },
};

// Button Variants Section
export const Filled: Story = {
  args: {
    text: 'Filled Button',
    variant: 'filled',
  },
};

export const Outlined: Story = {
  args: {
    text: 'Outlined Button',
    variant: 'outlined',
  },
};

export const Ghost: Story = {
  args: {
    text: 'Ghost Button',
    variant: 'ghost',
  },
};

// Button Sizes Section
export const Small: Story = {
  args: {
    text: 'Small Button',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    text: 'Medium Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    text: 'Large Button',
    size: 'large',
  },
};

// Icon Buttons Section
export const WithIcon: Story = {
  args: {
    text: 'Button with Icon',
    icon: 'gear',
  },
};

export const IconOnly: Story = {
  args: {
    text: '',
    icon: 'gear',
    circle: true,
  },
};

export const WithCaret: Story = {
  args: {
    text: 'Button with Caret',
    caret: true,
  },
};

// Button States Section
export const Loading: Story = {
  args: {
    text: 'Loading Button',
    loading: true,
  },
};

export const Disabled: Story = {
  args: {
    text: 'Disabled Button',
    disabled: true,
  },
};

// Button Styles Section
export const Pill: Story = {
  args: {
    text: 'Pill Button',
    pill: true,
  },
};

export const FullWidth: Story = {
  args: {
    text: 'Full Width Button',
    fullWidth: true,
  },
};

export const CustomWidth: Story = {
  args: {
    text: 'Custom Width',
    minWidth: '200px',
  },
};

// Link Buttons Section
export const LinkButton: Story = {
  args: {
    text: 'Link Button',
    href: 'https://shoelace.style',
    target: '_blank',
  },
};

export const DownloadButton: Story = {
  args: {
    text: 'Download',
    href: '/download',
    download: 'file.pdf',
  },
};

// Form Buttons Section
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

// Button Groups and Layouts
export const HorizontalButtonGroup: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <ui-button text="Cancel" type="secondary" variant="outlined"></ui-button>
      <ui-button text="Get Report" type="secondary" variant="outlined"></ui-button>
      <ui-button text="Apply Changes" type="primary" variant="filled"></ui-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of horizontal button distribution with 16px spacing between buttons.',
      },
    },
  },
};

export const VerticalButtonGroup: Story = {
  render: () => `
    <div style="display: flex; flex-direction: column; gap: 16px; align-items: flex-start;">
      <ui-button text="Apply Changes" type="primary" variant="filled"></ui-button>
      <ui-button text="Get Report" type="secondary" variant="outlined"></ui-button>
      <ui-button text="Cancel" type="secondary" variant="outlined"></ui-button>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Example of vertical button distribution with 16px spacing between buttons.',
      },
    },
  },
};

// All Button Variants Grid (like the Figma specification)
export const AllVariantsGrid: Story = {
  render: () => `
    <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 800px;">
      <!-- Primary Filled -->
      <div style="text-align: center;">
        <ui-button text="Button" type="primary" variant="filled"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Primary Filled</p>
      </div>
      
      <!-- Primary Outlined -->
      <div style="text-align: center;">
        <ui-button text="Button" type="primary" variant="outlined"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Primary Outlined</p>
      </div>
      
      <!-- Destructive Filled -->
      <div style="text-align: center;">
        <ui-button text="Button" type="destructive" variant="filled"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Destructive Filled</p>
      </div>
      
      <!-- Destructive Outlined -->
      <div style="text-align: center;">
        <ui-button text="Button" type="destructive" variant="outlined"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Destructive Outlined</p>
      </div>
      
      <!-- With Icons -->
      <div style="text-align: center;">
        <ui-button text="Button" icon="gear" type="primary" variant="filled"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">With Icon</p>
      </div>
      
      <!-- Icon Only -->
      <div style="text-align: center;">
        <ui-button icon="gear" circle="true" type="primary" variant="filled"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Icon Only</p>
      </div>
      
      <!-- Loading State -->
      <div style="text-align: center;">
        <ui-button text="Button" loading="true" type="primary" variant="filled"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Loading</p>
      </div>
      
      <!-- Secondary -->
      <div style="text-align: center;">
        <ui-button text="Button" type="secondary" variant="outlined"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Secondary</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comprehensive grid showing all button variants, similar to the Figma specification.',
      },
    },
  },
};

// Size Comparison
export const SizeComparison: Story = {
  render: () => `
    <div style="display: flex; gap: 16px; align-items: center;">
      <div style="text-align: center;">
        <ui-button text="Small" size="small"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Small</p>
      </div>
      <div style="text-align: center;">
        <ui-button text="Medium" size="medium"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Medium</p>
      </div>
      <div style="text-align: center;">
        <ui-button text="Large" size="large"></ui-button>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #666;">Large</p>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Comparison of all button sizes.',
      },
    },
  },
};

// Interactive Playground
export const InteractivePlayground: Story = {
  args: {
    text: 'Interactive Button',
    type: 'primary',
    size: 'medium',
    variant: 'filled',
    destructive: false,
    disabled: false,
    loading: false,
    fullWidth: false,
    pill: false,
    circle: false,
    caret: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive playground where you can modify all button properties using the controls panel.',
      },
    },
  },
}; 