import type { Meta, StoryObj } from '@storybook/web-components';

const meta: Meta = {
  title: 'Components/MyComponent',
  component: 'my-component',
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    first: {
      control: 'text',
      description: 'The first name',
    },
    middle: {
      control: 'text',
      description: 'The middle name',
    },
    last: {
      control: 'text',
      description: 'The last name',
    },
  },
};

export default meta;
type Story = StoryObj;

// Default story
export const Default: Story = {
  args: {
    first: 'John',
    middle: 'Michael',
    last: 'Doe',
  },
};

// Story with only first name
export const FirstNameOnly: Story = {
  args: {
    first: 'Alice',
  },
};

// Story with first and last name
export const FirstAndLastName: Story = {
  args: {
    first: 'Bob',
    last: 'Smith',
  },
};

// Story with all names
export const FullName: Story = {
  args: {
    first: 'Sarah',
    middle: 'Elizabeth',
    last: 'Johnson',
  },
};

// Story with empty values
export const EmptyValues: Story = {
  args: {
    first: '',
    middle: '',
    last: '',
  },
};

// Story with special characters
export const SpecialCharacters: Story = {
  args: {
    first: 'José',
    middle: 'María',
    last: 'García-López',
  },
};

// Story with long names
export const LongNames: Story = {
  args: {
    first: 'Alexander',
    middle: 'Christopher',
    last: 'Montgomery-Williams',
  },
}; 