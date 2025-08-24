import React from 'react';
import type { Meta, StoryFn } from "@storybook/react";
import AppTag, { type AppTagProps } from './AppTag';


// STORY METADATA
export default {
  tags: ['autodocs'],
  title: 'AppTagNew',
  component: AppTag,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent', 'neutral', 'warning'],
    },
    className: { control: 'text' },
  },
} as Meta<AppTagProps>;


// STORY TEMPLATE
const Template = (args: AppTagProps) => <AppTag {...args}>AppTag</AppTag>;

export const Primary = Template.bind({});
Primary.args = {
  variant: 'primary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  variant: 'secondary',
};

export const Accent = Template.bind({});
Accent.args = {
  variant: 'accent',
};

export const StyleOverride = Template.bind({});
StyleOverride.args = {
  variant: 'secondary',
  style: { backgroundColor: 'blue' },
};
StyleOverride.parameters = {
  docs: {
    description: {
      story: '🎨 **Style Override Demonstration**: This story shows how client code can use the `style` prop to override variant-specific styling. Here, a `secondary` variant tag gets its background color overridden to blue, while keeping other variant properties (text color, border, hover effects) intact. This provides flexibility for one-off customizations while maintaining the semantic token foundation.'
    }
  }
};
