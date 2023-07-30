import React, { FC } from "react";
import styled from "@emotion/styled";

import PortfolioItemDataInterface from '../../../PortfolioItemInterface';

// import { useElementSizeRef } from "../../../Hooks/useElementSizeRef";
// import { useLayoutEffect } from "react";

interface PortfolioLayoutItemContentProps {
  layoutItemID?: string;
  renderProps: (portfolioItemData: PortfolioItemDataInterface) => React.ReactNode;
  data: PortfolioItemDataInterface;

  // allow only one callbakc to subscribe
  listeners_callbacks?: ((
    // width: number,
    height: number,
    layoutItemID?: string,
  ) => void)[];
}

const OuterContainer = styled.div`
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
  // height: max-content;
  width: 90%;
  // when mouse is on element make cursor a pointer
  cursor: pointer;
  // when mouse is over element change color a bit
  // defining outline here is buggy 
`;

const InnerContainer = styled.div`
  // interpret all geometry properties to be relevant to the out side block
  position: absolute;
  padding: 10px;
// TODO SOS make this padding value dynamic
// SHOULD MATCH the variable in PortfolioItemV3.tsx

  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  height: 100%;
  // padding-bottom: 20px;
  &:hover {
    transform: scale(1.01);
    // box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    // background-color:
    // color:
  }
  // define outline here is also buggy
`;



const LayoutItemContent: FC<PortfolioLayoutItemContentProps> = ({
  data,
  listeners_callbacks,
  renderProps,
  layoutItemID,
}) => {
  // const [blockRef, { width, height }] = useElementSizeRef();
  // whenever the width or height change we want to notify our listeners
  // each listener is expected tohave supplied a callback that we use to notify them
  // of the new width and height
  
  // useLayoutEffect(() => {
  //   // notify of height change only when the height state has changed (instead of on all re-renders)
  //   console.log("Calling EFFECT for", title);
  //   console.log("width: " + width);
  //   console.log("height: " + height);
  //   (listeners_callbacks || []).forEach((callback) => {
  //     callback(layoutItemID, height);
  //   });
  // }, [height, layoutItemID]);

  return (
    <OuterContainer>
      {/* <InnerContainer ref={blockRef}> */}
      <InnerContainer>
        {renderProps(data)}
      </InnerContainer>
    </OuterContainer>
  );
};

export default LayoutItemContent;
