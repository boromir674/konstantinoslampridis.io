/**
 * A Vertical Main Pane, suitable to be accompanied by a Side Pane on the left or right.
 */
import React from "react";
import styled from "@emotion/styled";

import IntroductionSection from "../IntroductionSection";
import ExperienceItemData from "../../ExperienceItemDataInterface";
import ProfessionalSection from "../Professional";
// import PortfolioSection from "../Portfolio";

interface AppVerticalMainPaneTheme {
containerBackgroundColor: string;
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
  professional: {
    title: {
      textColor: string;
      backgroundColor?: string;
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
    containerBackgroundColor: string;
  };
}


interface VerticalMainPaneContainerProps {
  theme: AppVerticalMainPaneTheme;
  // sectionIDs: SectionIDs
}

const VerticalMainPaneContainer = styled.div<VerticalMainPaneContainerProps>`
  left: 0px;
  // background-color: ${(props) => props.theme.containerBackgroundColor};
  background-color: #f6f8fa;
  //   display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap;
  grid-area: Main;
`;

interface AppVerticalMainPaneProps {
  theme: AppVerticalMainPaneTheme;
  data: {
    introduction: {
      name: string;
    };
    professional: ExperienceItemData[];
    // portfolio: PortfolioItemData[];
  };
  sectionIDs?: string[];
}

const VerticalMainPane: React.FC<AppVerticalMainPaneProps> = ({
  theme,
  data,
  sectionIDs,
}) => {
  return (
    <VerticalMainPaneContainer theme={theme}>
      {/* Scrollable Section 1 */}
      <IntroductionSection
        id={sectionIDs ? sectionIDs[0] : "introduction-section"}
        theme={theme.introduction}
        data={{ name: data.introduction.name }}
      />
      {/* Scrollable Sectoin 2 */}
      <ProfessionalSection
        id={sectionIDs ? sectionIDs[1] : "professional-section"}
        theme={{
          ...theme.professional,
          title: {
            textColor: theme.professional.title.textColor,
            backgroundColor: theme.professional.title.backgroundColor || theme.containerBackgroundColor,
        },
        }}
        data={{ experience_items: data.professional }}
      />
    </VerticalMainPaneContainer>
  );
};


export type { AppVerticalMainPaneProps };
export { VerticalMainPane };
