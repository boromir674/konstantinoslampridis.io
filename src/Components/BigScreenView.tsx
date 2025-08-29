import React, { FC } from "react";
import styled from "@emotion/styled";

import TopHeaderPane, { TopHeaderPaneProps } from "./TopHeaderPane";
import BottomFooterPane, { BottomFooterPaneProps } from "./BottomFooterPane";
import VerticalMainPane, { AppVerticalMainPaneProps } from "./VerticalMainPane";
import VerticalSidePane, { AppVerticalSidePaneProps } from "./VerticalSidePane";

interface BigScreenViewContainerProps {
  children?: React.ReactNode;
  theme: {
    containerBackgroundColor: string;
  };
}

interface BigScreenViewProps {
  theme: {
    containerBackgroundColor: string;
    topHeaderPane: TopHeaderPaneProps["theme"];
    verticalSidePane: AppVerticalSidePaneProps["theme"];
    verticalMainPane: AppVerticalMainPaneProps["theme"];
    bottomFooterPane: BottomFooterPaneProps["theme"];
  };
  data: {
    topHeaderPane: TopHeaderPaneProps["data"];
    verticalSidePane: AppVerticalSidePaneProps["data"];
    verticalMainPane: {
      data: AppVerticalMainPaneProps["data"];
      sectionIDs?: string[];
    }
    // bottomFooterPane: BottomFooterPaneProps['data'];
  };
  html?: {
    verticalMainPaneID?: string;
    bottomFooterPaneID?: string;
  };
}

const BigScreenViewContainer = styled.div<BigScreenViewContainerProps>`
  // background-color: var(teal, --app-color-main-area);
  //   background-color: var(blue, --app-color-main-area);

  box-sizing: border-box;
 
  // when no css reset the below achieve the effect of not having a vertical scroll but all the time the app is inside-enough the viewport to avoid the horizontal scroll bar
  width: 100%;
  height: 100%;

  word-wrap: break-word;
  margin: 0;
  padding: 0;
  position: relative; /* Establish positioning context */

  /* Main layout: Column with header, main content, footer */
  display: flex;
  flex-direction: column;
`;

/* Container for the main content area (side + main panes) */
const MainContentArea = styled.div`
  // background-color: var(green, --app-color-main-area);
  background-color: var(--app-color-main-area);

  display: flex;
  flex-direction: row;

  flex: 1; /* Take remaining space after header/footer */

  // min-height: 0; /* Allows flex items to shrink, but makes no difference in practice*/

  // active if the screen width is less than 800px
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const BigScreenView: FC<BigScreenViewProps> = ({
  theme: {
    containerBackgroundColor,
    topHeaderPane,
    verticalSidePane,
    verticalMainPane,
    bottomFooterPane,
  },
  data: {
    topHeaderPane: topHeaderPaneData,
    verticalSidePane: verticalSidePaneData,
    verticalMainPane: verticalMainPaneData,
    // bottomFooterPane: bottomFooterPaneData,
  },
  html,
}) => {
  return (
    <BigScreenViewContainer
      theme={{ containerBackgroundColor: containerBackgroundColor }}
    >
      {/* Header - static at top */}
      <TopHeaderPane theme={topHeaderPane} data={topHeaderPaneData} />
      
      {/* Main content area - flex row with side and main panes */}
      <MainContentArea>
        <VerticalSidePane theme={verticalSidePane} data={verticalSidePaneData} />
        <VerticalMainPane 
          id={html?.verticalMainPaneID} 
          theme={verticalMainPane} 
          data={verticalMainPaneData.data} 
          sectionIDs={verticalMainPaneData?.sectionIDs} 
        />
      </MainContentArea>
      
      {/* Footer - static at bottom */}
      <BottomFooterPane id={html?.bottomFooterPaneID} theme={bottomFooterPane} />
    </BigScreenViewContainer>
  );
};

export default BigScreenView;
export type { BigScreenViewProps };
