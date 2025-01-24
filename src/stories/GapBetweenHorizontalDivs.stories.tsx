// HorizontalAlignment.stories.tsx
import React from "react";
import styled from "@emotion/styled";
import { Meta, StoryFn } from "@storybook/react";

// Styled container with customizable gap
const HorizontalContainer = styled.div<{ gap: number }>`
  display: flex;
  flex-direction: row;
  gap: ${(props) => props.gap}px; /* Dynamically control the gap */
  align-items: center; /* Align items horizontally */
`;

// Styled inner boxes
const Box = styled.div`
  width: 100px;
  height: 100px;
  background-color: #4caf50; /* Green background */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 14px;
  font-family: Arial, sans-serif;
`;

export default {
  title: "Layout/HorizontalAlignment",
  component: HorizontalContainer,
  argTypes: {
    gap: {
      control: { type: "number" },
      defaultValue: 10,
      description: "Gap between the two boxes (in pixels)",
    },
  },
} as Meta;

// Story template
const Template: StoryFn<{ gap: number }> = (args) => (
  <HorizontalContainer gap={args.gap}>
    <Box>Box 1</Box>
    <Box>Box 2</Box>
  </HorizontalContainer>
);

export const Default = Template.bind({});
Default.args = {
  gap: 10, // Default gap value
};
