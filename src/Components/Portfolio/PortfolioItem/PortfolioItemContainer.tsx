import React, { FC, forwardRef } from "react";
import styled from "@emotion/styled";

import PortfolioItemDataInterface from '../../../PortfolioItemInterface';

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

const InnerContainer = styled.div`
  // Make Description Text wrap to below line a bit earlier, avoiding word overflow
  width: 95%;
  // when mouse is on element make cursor a pointer
  cursor: pointer;
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

/** Renders the DIV and the children representing a Portfolio Item
 * 
 * The children are entirely controled via the props.data and props.renderProps callback.
 * Responsible for binding whatever ref is passed to it to the inner div DOM element.
 * 
 * Children can, for example, be Title, Description, Resouce Links, Software Releases.
 */
const LayoutItemContent: FC<PortfolioLayoutItemContentProps> = forwardRef<HTMLDivElement, PortfolioLayoutItemContentProps>(({
  data,
  listeners_callbacks,
  renderProps,
  layoutItemID,
}, ref) => {
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
    <InnerContainer ref={ref}>
      {renderProps(data)}
    </InnerContainer>
  );
});

export default LayoutItemContent;
export type { PortfolioLayoutItemContentProps };
