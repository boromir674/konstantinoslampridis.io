import react, { useState, useCallback, FC, useRef } from "react";
import { WidthProvider, Responsive } from "react-grid-layout";
import styled from "@emotion/styled";

import PortfolioItemCard from "./PortfolioItem";
import { withDefaultProps } from "../hoc";
import PortfolioItemInterface from "../../PortfolioItemInterface";

import AppPortfolioItem, { AppPortfolioItemProps } from "./AppPortfolioItem";
import { LayoutInterface } from './LayoutInterface';

import ZIndexContext from '../../ZIndexContext';


import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";


// taken from react-grid-layout source code
type Layout = ReadonlyArray<LayoutInterface>;
// taken from react-grid-layout source code
interface Layouts {
  [P: string]: Layout[];
}

////  GRID ITEM Top Level Component  ////

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
  // margin-bottom: 10px;
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
    // OUTER MOST element of 'Portfolio Header' + 'Portfolio Layout Content'
    container: {
      backgroundColor: string;
    };
    // HEADER with Title; ie 'Open Source & Portfolio'
    sectionHeader: {
      backgroundColor: string;
      color: string;
    };
    // Each Portfolio Item Card
    item: {
      outline?: string;  // styles the 'outline' css of the LayoutItem component
      backgroundColor: string;  // currently not used by the code!
      color: string; // currently used to add css 'color' property to the HEADER ! (todo: dedicate a color field for the header color css property)
      theme: AppPortfolioItemProps['theme'];
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
  /** Governs initial and minimum Height, per Project Card.
   * Change this number, to linearly scale the element's height (exlucindg padding)
   * ie each integer increment will increase the height by 7.07px
  */
  rowHeight: number;
}

// used to set up default values for the properties of the component
// if the client does not provide them
const defaultProps: Partial<ResponsiveLocalStorageLayoutProps> = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  // TODO make this dynamic based on the content of the PortfolioItem
  rowHeight: 41, // governs the length each Portfolio Card will cover on the y axis, on initial render,
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
    oldLayoutItem: LayoutInterface,
    layoutItem: LayoutInterface,
    placeholder: any
  ) => {
    // `oldLayoutItem` contains the state of the item before the resize.
    // You can modify `layoutItem` to enforce constraints.

    // the layoutItemWidths ref is expected to be updated after first component mount,
    // since we attach the storeUpdatedItemWidth as listener to the useElementSize hook
    // of LayoutItems (see below)

    // given the reported height that the content of the LayoutItem needs
    // we set the minHeight accordingly


    // we use dedicated height levels: 4, 7, 8 for to handle 3 cases of maxNumberOfLinksOrReleases

    // rule to handle Portfolio Items without releases or project links
    // if previous Layout had h = 4, we assume it has no releases or links

    // if (oldLayoutItem.h === 4) {
    //   console.log("oldLayoutItem.h === 4");

    // } else if (layoutItem.w <= 2) {

    if (layoutItem.w <= 2) {
      const newValue = layoutItem.h + 2;
      layoutItem.h = newValue;
      placeholder.h = newValue;

    } else if (layoutItem.w <= 3) {
      const newValue = layoutItem.h + 1;
      layoutItem.h = newValue;
      placeholder.h = newValue;
    }

    // if (layoutItem.w <= 2) {
    //   const newValue = layoutItem.h + 2;
    //   layoutItem.h = newValue;
    //   placeholder.h = newValue;
    // } else if (layoutItem.w <= 3) {
    //   const newValue = layoutItem.h + 1;
    //   layoutItem.h = newValue;
    //   placeholder.h = newValue;
    // }
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
        // when resize happens we run this
        // Resize can happen if User drags the Card from the bottom right,
        // in this case we want to dynamically force the Card to NOT shrink its height or width beyond a certain point
        // eg: user might try to decrease height too much, and we want to ensure that contents are visible, which requires a minimum height
        // eg: user might try to decrease width too much, and we want to ensure that contents are visible, which requires a minimum width
        onResize={onResize}
        // If true, WidthProvider will measure the container's width before mounting children.
        // Use this if you'd like to completely eliminate any resizing animation on application/component mount.
        measureBeforeMount={true}
      >
        {data.map((item, index) => {
          let row: number = 0;
          let col: number = 0;

          const maxNumberOfLinksOrReleases = Math.max(
            (item.resource_links || []).length,
            (item.release || []).length,
          );

          if (index % 2 === 0) {
            col = 0;
          } else {
            col = startingWidth;
          }
          // row is determined by index div 2
          row = Math.floor(index / 2);

          // Initialize the zIndex state for this item
          const [zIndex, setZIndex] = useState(0);

          const setStartingHeigth = () => {
            // and a heuristic including the startingWidth and the number of characters in data.description
            // to determine the height of the Portfolio Item

            const nbCharacters = item.description.length;
            const height = maxNumberOfLinksOrReleases < 2 ? 4 : maxNumberOfLinksOrReleases < 3 ? 7 : 9;

            // HEURISTIC
            if (maxNumberOfLinksOrReleases == 3 && nbCharacters < 145) {
              return height - 1
            }
            if (nbCharacters > 200) {
              return height + 1
            }
            if (nbCharacters < 90) {
              return height - 1
            }
            return height
          };


          return (
            <LayoutItem
              //   ref={portfolioHTMLELsRefs[index]}
              key={index}
              data-grid={{
                i: index.toString(),
                w: startingWidth,
                // Card height, on initial render, when local storage is empty
                // each card's height should be determined dynamically, based on the content
                // content depends on the number of Resource Links or Software Releases

                h: setStartingHeigth(),
                x: col,
                y: row,
                minW: 3,
                minH: 7,
              }}
              style={{
                outline: theme.item.outline,
                // allows increasing top-level grid item height, to allow children pop-ups to be visible
                zIndex: zIndex,
              }}
            >
              <ZIndexContext.Provider value={{ zIndex, setZIndex }}>
                <ResponsiveLayoutItemContent
                  data={item}
                  renderProps={(d: PortfolioItemInterface) => {
                    return <AppPortfolioItem data={d} theme={theme.item.theme} />;
                  }}
                />
              </ZIndexContext.Provider>
            </LayoutItem>
          );
        })}
      </ResponsiveReactGridLayout>
    </PortfolioSectionContainer>
  );
};

/** 
* Get a value, from local storage, by key
* @param key - key to get from local storage
* @returns value from local storage
*/
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

/** 
* Save a jsonified key value pair to local storage, under the key "rgl-8".
* @summary Saves a jsonified key value pair to local storage, by setting the
* "rgl-8" key to point to the jsonified key value pair
* @param key - key to save to local storage
* @param value - value to save to local storage
*/
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
