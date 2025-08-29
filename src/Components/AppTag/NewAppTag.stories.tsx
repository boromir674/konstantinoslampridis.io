import React from 'react';
import type { Meta, StoryFn, StoryObj } from "@storybook/react";

import AppTag, { type AppTagProps } from './AppTag';
import { useThemeComparison } from '../HOC/LightDarkComparison';


import '../../design-system/tokens.css';  // raw tokens needed for Semantic ones
import '../../design-system/typography.css';
import '../../design-system/semantic-tokens.css';


// STORY METADATA
const meta = {
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

export default meta;
type Story = StoryObj<typeof meta>;


// STORY TEMPLATE
const Template = (args: AppTagProps) => <AppTag {...args}>AppTag</AppTag>;

// Extract available variants from the argTypes definition
const availableVariants = meta.argTypes?.variant?.options || ['primary', 'secondary', 'accent', 'neutral', 'warning'];

// Dynamically generate stories for each variant
const generateVariantStories = () => {
  const stories: Record<string, any> = {};

  availableVariants.forEach((variant: string) => {
    const storyName = variant.charAt(0).toUpperCase() + variant.slice(1);
    stories[storyName] = Template.bind({});
    stories[storyName].args = { variant };
    stories[storyName].parameters = {
      docs: {
        description: {
          story: `🏷️ **${storyName} Variant**: Displays the AppTag component with the \`${variant}\` variant, showcasing the corresponding semantic token mapping and hover effects.`
        }
      }
    };
  });

  return stories;
};

// Generate all variant stories
const variantStories = generateVariantStories();

// Export dynamically generated stories
export const Primary = variantStories.Primary;
export const Secondary = variantStories.Secondary;
export const Accent = variantStories.Accent;
export const Neutral = variantStories.Neutral;
export const Warning = variantStories.Warning;


// Keep the override demo story
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


export const AsDecorator: Story = {
  decorators: [useThemeComparison({
    // lightLabel: "🔧 DECORATOR LIGHT",
    // darkLabel: "🔧 DECORATOR DARK",
    showLabels: false,
    gap: "32px"
  })],
  render: () => (
    <AppTag>Some Tag</AppTag>
  ),
  parameters: {
    docs: {
    }
  }
};

export const AllVariantsComparison: Story = {
  decorators: [useThemeComparison({
    lightLabel: "☀️ Light Theme",
    darkLabel: "🌙 Dark Theme",
    showLabels: true,
    gap: "78px"
  })],
  render: () => (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '16px',
      padding: '16px',
      marginTop: '8px',
    }}>
      {availableVariants.map((variant: string) => (
        <div key={variant} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px' 
        }}>
          <span style={{ 
            minWidth: '80px', 
            fontSize: '14px', 
            fontWeight: '600',
            color: 'var(--app-text-secondary)',
            textTransform: 'capitalize'
          }}>
            <span style={{ color: 'var(--app-text-primary, teal)' }}>{variant}:</span>
          </span>
          <AppTag variant={variant as AppTagProps['variant']}>
            {variant} tag
          </AppTag>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '🌗 **All Variants Theme Comparison**: Displays all available AppTag variants side-by-side in light and dark themes. This story dynamically discovers all variants and renders them using the theme comparison HOC, making it easy to validate semantic token behavior across both themes simultaneously.'
      }
    }
  }
};
