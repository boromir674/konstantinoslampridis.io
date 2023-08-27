/**
 * A Vertical Main Pane, suitable to be accompanied by a Side Pane on the left or right.
 */
import React from "react";
import styled from "@emotion/styled";

import IntroductionSection from "../IntroductionSection";
import ExperienceItemData from "../../ExperienceItemDataInterface";
import PortfolioItemData from "../../PortfolioItemInterface";
import ProfessionalSection, { ProfessionalSectionProps } from "../Professional";
// import PortfolioSection from "../Portfolio";
import PortfolioSection, {
  ResponsiveLocalStorageLayoutProps,
} from "../Portfolio/PortfolioSectionV3";

interface AppVerticalMainPaneTheme {
  // color of outer most div
  // containerBackgroundColor: string;
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
  professional: {
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
      tag: ProfessionalSectionProps["theme"]["item"]["tag"];
    };
    containerBackgroundColor: string;
  };
  // portfolio: {
  //   // Color Mode Design
  //   color: string;
  //   // Other Design
  //   width: string;
  // };
  portfolio: {
    container: {
      backgroundColor: string;
    };
    sectionHeader: {
      backgroundColor: string;
      color: string;
    };
    item: {
      backgroundColor: string;
      color: string;
      urlLinkTextColor: string;
      outline: {
        // Color Mode Design
        color: string;
        // Other Design
        width: string;
      };
    };
  };
}

interface VerticalMainPaneContainerProps {
  theme: AppVerticalMainPaneTheme;
  // sectionIDs: SectionIDs
}

const VerticalMainPaneContainer = styled.div<VerticalMainPaneContainerProps>`
  left: 0px;
  // background-color: (props) => props.theme.containerBackgroundColor}
  // background-color: inherit;
  grid-area: Main;
  // hard-coded fix which prevents a bug:
  // bug being from a certain level of zoom (and above) the top header pane starts to
  // cover the top part content of both SidePane and MainPane
  margin-top: 50px;
  // display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap;

  display: inline-block;
  // word-wrap: break-word;
  // display: flex;
  // flex-direction: column;
  // box-sizing: border-box
  // overflow: auto; /* Introduce a scrollbar if necessary */
`;

interface AppVerticalMainPaneProps {
  theme: AppVerticalMainPaneTheme;
  data: {
    introduction: {
      name: string;
    };
    professional: ExperienceItemData[];
    portfolio: PortfolioItemData[];
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
      {/* Scrollable Section 2 */}
      <ProfessionalSection
        id={sectionIDs ? sectionIDs[1] : "professional-section"}
        theme={{
          containerBackgroundColor: theme.professional.containerBackgroundColor,
          item: theme.professional.item,
          title: {
            textColor: theme.professional.title.textColor,
            backgroundColor:
              theme.professional.title.backgroundColor
          },
        }}
        data={{ experience_items: data.professional }}
      />
      {/* Scrollable Section 3 */}
      <PortfolioSection
        id={sectionIDs ? sectionIDs[2] : "open-source-portfolio-section"}
        data={data.portfolio}
        theme={{
          ...theme.portfolio,
          item: {
            ...theme.portfolio.item,
            outline: `${theme.portfolio.item.outline.width} solid ${theme.portfolio.item.outline.color}`,
            urlLinkTextColor: theme.portfolio.item.urlLinkTextColor,
          },
        }}
      />
    </VerticalMainPaneContainer>
  );
};

export type { AppVerticalMainPaneProps };
export { VerticalMainPane };
