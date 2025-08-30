import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";

import ProfItem, { type AppProfItemProps } from './ProfItem';
import { useThemeComparison } from '../../../.storybook/LightDarkComparison';

import { lightTheme, darkTheme } from '../../theme';


const meta: Meta =  {
    component: ProfItem,
    title: "ProfItem",
    tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;


const LightProps: AppProfItemProps = {
    // same interface as the props of the Component
    theme: lightTheme.professional.item,
    experienceItemData: {
        title: "Software Engineer",
        company: "GG Navi",
        activities: ["I worked at GG Navi as a Software Engineer.", "other activity"],
        location: "Mountain View, CA",
        duration: "Sep 2022 - May 2023",
        description: "I worked at GG Navi as a Software Engineer.",
        technology_tags: ["python", 'docker'],
    },
};


// Theme comparison story
export const ThemeComparison: Story = {
  decorators: [useThemeComparison({
    lightLabel: "☀️ Light Theme",
    darkLabel: "🌙 Dark Theme",
    showLabels: false,
    gap: "48px"
  })],
  render: () => (
    <ProfItem
      {...LightProps}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: '🌗 **Professional Item Theme Comparison**: Displays the ProfItemPOC component side-by-side in light and dark themes. This demonstrates how the component adapts to different theme contexts while maintaining consistent typography and tag styling. The HOC automatically handles theme switching for comparison purposes.'
      }
    }
  }
};
