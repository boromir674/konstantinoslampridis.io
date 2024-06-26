/**
 * A Vertical Main Pane, suitable to be accompanied by a Side Pane on the left or right.
 */
import React from "react";
import styled from "@emotion/styled";

import IntroductionSection from "../IntroductionSection";
import ExperienceItemData from "../../ExperienceItemDataInterface";
import PortfolioItemData from "../../PortfolioItemInterface";
import ProfessionalSection, { ProfessionalSectionProps } from "../Professional";
import PortfolioSection, { ResponsiveLocalStorageLayoutProps } from "../Portfolio";

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
  // portfolio: ResponsiveLocalStorageLayoutProps["theme"];
  portfolio: {
    container: ResponsiveLocalStorageLayoutProps["theme"]["container"];
    // {
    //   backgroundColor: string;
    // };
    sectionHeader: ResponsiveLocalStorageLayoutProps["theme"]["sectionHeader"];
    item: {
      backgroundColor: string;
      color: string;
      outline: {
        // Color Mode Design
        color: string;
        // Other Design
        width: string;
      };
      theme: ResponsiveLocalStorageLayoutProps["theme"]["item"]["theme"];
    };
  };
}

interface VerticalMainPaneContainerProps {
  theme: AppVerticalMainPaneTheme;
  // sectionIDs: SectionIDs
}

const VerticalMainPaneContainer = styled.div<VerticalMainPaneContainerProps>`
  // hard-coded fix which prevents a bug:
  // bug being from a certain level of zoom (and above) the top header pane starts to
  // cover the top part content of both SidePane and MainPane
  margin-top: 50px;

  // display: flex;
  //   flex-direction: column;
  //   flex-wrap: wrap;

  display: inline-block;

  box-sizing: border-box

  // border-bottom: 1px solid #000;
  padding-bottom: 120px; // Adjust this value to match the height of the footer


  // overflow: auto; /* Introduce a scrollbar if necessary */

  // this is designed a a vertical view, so a margin bottom is used to prevent
  // content overlal with the Footer, which has CSS 'position: fixed'
  margin-bottom: 55px;

  // active if the screen width is less than 800px
  @media (max-width: 800px) {
    margin-bottom: 50px;
  }
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
            theme: {
              // add 'links' (and nested object) and all keys
              ...theme.portfolio.item.theme,
              // add 'releases' key and nested object
              releases: {
                ...theme.portfolio.item.theme.releases,
              }
            }
          },
        }}
      />
    </VerticalMainPaneContainer>
  );
};

export type { AppVerticalMainPaneProps };
export { VerticalMainPane };
