import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit-html';

const meta: Meta = {
  title: 'Components/Icon',
  component: 'ui-icon',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible icon component that wraps Shoelace sl-icon with additional design system features including sizes, colors, animations, and interactive states.',
      },
    },
  },
  argTypes: {
    name: {
      control: 'text',
      description: 'The name of the icon to display',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large', 'x-large'],
      description: 'The size of the icon',
      table: {
        type: { summary: 'IconSize' },
        defaultValue: { summary: 'medium' },
      },
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger', 'neutral'],
      description: 'The color of the icon',
      table: {
        type: { summary: 'IconColor' },
        defaultValue: { summary: 'neutral' },
      },
    },
    label: {
      control: 'text',
      description: 'The label for accessibility (aria-label)',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    decorative: {
      control: 'boolean',
      description: 'Whether the icon is decorative (no aria-label needed)',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    clickable: {
      control: 'boolean',
      description: 'Whether the icon should be clickable',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether the icon should have a hover effect',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    spinning: {
      control: 'boolean',
      description: 'Whether the icon should be spinning',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    flipHorizontal: {
      control: 'boolean',
      description: 'Whether the icon should be flipped horizontally',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    flipVertical: {
      control: 'boolean',
      description: 'Whether the icon should be flipped vertically',
      table: {
        type: { summary: 'boolean' },
        defaultValue: { summary: 'false' },
      },
    },
    rotate: {
      control: { type: 'select' },
      options: [0, 90, 180, 270],
      description: 'Whether the icon should be rotated',
      table: {
        type: { summary: '0 | 90 | 180 | 270' },
        defaultValue: { summary: '0' },
      },
    },
    type: {
      control: { type: 'select' },
      options: ['regular', 'bold', 'fill', 'duotone', 'light', 'thin'],
      description: 'The type/weight of the Phosphor icon',
      table: {
        type: { summary: 'regular | bold | fill | duotone | light | thin' },
        defaultValue: { summary: 'regular' },
      },
    },
  },
  args: {
    name: 'gear-six',
    size: 'medium',
    color: 'neutral',
    decorative: false,
    clickable: false,
    hoverable: false,
    spinning: false,
    flipHorizontal: false,
    flipVertical: false,
    rotate: 0,
    type: 'regular',
  },
};

export default meta;
type Story = StoryObj;

// Basic icon story
export const Default: Story = {
  args: {
    name: 'gear-six',
    size: 'medium',
    color: 'neutral',
  },
};

// Size variants story
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ui-icon name="gear-six" size="small" label="Small gear icon"></ui-icon>
      <ui-icon name="gear-six" size="medium" label="Medium gear icon"></ui-icon>
      <ui-icon name="gear-six" size="large" label="Large gear icon"></ui-icon>
      <ui-icon name="gear-six" size="x-large" label="Extra large gear icon"></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons come in four different sizes: small (1rem), medium (1.25rem), large (1.5rem), and x-large (2rem).',
      },
    },
  },
};

// Color variants story
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ui-icon name="heart" color="primary" label="Primary heart icon"></ui-icon>
      <ui-icon name="star" color="secondary" label="Secondary star icon"></ui-icon>
      <ui-icon name="check-circle" color="success" label="Success check icon"></ui-icon>
      <ui-icon name="triangle" color="warning" label="Warning triangle icon"></ui-icon>
      <ui-icon name="x-circle" color="danger" label="Danger x icon"></ui-icon>
      <ui-icon name="info" color="neutral" label="Neutral info icon"></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons support different semantic colors that align with your design system.',
      },
    },
  },
};

// Icon weights/types story
export const IconWeights: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <div style="text-align: center;">
        <ui-icon name="heart" type="thin" size="large" label="Thin heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Thin</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" type="light" size="large" label="Light heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Light</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" type="regular" size="large" label="Regular heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Regular</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" type="bold" size="large" label="Bold heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Bold</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" type="fill" size="large" label="Fill heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Fill</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" type="duotone" size="large" label="Duotone heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Duotone</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Phosphor Icons support six different weights: thin, light, regular, bold, fill, and duotone. Use the `type` prop to set the icon weight.',
      },
    },
  },
};

