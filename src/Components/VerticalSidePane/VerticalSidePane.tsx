/** 
* A Vertical Side Pane, suitable to be on the left or right of a Main one.
*/
import React from "react";
import styled from "@emotion/styled";
import PersonalInfoInterface from "../../PersonalInfoInterface";
import EducationDataInterface from "../../EducationItemDataInterface";
import PersonalInfo from "../PersonalInfo";
import { Education } from "../Education";

interface AppVerticalSidePaneTheme {
  containerBackground?: string;
  textColor?: string;
  personalInfo: {
    containerBackgroundColor: string;
    textColor: string;
    linkColor: string;
  };
  education: {
    containerBackgroundColor: string;
    title: {
      textColor: string;
      backgroundColor: string;
    };
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      // onHoverTransitionDelay: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
    };
  };
}

interface VerticanSidePaneContainerProps {
  theme: AppVerticalSidePaneTheme;
}

const VerticanSidePaneContainer = styled.div<VerticanSidePaneContainerProps>`
  left: 0px;
  // background-color: lightblue;
  background-color: ${(props) => props.theme.containerBackground || props.theme.personalInfo.containerBackgroundColor};
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
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

export default VerticalSidePane;
