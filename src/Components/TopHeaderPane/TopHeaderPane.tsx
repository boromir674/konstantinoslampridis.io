import React, { FC } from "react";
import styled from "@emotion/styled";

import { ToggleSlider } from "../MyToggleSwitch1";
import { HorizontalNavBar } from "../Navigation";

interface TopHeaderPaneTheme {
  backgroundColor: string;
  navigationBar: {
    textColor: string;
    backgroundColor: string;
    hoverBackgroundColor: string;
    hoverTextColor: string;
    activatedTextColor: string;
    activatedBackgroundColor: string;
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

  //   grid-column-start: 1;
  //   grid-column-end: 3;
  //   grid-row-start: row1-start;
  //   grid-row-end: 2;
  //   position: fixed;
  top: 0px;
  width: 100%;
  //   justify-self: center;
  //   align-self: center;
  //   grid-area: Header;
  padding-top: 10px;
  padding-right: 80px;
  padding-bottom: 10px;
  padding-left: 80px;
`;

const TopHeaderPane: FC<TopHeaderPaneProps> = ({
  theme,
  data: { sections, active, onToggle },
}) => {
  return (
    <TopHeaderPaneContainer theme={theme}>
      <ToggleSlider active={active} onToggle={onToggle}></ToggleSlider>
      <HorizontalNavBar
        // replace the name key from section objects with the 'label' key to match interface of HorizontalNavBar props
        items={sections.map((section_data) =>
          Object.assign(section_data, { label: section_data.name })
        )}
        activeItem={sections[0].name}
        colorSet={theme.navigationBar}
      />
    </TopHeaderPaneContainer>
  );
};

export default TopHeaderPane;
