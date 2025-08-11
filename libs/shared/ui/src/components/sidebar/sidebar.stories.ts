import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

const meta: Meta = {
  title: 'Components/Sidebar',
  component: 'shared-sidebar',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'A responsive sidebar navigation component with collapsible sections and items.',
      },
    },
  },
  argTypes: {
    sections: {
      control: 'object',
      description: 'Array of sidebar sections with items',
    },
    collapsed: {
      control: 'boolean',
      description: 'Whether the sidebar is collapsed',
    },
  },
  args: {
    collapsed: false,
  },
};

export default meta;
type Story = StoryObj;

// Sample data based on the image
const defaultSections = [
  {
    items: [
      {
        id: 'workspace',
        label: 'My Workspace',
        icon: 'house',
        isActive: true,
      },
      {
        id: 'threads',
        label: 'Threads',
        icon: 'chat',
      },
      {
        id: 'drafts',
        label: 'Drafts',
        icon: 'document',
      },
    ],
  },
  {
    title: 'Channels',
    items: [
      {
        id: 'stories',
        label: 'Stories',
        icon: 'document',
        children: [],
      },
      {
        id: 'print',
        label: 'Print',
        icon: 'document',
        children: [],
      },
      {
        id: 'assets',
        label: 'Assets',
        icon: 'document',
        children: [],
      },
      {
        id: 'planning',
        label: 'Planning',
        icon: 'document',
        children: [],
      },
      {
        id: 'broadcasts',
        label: 'Broadcasts',
        icon: 'document',
        children: [],
      },
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'document',
        children: [],
      },
      {
        id: 'wires',
        label: 'Wires',
        icon: 'document',
        children: [],
      },
    ],
  },
  {
    items: [
      {
        id: 'profile',
        label: 'My Profile',
        icon: 'user',
        children: [
          {
            id: 'simone-halling',
            label: 'Simone Halling',
            icon: 'user',
          },
        ],
      },
    ],
  },
];

export const Default: Story = {
  args: {
    sections: defaultSections,
    collapsed: false,
  },
  render: (args) => html`
    <div style="height: 100vh; display: flex;">
      <shared-sidebar
        .sections=${args.sections}
        .collapsed=${args.collapsed}
      ></shared-sidebar>
      <div style="flex: 1; padding: 20px; background: white;">
        <h1>Main Content Area</h1>
        <p>This is the main content area. The sidebar is on the left.</p>
      </div>
    </div>
  `,
};

export const Collapsed: Story = {
  args: {
    sections: defaultSections,
    collapsed: true,
  },
  render: (args) => html`
    <div style="height: 100vh; display: flex;">
      <shared-sidebar
        .sections=${args.sections}
        .collapsed=${args.collapsed}
      ></shared-sidebar>
      <div style="flex: 1; padding: 20px; background: white;">
        <h1>Main Content Area</h1>
        <p>This is the main content area. The sidebar is collapsed.</p>
      </div>
    </div>
  `,
};

export const WithActiveItems: Story = {
  args: {
    sections: [
      {
        items: [
          {
            id: 'workspace',
            label: 'My Workspace',
            icon: 'house',
            isActive: true,
          },
          {
            id: 'threads',
            label: 'Threads',
            icon: 'chat',
          },
        ],
      },
      {
        title: 'Channels',
        items: [
          {
            id: 'stories',
            label: 'Stories',
            icon: 'document',
            isActive: true,
            children: [
              {
                id: 'story-1',
                label: 'Breaking News',
                icon: 'document',
              },
              {
                id: 'story-2',
                label: 'Feature Stories',
                icon: 'document',
              },
            ],
          },
        ],
      },
    ],
    collapsed: false,
  },
  render: (args) => html`
    <div style="height: 100vh; display: flex;">
      <shared-sidebar
        .sections=${args.sections}
        .collapsed=${args.collapsed}
      ></shared-sidebar>
      <div style="flex: 1; padding: 20px; background: white;">
        <h1>Main Content Area</h1>
        <p>This shows the sidebar with active items and expanded children.</p>
      </div>
    </div>
  `,
};

export const Minimal: Story = {
  args: {
    sections: [
      {
        items: [
          {
            id: 'home',
            label: 'Home',
            icon: 'house',
            isActive: true,
          },
          {
            id: 'about',
            label: 'About',
            icon: 'document',
          },
        ],
      },
    ],
    collapsed: false,
  },
  render: (args) => html`
    <div style="height: 100vh; display: flex;">
      <shared-sidebar
        .sections=${args.sections}
        .collapsed=${args.collapsed}
      ></shared-sidebar>
      <div style="flex: 1; padding: 20px; background: white;">
        <h1>Main Content Area</h1>
        <p>This shows a minimal sidebar with just a few items.</p>
      </div>
    </div>
  `,
};
