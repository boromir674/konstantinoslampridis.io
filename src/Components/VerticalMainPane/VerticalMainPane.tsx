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

// Type alias for DRY code
type ResponsiveLocalStorageLayoutTheme = ResponsiveLocalStorageLayoutProps["theme"];
// type alias of ResponsiveLocalStorageLayoutProps["theme"], but without the 'item' key
type NoItemTheme = Omit<ResponsiveLocalStorageLayoutTheme, "item">;
// type alias of ResponsiveLocalStorageLayoutProps["theme"]["item"], but without the 'outline' key
type NoOutlineItemTheme = Omit<ResponsiveLocalStorageLayoutTheme["item"], "outline">;

interface VerticalMainPaneResponsiveLayoutItemTheme extends NoOutlineItemTheme {  // expect external properties to be passed in
  // internal outline type is expected to be an optional string: string | undefined
  // outline value passed in VerticalMainPaneTheme is expected to be { color: string; width: string; }
  // since this Component creates a string out of the object
  outline: {
    color: string;
    // Other Design
    width: string;
  };
}
interface AppVerticalMainPanePortfolioTheme extends NoItemTheme {
  item: VerticalMainPaneResponsiveLayoutItemTheme
};
interface AppVerticalMainPaneTheme {
  // color of outer most div
  // containerBackgroundColor: string;
  introduction: {
    containerBackgroundColor: string;
    textColor: string;
  };
  professional: {
    // Professional Section Heading
    title: ProfessionalSectionProps["theme"]["title"];
    // Professional/Experience Item
    item: {
      backgroundColor: string;
      textColor: string;
      linkColor: string;
      onHoverBackgroundColor: string;
      onHoverTextColor: string;
      // onHoverTransitionDelay: string;
      onHoverTransformDuration: string;
      onHoverBackgroundColorChangeDuration: string;
      title: ProfessionalSectionProps["theme"]["item"]["title"];
      body: ProfessionalSectionProps["theme"]["item"]["body"];
      tag: ProfessionalSectionProps["theme"]["item"]["tag"];
    };
    containerBackgroundColor: string;
  };

  portfolio: AppVerticalMainPanePortfolioTheme;
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
  id?: string;
}

const VerticalMainPane: React.FC<AppVerticalMainPaneProps> = ({
  id,
  theme,
  data,
  sectionIDs,
}) => {
  return (
    <VerticalMainPaneContainer id={id} theme={theme}>
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
          ...theme.professional,
          containerBackgroundColor: theme.professional.containerBackgroundColor,
          // item: theme.professional.item,
          item: {
            ...theme.professional.item,
            tag: theme.professional.item.tag,
            title: theme.professional.item.title,
            body: theme.professional.item.body,
          },
          title: {
            ...theme.professional.title,
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
