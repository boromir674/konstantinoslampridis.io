import react, { useState, useCallback, FC, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "@emotion/styled";

import { withDefaultProps } from "../hoc";
import PortfolioItemInterface from "../../PortfolioItemInterface";

import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";

import PortfolioItemCard from "./PortfolioItemContainer";
import AppPortfolioItem from "./AppPortfolioItem";


// const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

// taken from react-grid-layout source code
interface LayoutItemType {
  w: number;
  h: number;
  x: number;
  y: number;
  i: string;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  resizeHandles?: Array<"s" | "w" | "e" | "n" | "sw" | "nw" | "se" | "ne">;
  isBounded?: boolean;
}
// taken from react-grid-layout source code
type Layout = ReadonlyArray<LayoutItemType>;
// taken from react-grid-layout source code
interface Layouts {
  [P: string]: Layout[];
}

interface LayoutItemProps {
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

interface PortfolioSectionContainerProps {
  theme: {
    backgroundColor: string;
    color: string;
  };
}
const PortfolioSectionContainer = styled.div<PortfolioSectionContainerProps>`
  background-color: ${(props) => props.theme.backgroundColor};
  color: ${(props) => props.theme.color};
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

interface ResponsiveLocalStorageLayoutProps {
  id: string;
  data: PortfolioItemInterface[];
  theme: {
    container: {
      backgroundColor: string;
    };
    sectionHeader: {
      backgroundColor: string;
      color: string;
    };
    item: {
      outline?: string;
      backgroundColor: string;
      color: string;
      urlLinkTextColor: string;
      onHoverURLLinkTextColor: string;
    };
  };
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
  id: htmlID,
  data,
  theme,
  // Default props
  element_to_render: ResponsiveLayoutItemContent,
  className,
  cols,
  rowHeight,
}) => {
  // this component uses a react 'ref' (aka reference in any programming language)
  // to store the content heights as reported per item in the layout
  // The value of the reference is persisted (remains unchanged) between component re-renderings;
  // Updating a reference doesn't trigger a component re-rendering.
  // numerical id to number mapping
  // const layoutItemHeights = useRef<{ [key: string]: number }>({});
  // console.log("HEIGHTS", layoutItemHeights.current);
  // const layoutItemHeights = useRef<Record<string, number>>({});

  // const storeUpdatedItemHeight = useCallback((id: string, height: number) => {
  //   // designed as a handler (or the update function of a listener)
  //   // SHOULD MATCH the variable in PortfolioItemV3.tsx
  //   const padding = 10;
  //   layoutItemHeights.current[id] = height - 2 * padding;
  //   console.log("UPDATE Heights with", id, height);
  //   console.log("NEW Heights", layoutItemHeights.current);
  // }, []);

  const onResize = (
    layout: Layout,
    oldLayoutItem: LayoutItemType,
    layoutItem: LayoutItemType,
    placeholder: any
  ) => {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    // the layoutItemWidths ref is expected to be updated after first component mount,
    // since we attach the storeUpdatedItemWidth as listener to the useElementSize hook
    // of LayoutItems (see below)

    // given the reported height that the content of the LayoutItem needs
    // we set the minHeight accordingly

    // const contentHeight = layoutItemHeights.current[layoutItem.i]
    // console.log("ON RESIZE", layoutItem.i, contentHeight);
    // const requiredHeightUnits = Math.ceil(contentHeight / rowHeight);
    // console.log("REQ HEIGHT", layoutItem.i, requiredHeightUnits);
    // layoutItem.h = requiredHeightUnits;
    // placeholder.h = requiredHeightUnits;

    // Example
    // if (layoutItem.h < 3 && layoutItem.w > 2) {
    //   layoutItem.w = 2;
    //   placeholder.w = 2;
    // }

    // if (layoutItem.h >= 3 && layoutItem.w < 2) {
    //   layoutItem.w = 2;
    //   placeholder.w = 2;
    // }

    if (layoutItem.w <= 2) {
      const newValue = layoutItem.h + 2;
      layoutItem.h = newValue;
      placeholder.h = newValue;
    } else if (layoutItem.w <= 3) {
      const newValue = layoutItem.h + 1;
      layoutItem.h = newValue;
      placeholder.h = newValue;
    }
  };

  const [layouts, setLayouts] = useState(
    JSON.parse(JSON.stringify(originalLayouts))
  );

  const resetLayout = () => {
    // we set the state layouts to {} empty,
    // which triggers a re-render, which initializes component
    // with layouts from storage if found, or else with {}, which
    // lets React Grid Layout to decide how to solve collisions
    setLayouts({});
  };

  // code executed on layout change
  // eg when user drags an item around
  // when user resizes an item)
  // the layout object encodes the current state of the grid and items in it (positions, sizes)
  const onLayoutChange = (layout: Layout, layouts: any) => {
    // on layout change we store the layouts object in local storage
    saveToLS("layouts", layouts);
    // we store the layouts in the component's state
    setLayouts(layouts);
    // log in console a formatted string to show the current layout
    // console.log("LAYOUTS", layouts);
  };
  // starting width of each Portfolio Item
  const startingWidth = 4;
  return (
    <PortfolioSectionContainer
    id={htmlID}
    theme={{
      backgroundColor: theme.container.backgroundColor,
      color: theme.item.color,
    }}>
      {/* Portfolio Section TITLE*/}
      <h1 style={{ ...theme.sectionHeader }}>Open Source & Portfolio</h1>
      <button onClick={resetLayout}>Reset Layout</button>
      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        layouts={layouts}
        onLayoutChange={onLayoutChange}
        onResize={onResize}
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
              //   ref={portfolioHTMLELsRefs[index]}
              key={index}
              data-grid={{
                i: index.toString(),
                w: startingWidth,
                h: 7,
                x: col,
                y: row,
                minW: 3,
                minH: 7,
              }}
              style={{
                outline: theme.item.outline,
              }}
            >
              <ResponsiveLayoutItemContent
                data={item}
                renderProps={(d: PortfolioItemInterface) => {
                  return <AppPortfolioItem data={d} theme={{
                    urlLinkTextColor: theme.item.urlLinkTextColor,
                    onHoverURLLinkTextColor: theme.item.onHoverURLLinkTextColor,
                  }} />;
                }}

                // layoutItemID={index.toString()}
                // data={item}
                // listeners_callbacks={[storeUpdatedItemHeight]}
              />
            </LayoutItem>
          );
        })}
      </ResponsiveReactGridLayout>
    </PortfolioSectionContainer>
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

// allow client to ommit any of items in the defaultProps, since we have set up fallbacks
export default withDefaultProps(defaultProps, ResponsiveLocalStorageLayout);
export type { ResponsiveLocalStorageLayoutProps };
export { defaultProps, ResponsiveLocalStorageLayout };
