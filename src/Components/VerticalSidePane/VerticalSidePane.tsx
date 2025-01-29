/**
 * A Vertical Side Pane, suitable to be on the left or right of a Main one.
 */
import React, { type FC } from "react";
import styled from "@emotion/styled";
import PersonalInfoInterface from "../../PersonalInfoInterface";
import EducationDataInterface from "../../EducationItemDataInterface";
import PersonalInfo, { type PersonalInfoProps } from "../PersonalInfo";
import { Education, AppEducationSectionProps } from "../Education";


const StyledDiv = styled.div<{theme: { containerBackground?: string }}>`
  // left: 0px;
  // background-color: lightblue;
  background-color: ${(props) =>
    props.theme.containerBackground};
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
  theme: {
    containerBackground?: string;
    textColor?: string;
    personalInfo: PersonalInfoProps["theme"];
    education: AppEducationSectionProps["theme"];
  };
  data: {
    personal: PersonalInfoInterface;
    education: EducationDataInterface[];
  };
}

const VerticalSidePane: FC<AppVerticalSidePaneProps> = ({ theme, data }) => {
  return (
    <StyledDiv theme={{
      containerBackground: theme.containerBackground || theme.personalInfo.containerBackgroundColor,
    }}>
      <PersonalInfo theme={theme.personalInfo} userData={data.personal} />
      <Education theme={{ item: theme.education.item }} data={data.education} />
    </StyledDiv>
  );
};

export { VerticalSidePane, type AppVerticalSidePaneProps };
