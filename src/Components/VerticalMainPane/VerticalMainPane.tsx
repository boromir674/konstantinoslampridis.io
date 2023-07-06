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

interface VerticanMainPaneContainerProps {
  theme: AppVerticalMainPaneTheme;
}

const VerticanMainPaneContainer = styled.div<VerticanMainPaneContainerProps>`
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
}

const VerticalMainPane: React.FC<AppVerticalMainPaneProps> = ({
  theme,
  data,
}) => {
  return (
    <VerticanMainPaneContainer theme={theme}>
      <IntroductionSection
        theme={theme.introduction}
        data={{ name: data.introduction.name }}
      />
      <ProfessionalSection
        theme={{
          ...theme.professional,
          title: {
            textColor: theme.professional.title.textColor,
            backgroundColor: theme.professional.title.backgroundColor || theme.containerBackgroundColor,
        },
        }}
        data={{ experience_items: data.professional }}
      />
    </VerticanMainPaneContainer>
  );
};


export type { AppVerticalMainPaneProps };
export { VerticalMainPane };
