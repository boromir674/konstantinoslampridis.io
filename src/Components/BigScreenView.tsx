import { FC } from "react";
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
}

const BigScreenViewContainer = styled.div<BigScreenViewContainerProps>`
  display: grid;
  grid-template-columns: 1fr 3fr;
  //   grid-template-rows: 1fr 3fr 1fr;
  grid-template-rows: 1fr 3fr 1fr;
  grid-template-areas:
    "Header Header"
    "Side Main"
    "Footer Footer";
  // height: 100vh;
  // width: 100vw;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  // background: #ffecb3;
  background: ${(props) => props.theme.containerBackgroundColor};
  //   background: "inherit";
  // display: inline-block;
  word-wrap: break-word;
  margin: 0;
  padding: 0;

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
}) => {
  return (
    <BigScreenViewContainer
      theme={{ containerBackgroundColor: containerBackgroundColor }}
    >
      <TopHeaderPane theme={topHeaderPane} data={topHeaderPaneData} />
      <VerticalSidePane theme={verticalSidePane} data={verticalSidePaneData} />
      <VerticalMainPane theme={verticalMainPane} data={verticalMainPaneData.data} sectionIDs={verticalMainPaneData?.sectionIDs}/>
      <BottomFooterPane theme={bottomFooterPane} />
    </BigScreenViewContainer>
  );
};

export default BigScreenView;
export type { BigScreenViewProps };
