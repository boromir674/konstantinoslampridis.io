import react, { useState, FC } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "@emotion/styled";
import { withDefaultProps } from "../hoc";

import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";

// const ResponsiveReactGridLayout = useMemo(() => WidthProvider(Responsive), []);

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
`;

const ResponsiveReactGridLayout = WidthProvider(Responsive);
const originalLayouts = getFromLS("layouts") || {};

interface ResponsiveLocalStorageLayoutProps {
  data: {
    title: string;
  }[];
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
};

const ResponsiveLocalStorageLayout: FC<ResponsiveLocalStorageLayoutProps> = ({
  data,
  className,
  cols,
  rowHeight,
}) => {
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
              // css={css`
              //   border-style: ridge;
              // `}
              key={index}
              data-grid={{
                w: startingWidth,
                h: 5,
                x: col,
                y: Infinity,
                minW: 2,
                minH: 3,
              }}
            >
              {item.title}
            </LayoutItem>
          );
        })}
        {/* <div key="1" data-grid={{ w: 2, h: 3, x: 0, y: 0, minW: 2, minH: 3 }}>
          <span className="text">1</span>
        </div>
        <div key="2" data-grid={{ w: 2, h: 3, x: 2, y: 0, minW: 2, minH: 3 }}>
          <span className="text">2</span>
        </div>
        <div key="3" data-grid={{ w: 2, h: 3, x: 4, y: 0, minW: 2, minH: 3 }}>
          <span className="text">3</span>
        </div>
        <div key="4" data-grid={{ w: 2, h: 3, x: 6, y: 0, minW: 2, minH: 3 }}>
          <span className="text">4</span>
        </div>
        <div key="5" data-grid={{ w: 2, h: 3, x: 8, y: 0, minW: 2, minH: 3 }}>
          <span className="text">5</span>
        </div> */}
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
