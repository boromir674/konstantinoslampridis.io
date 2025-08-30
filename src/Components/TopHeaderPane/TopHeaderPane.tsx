import React, { FC } from "react";
import styled from "@emotion/styled";

import { ToggleSlider } from "../MyToggleSwitch1";
import { HorizontalNavBar } from "../Navigation";
import Typography from '../Typography';

import { withDefaultProps } from '../hoc';

/**
 * Data that the TopHeaderPane (for big screens) can receive
 * @summary This is how the App represents the Personal Information of a Person.
 * @interface PersonalInfo
 * @property {string[]} sectionNames - The names of the sections that the user can navigate to.
 * @property {(active: boolean): void} onToggle - The function that is called when the toggle is clicked, given current state of the toggle.
 * @property {boolean} active - The current state of the toggle; active = true means toggle on the right.
 **/
interface TopHeaderPaneData {
  sections: {
    name: string;
    to_element_id: string;
  }[];
  // sectionNames: string[];
  // if active is true it means toggle is on the left
  onToggle: (active: boolean) => void;
  // if true is given for active then the toggle starting position would be on the right
  active: boolean;
}

interface TopHeaderPaneProps {
  theme: {
    backgroundColor: string;
    navigationBar: {
      fontFamily: string;
      fontSize: string;
      textColor: string;
      backgroundColor: string;
      hoverBackgroundColor: string;
      hoverTextColor: string;
      activatedTextColor: string;
      activatedBackgroundColor: string;
    };
    themeSwitch: {
      backgroundColor: string;
      backgroundColorActive: string;
      handleBackgroundColor: string;
      handleBackgroundColorActive: string;
    };
  };
  data: TopHeaderPaneData;
  navBarLeftOffset?: number; // Optional left offset for navbar positioning
}


const TopHeaderPaneContainerDIV = styled.div<{theme: {
  backgroundColor: string;
  color: string;
}}>`
  box-sizing: border-box;
  width: 100%; /* Full width within its container */
  
  /* Sticky positioning - stays at top when scrolling */
  position: sticky;
  top: 0;
  z-index: 9999; /* Ensure it stays above other content */
  
  // required for "always visible" nav bar
  // otherwise when scrolling it will not have the desired effect of obscuring content underneath it
  // in other words the elements would be visible, which is sth we don't want as a property of an "always visible" nav bar
  background-color: var(--app-brand-color-area, --app-surface-raised, ${(props) => props.theme.backgroundColor});

  // Flexbox layout for better control
  display: flex;
  align-items: flex-start; /* Allow content to grow vertically */
  padding: 15px 80px;
  min-height: 60px; /* Minimum height but allow growth */
  height: auto; /* Allow flexible height */
  overflow: visible; /* Allow content to be visible if it overflows */
  // gap: 20px; /* Add space between toggle section and navigation */
  
  gap: 10px; /* Add gap between wrapped items */

  /* Responsive behavior for small screens */
  @media (max-width: 768px) {
    min-height: 60px;
    flex-direction: column;
    gap: 15px; /* Smaller gap for mobile */
    padding: 10px 20px;
    align-items: center; /* Center items on small screens */
    position: relative;
  }
`;

// Container for theme toggle + label
const ThemeToggleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 1; /* Ensure toggle stays above navigation */
`;

// Spacer to balance the layout on large screens
const Spacer = styled.div`
  @media (min-width: 769px) {
    width: 180px; /* Approximate width of toggle section for balance */
  }
  
  @media (max-width: 768px) {
    display: none; /* Hide on mobile where layout stacks */
  }
`;

// Color Mode Label for accessibility
const ThemeLabel = styled(withDefaultProps({
  component: 'span',
}, Typography))`
  color: var(--app-brand-color-area-text, --app-text-secondary);
  font-size: var(--app-font-size-heading-sm, 16ps);
  font-weight: 500;
  user-select: none;
`;
// const ThemeLabel = styled.span`
//   color: var(--app-text-secondary);
//   font-size: 14px;
//   font-weight: 500;
//   user-select: none;
// `;

// Container for navigation with custom offset
const NavBarSection = styled.div<{ leftOffset: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;

  transform: translateX(calc(${(props) => props.leftOffset}px));
  flex-wrap: wrap; /* Allow wrapping */
  gap: 10px; /* Add gap between wrapped items */

  width: 100%;
  // max-width: 60vw; /* Limit width to prevent too much spreading */
  position: relative;

  // flex: 1; /* Take remaining space */
  // max-width: 60%; /* Don't take too much space */


  /* Ensure the navigation items can wrap */
  & > * {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  
  /* Small screens: Normal flow positioning */
  @media (max-width: 768px) {
    left: auto;
    top: auto;
    transform: none;
    width: 100%;
    max-width: 100%;
    justify-content: center;
  }
`;

const TopHeaderPane: FC<TopHeaderPaneProps> = ({
  theme,
  data: { sections, active, onToggle },
  navBarLeftOffset = 0, // Default to no offset
}) => {
  return (
    <TopHeaderPaneContainerDIV theme={{
      backgroundColor: theme.backgroundColor,
      color: theme.navigationBar.textColor,
    }}>
      {/* Left side: Theme toggle + label */}
      <ThemeToggleSection>
        <ToggleSlider
          active={active}
          onToggle={onToggle}
          barBackgroundColor={theme.themeSwitch.backgroundColor}
          barBackgroundColorActive={theme.themeSwitch.backgroundColorActive}
          handleBackgroundColor={theme.themeSwitch.handleBackgroundColor}
          handleBackgroundColorActive={theme.themeSwitch.handleBackgroundColorActive}
        />
        <ThemeLabel>
          {active ? 'Dark' : 'Light'}
        </ThemeLabel>
      </ThemeToggleSection>

      {/* Center: Navigation bar positioned over main content area */}
      <NavBarSection leftOffset={navBarLeftOffset}>
        <HorizontalNavBar
          // replace the name key from section objects with the 'label' key to match interface of HorizontalNavBar props
          items={sections.map((section_data) =>
            Object.assign(section_data, { label: section_data.name })
          )}
          activeItem={sections[0].name}
          theme={{
            fontFamily: theme.navigationBar.fontFamily,
            fontSize: theme.navigationBar.fontSize,
            colorSet: theme.navigationBar,
            padding: {
              vertical: "8px",
              horizontal: "28px",
            },
          }}
        />
      </NavBarSection>
    </TopHeaderPaneContainerDIV>
  );
};

export type { TopHeaderPaneProps };
export default TopHeaderPane;
