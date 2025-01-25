// ResizableHorizontalAlignment.stories.tsx
import React, { useState } from "react";
import styled from "@emotion/styled";
import { Meta, StoryFn } from "@storybook/react";

// Styled resizable container
const ResizableContainer = styled.div`
  resize: both; /* Allow resizing */
  overflow: auto; /* Handle overflow content */
  border: 1px solid #ddd;
  padding: 10px;
  width: 300px; /* Initial width */
  height: 200px; /* Initial height */
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Styled horizontal container with dynamic gap
const HorizontalContainer = styled.div<{ gap: number; containerWidth: number }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: ${(props) => Math.max(props.gap, props.containerWidth / 20)}px; /* Minimum gap preserved */
  align-items: center;
  width: 100%; /* Full width of the resizable container */
`;

// Styled inner boxes
const Box = styled.div`
  flex: 1 1 auto; /* Allow boxes to flex and grow */
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
  title: "Layout/ResizableHorizontalAlignment",
  component: HorizontalContainer,
  argTypes: {
    gap: {
      control: { type: "number" },
      defaultValue: 10,
      description: "Minimum gap between the two boxes (in pixels)",
    },
  },
} as Meta;

// Story template
const Template: StoryFn<{ gap: number }> = (args) => {
  const [containerWidth, setContainerWidth] = useState(300);

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    setContainerWidth(element.offsetWidth);
  };

  return (
    <ResizableContainer onMouseUp={handleResize}>
      <HorizontalContainer gap={args.gap} containerWidth={containerWidth}>
        <Box>Box 1</Box>
        <Box>Box 2</Box>
      </HorizontalContainer>
    </ResizableContainer>
  );
};

export const Default = Template.bind({});
Default.args = {
  gap: 20, // Default minimum gap value
};
