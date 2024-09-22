import React, { FC } from "react";
import styled from "@emotion/styled";

import { ToggleSlider } from "../MyToggleSwitch1";
import { HorizontalNavBar } from "../Navigation";

interface TopHeaderPaneTheme {
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
}

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
  theme: TopHeaderPaneTheme;
  data: TopHeaderPaneData;
}

interface TopHeaderPaneContainerProps {
  theme: TopHeaderPaneTheme;
  children?: React.ReactNode;
}

const TopHeaderPaneContainer = styled.div<TopHeaderPaneContainerProps>`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.navigationBar.textColor};

  position: fixed;
  top: 0;
  width: 100%;

  // place the top header pane above everything on the z axis
  // in other words imagining the page in 3D the top pane shall be the topmost layer
  // at the highest level
  z-index: 9999; /* Set a high z-index to keep the header on top */

  padding-left: 80px;
  padding-top: 10px;
`;

const TopHeaderPane: FC<TopHeaderPaneProps> = ({
  theme,
  data: { sections, active, onToggle },
}) => {
  return (
    <TopHeaderPaneContainer theme={theme}>
      <ToggleSlider
        active={active}
        onToggle={onToggle}
        barBackgroundColor={theme.themeSwitch.backgroundColor}
        barBackgroundColorActive={theme.themeSwitch.backgroundColorActive}
        handleBackgroundColor={theme.themeSwitch.handleBackgroundColor}
        handleBackgroundColorActive={theme.themeSwitch.handleBackgroundColorActive}
      ></ToggleSlider>
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
    </TopHeaderPaneContainer>
  );
};

export type { TopHeaderPaneProps };
export default TopHeaderPane;
