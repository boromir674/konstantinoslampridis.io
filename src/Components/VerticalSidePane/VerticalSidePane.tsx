/**
 * A Vertical Side Pane, suitable to be on the left or right of a Main one.
 */
import React from "react";
import styled from "@emotion/styled";
import PersonalInfoInterface from "../../PersonalInfoInterface";
import EducationDataInterface from "../../EducationItemDataInterface";
import PersonalInfo, { type PersonalInfoProps } from "../PersonalInfo";
import { Education, AppEducationSectionProps } from "../Education";

interface AppVerticalSidePaneTheme {
  containerBackground?: string;
  textColor?: string;
  personalInfo: PersonalInfoProps["theme"];
  education: AppEducationSectionProps["theme"];
}

interface VerticanSidePaneContainerProps {
  theme: AppVerticalSidePaneTheme;
}

const VerticanSidePaneContainer = styled.div<VerticanSidePaneContainerProps>`
  // left: 0px;
  // background-color: lightblue;
  background-color: ${(props) =>
    props.theme.containerBackground ||
    props.theme.personalInfo.containerBackgroundColor};
  display: flex;
  grid-area: Side;
  flex-direction: column;
  flex-wrap: wrap;
  // fix a bug where the top header is shown above the top-part content
  // of both the Sidepane and the MainPane
  margin-top: 50px;

  max-width: 400px; // Set a maximum width for the side pane
  width: 100%; // Take up as much space as possible, up to the maximum

  // active if the screen width is less than 800px
  @media (max-width: 800px) {
    // flex-direction: column;
    max-width: 800px; // Set a maximum width for the side pane
    width: 100%; // Take up as much space as possible, up to the maximum
  }
`;

interface AppVerticalSidePaneProps {
  theme: AppVerticalSidePaneTheme;
  data: {
    personal: PersonalInfoInterface;
    education: EducationDataInterface[];
  };
}

const VerticalSidePane: React.FC<AppVerticalSidePaneProps> = ({
  theme,
  data,
}) => {
  return (
    <VerticanSidePaneContainer theme={theme}>
      <PersonalInfo theme={theme.personalInfo} userData={data.personal} />
      <Education theme={{ item: theme.education.item }} data={data.education} />
    </VerticanSidePaneContainer>
  );
};

export type { AppVerticalSidePaneProps };
export { VerticalSidePane };