// Interactive states story
export const Interactive: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ui-icon name="heart" color="primary" hoverable label="Hoverable heart icon"></ui-icon>
      <ui-icon name="star" color="warning" clickable label="Clickable star icon"></ui-icon>
      <ui-icon name="gear-six" color="neutral" spinning label="Spinning gear icon"></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons can be interactive with hover effects, clickable states, and animations.',
      },
    },
  },
};

// Transformations story
export const Transformations: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <ui-icon name="arrow-right" color="primary" label="Normal arrow"></ui-icon>
      <ui-icon name="arrow-right" color="primary" flip-horizontal label="Flipped horizontal arrow"></ui-icon>
      <ui-icon name="arrow-right" color="primary" flip-vertical label="Flipped vertical arrow"></ui-icon>
      <ui-icon name="arrow-right" color="primary" rotate="90" label="Rotated 90° arrow"></ui-icon>
      <ui-icon name="arrow-right" color="primary" rotate="180" label="Rotated 180° arrow"></ui-icon>
      <ui-icon name="arrow-right" color="primary" rotate="270" label="Rotated 270° arrow"></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons can be flipped horizontally/vertically and rotated to different angles.',
      },
    },
  },
};

// Common icons showcase
export const CommonIcons: Story = {
  render: () => html`
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem; max-width: 600px;">
      <div style="text-align: center;">
        <ui-icon name="home" color="primary" size="large" label="Home icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Home</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="user" color="secondary" size="large" label="User icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">User</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="settings" color="neutral" size="large" label="Settings icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Settings</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="search" color="primary" size="large" label="Search icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Search</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="heart" color="danger" size="large" label="Heart icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Heart</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="star" color="warning" size="large" label="Star icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Star</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="check-circle" color="success" size="large" label="Check icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Check</div>
      </div>
      <div style="text-align: center;">
        <ui-icon name="exclamation-triangle" color="warning" size="large" label="Warning icon"></ui-icon>
        <div style="margin-top: 0.5rem; font-size: 0.875rem;">Warning</div>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'A showcase of commonly used icons with their semantic meanings.',
      },
    },
  },
};

// Accessibility story
export const Accessibility: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-direction: column;">
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ui-icon name="info-circle" color="primary" label="Information about accessibility" label="Information about accessibility"></ui-icon>
        <span>Icon with proper label for screen readers</span>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ui-icon name="chevron-right" color="neutral" decorative></ui-icon>
        <span>Icon marked as decorative (no label needed)</span>
      </div>
      <div style="display: flex; gap: 1rem; align-items: center;">
        <ui-icon name="heart" color="danger" clickable label="Like this post"></ui-icon>
        <span>Clickable icon with descriptive label</span>
      </div>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons support proper accessibility with labels and decorative states.',
      },
    },
  },
};

// Loading states story
export const LoadingStates: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <ui-icon name="gear" color="primary" spinning label="Loading..."></ui-icon>
      <span>Loading indicator</span>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Use the spinning property to create loading indicators.',
      },
    },
  },
};

// Custom styling story
export const CustomStyling: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <ui-icon 
        name="star" 
        color="warning" 
        size="large"
        style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));"
        label="Star with shadow"
      ></ui-icon>
      <ui-icon 
        name="heart" 
        color="danger" 
        size="large"
        style="filter: drop-shadow(0 0 10px rgba(220,38,38,0.5));"
        label="Heart with glow"
      ></ui-icon>
      <ui-icon 
        name="gear" 
        color="primary" 
        size="large"
        style="filter: hue-rotate(180deg);"
        label="Gear with color shift"
      ></ui-icon>
    </div>
  `,
  parameters: {
    docs: {
      description: {
        story: 'Icons can be customized with additional CSS properties and filters.',
      },
    },
  },
};
