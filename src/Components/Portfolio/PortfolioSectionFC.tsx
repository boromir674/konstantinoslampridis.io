import react, { useState, FC } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "@emotion/styled";

import PortfolioItemCard from './PortfolioItemV2';
import { withDefaultProps } from "../hoc";
import { useElementSize } from "../../Hooks/useElementSize";

import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";

// const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);
import PortfolioItemInterface from "../../PortfolioItemInterface";

interface LayoutItemProps {
  // data-grid
  // i: string;
  // x: number;

  // y: number;
  // w: number;
  // h: number;
  // minW: number;
  // maxW: number;
  // minH: number;
  // maxH: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  resizeHandles?: string[];
  resizeHandle?: react.ReactNode;
  children?: react.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  isBounded?: boolean;
  onDragStart?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
  onDrag?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
  onDragStop?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
  onResizeStart?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
  onResize?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
  onResizeStop?: (layoutItem: LayoutItemProps, event: MouseEvent) => void;
}

const LayoutItem = styled.div<LayoutItemProps>`
  border-style: ridge;
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  // design this item so that its height and width gets adjusted based on contents
  height: max-content;
  width: max-content;
  height: 100%;
  width: 100%;


`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

interface ResponsiveLocalStorageLayoutProps {
  data: PortfolioItemInterface[];
  element_to_render: typeof PortfolioItemCard;
  className?: string;
  cols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  };
  rowHeight: number;
}

const defaultProps = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  rowHeight: 30,
  element_to_render: PortfolioItemCard,
};

const ResponsiveLocalStorageLayout: FC<ResponsiveLocalStorageLayoutProps> = ({
  data,
  // Default props
  element_to_render: ResponsiveLayoutItemContent,
  className,
  cols,
  rowHeight,
}) => {
  // POC hard coded element size tracking
  const [pyPkgGen, { width: widthPyPkgGen, height: heightPyPkgGen }] = useElementSize();
  const [neuralST, { width: widthNeuralST, height: heightNeuralST }] = useElementSize();
  const [topicMT, { width: widthTopicMT, height: heightTopicMT }] = useElementSize();
  // process all heights and set to 5

  const startingPortfolioItemHeightInUnits = 5;
  
  const portfolioHTMLELsRefs = [pyPkgGen, neuralST, topicMT];
  const heightRefs = [heightPyPkgGen, heightNeuralST, heightTopicMT];
  console.log("heightRefs", heightRefs);
  console.log("WIDTHS", widthPyPkgGen, widthNeuralST, widthTopicMT);
  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const resetLayout = () => {
    setLayouts({});
  };

  const onLayoutChange = (layout: any, layouts: any) => {
    saveToLS("layouts", layouts);
    setLayouts(layouts);
  };
  // starting width of each Portfolio Item
  const startingWidth = 4;
  return (
    <div>
      <button onClick={resetLayout}>Reset Layout</button>
      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
      >
        {data.map((item, index) => {
          let row: number = 0;
          let col: number = 0;
          if (index % 2 === 0) {
            col = 0;
          } else {
            col = startingWidth;
          }
          // row is determined by index div 2
          row = Math.floor(index / 2);
          return (
            <LayoutItem
            ref={portfolioHTMLELsRefs[index]}
              key={index}
              data-grid={{
                w: startingWidth,
                h: 5,
                x: col,
                y: row,
                minW: 2,
                minH: 5,
              }}
            >
              <ResponsiveLayoutItemContent data={item}/>
            </LayoutItem>
          );
        })}
      </ResponsiveReactGridLayout>
    </div>
  );
};

function getFromLS(key: string) {
  type LS = {
    [key: string]: any;
  };
  let ls: LS = {};
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      ls = JSON.parse(window.localStorage.getItem("rgl-8") || "{}");
    } catch (e) {
      /* Ignore */
    }
  }
  return ls[key];
}

function saveToLS(key: string, value: any) {
  if (typeof window !== "undefined" && window.localStorage) {
    window.localStorage.setItem(
      "rgl-8",
      JSON.stringify({
        [key]: value,
      })
    );
  }
}

export default withDefaultProps(defaultProps, ResponsiveLocalStorageLayout);
export type { ResponsiveLocalStorageLayoutProps };
export { defaultProps, ResponsiveLocalStorageLayout };