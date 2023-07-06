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
    verticalMainPane: AppVerticalMainPaneProps["data"];
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
  height: 100vh;
  width: 100vw;
  // background: #ffecb3;
  background: ${(props) => props.theme.containerBackgroundColor};
//   background: "inherit";
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
    <BigScreenViewContainer theme={{containerBackgroundColor: containerBackgroundColor}}>
      <TopHeaderPane theme={topHeaderPane} data={topHeaderPaneData} />
      <VerticalSidePane theme={verticalSidePane} data={verticalSidePaneData} />
      <VerticalMainPane theme={verticalMainPane} data={verticalMainPaneData} />
      <BottomFooterPane theme={bottomFooterPane} />
    </BigScreenViewContainer>
  );
};

export default BigScreenView;
