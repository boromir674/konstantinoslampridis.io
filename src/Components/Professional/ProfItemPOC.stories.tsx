import React from 'react';
import type { Meta, StoryObj } from "@storybook/react";

import ProfItemPOC, { type ProfItemProps } from "./ProfItemPOC";
import { useThemeComparison } from '../../../.storybook/LightDarkComparison';

import '../../design-system/tokens.css';  // raw tokens needed for Semantic ones
import '../../design-system/typography.css';
import '../../design-system/semantic-tokens.css';

const meta = {
  component: ProfItemPOC,
  title: "ProfItemPOC",
  tags: ["autodocs"],
} as Meta<ProfItemProps>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base data for the professional item
const baseProfItemData = {
  title: "Software Engineer",
  duration: "Sep 2022 - May 2023",
  company: "Ggvista SAS",
  description: "I worked at Ggvista as a Software Engineer.",
  activities: [
    "I worked on the development of a web application for the management of the company's internal processes.",
    "I worked on the development of a web application for the management of the company's internal processes.",
  ],
  technology_tags: ["React", "TypeScript", "JavaScript"],
  location: "Some Location",
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
    <ProfItemPOC
      {...baseProfItemData}
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
