import React, { useState, FC } from "react";
import { WidthProvider, Responsive, Layout } from "react-grid-layout";
import styled from "@emotion/styled";

import PortfolioItemCard from "./PortfolioItem";
import { withDefaultProps } from "../hoc";
import Typography from '../Typography';

import PortfolioItemInterface from "../../PortfolioItemInterface";

import AppPortfolioItem, { AppPortfolioItemProps } from "./AppPortfolioItem";
import { LayoutInterface } from './LayoutInterface';

import ZIndexContext from '../../ZIndexContext';


import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";


//// aliases same as react-grid-layout source code
type LayoutArray = ReadonlyArray<LayoutInterface>;

/**
 * Layouts is an object mapping breakpoints to layouts.
 * e.g. `{lg: Layout[], md: Layout[], ...}`
 */
type LayoutsObject = {
  //     lg: LayoutArray;
  //     md: LayoutArray;
  //     sm: LayoutArray;
  //     xs: LayoutArray;
  //     xxs: LayoutArray;
  [key: string]: LayoutInterface[];
}

//// Local Types for prevent future errors below
type ResponsiveReactGridLayoutOnResize = (layout: LayoutArray, oldLayoutItem: LayoutInterface, layoutItem: LayoutInterface, placeholder: LayoutInterface) => void;

type ResponsiveReactGridLayoutonLayoutChange = (layout: LayoutArray, layouts: LayoutsObject) => void;

////  GRID ITEM Top Level Component  ////

interface LayoutItemProps {
  moved?: boolean;
  static?: boolean;
  isDraggable?: boolean;
  isResizable?: boolean;
  resizeHandles?: string[];
  resizeHandle?: React.ReactNode;
  children?: React.ReactNode;
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

// COMPONENT - Portfolio Section Header/Title
interface PortfolioSectionTitleProps {
  theme: {
    fontFamily: string;
    fontSize: string;
    color: string;
    backgroundColor: string;
  };
};
const PortfolioSectionTitleH1 = withDefaultProps({
  variant: "h1",
}, Typography);
const PortfolioSectionTitle = styled(PortfolioSectionTitleH1) <PortfolioSectionTitleProps>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.backgroundColor};
`;

// COMPONENT - Reset Layout Button

import { ButtonHTMLAttributes } from "react";
interface ResetLayoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: {
    fontFamily: string;
    fontSize: string;
    // color: string;
    // backgroundColor: string;
  };
};
const ResetLayoutButtonWithTypography = withDefaultProps({
  component: 'button',
}, Typography);
const ResetLayoutButton = styled(ResetLayoutButtonWithTypography) <ResetLayoutButtonProps>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
`;
  // color: ${props => props.theme.color};
  // background-color: ${props => props.theme.backgroundColor};


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
    sectionHeader: PortfolioSectionTitleProps["theme"];
    // Reset Layout Button
    resetLayoutButton: ResetLayoutButtonProps["theme"],
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

// COMPONENT - Reactive Grid Layout (with Local Storage support)

// used to set up default values for the properties of the component
// if the client does not provide them
const defaultProps: Partial<ResponsiveLocalStorageLayoutProps> = {
  className: "layout",
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  // TODO make this dynamic based on the content of the PortfolioItem
  rowHeight: 41, // governs the length each Portfolio Card will cover on the y axis, on initial render,
  element_to_render: PortfolioItemCard,
};

/**
 * On initial render, the Portfolio Section will have a default layout, derived automatically by Responsive Grid logic, with Portfolio Items. 
 */
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

    const [layouts, setLayouts] = useState<LayoutsObject>(
      JSON.parse(JSON.stringify(originalLayouts))
    );

  /**
   * Handle resize of Portfolio Item, while user drags and drops the bottom right corner of the Portfolio Item.
   * 
   * @summary This function is called continuously while the user resizes a Portfolio Item.
   * It starts running right after the bottom-right corner is pressed, continues to run while user drags the mouse, and stops running right after mouse is released.
   *
   * It is used to enforce constraints on the resizing of the Portfolio Item.
   *
   * Conditionally modifies the layoutItem and placeholder objects, to enforce constraints on the resizing of the Portfolio Item.
   *
   * Currently it uses simple heuristic for increasing the Height when the Width decreases.
   * 
   * Simple Algorithm::
   * - If      width <= 2 units -->  add 2 units to height
   * - Else If width <= 3 units -->  add 1 unit  to height
   * 
   * @param layout - all Layout Items as array of objects of LayoutInterface type
   * @param oldLayoutItem - the resized LayoutInterface object, before the resize
   * @param layoutItem - the resized LayoutInterface object, after the resize. This object is mutable, and can be modified
   * @param placeholder - 
   */
  const handleItemResize: ResponsiveReactGridLayoutOnResize = (
    layout: ReadonlyArray<LayoutInterface>,
    oldLayoutItem: LayoutInterface,
    layoutItem: LayoutInterface,
    placeholder: LayoutInterface,
  ) => {
    if (layoutItem.w <= 2) {
      const newValue = layoutItem.h + 2;
      // modifying `layoutItem` to enforce constraints
      layoutItem.h = newValue;
      placeholder.h = newValue;

    } else if (layoutItem.w <= 3) {
      const newValue = layoutItem.h + 1;
      // modifying `layoutItem` to enforce constraints
      layoutItem.h = newValue;
      placeholder.h = newValue;
    }
  };

  /**
   * Set the Layouts Object State to empty object {}.
   * 
   * Causes a re-render of the component, with Default Layout automatically derived by React Grid Layout to solve collisions.
   */
  const resetLayout = () => {
    setLayouts({});
  };

  /**
   * Handle any change from user interaction, in the current layout of the Portfolio Items.
   *
   * Runs once on following events:
   *  - after a drag-n-drop action by the user
   *  - after a resize action on an Item (after mouse is released from bottom-right corner) by the user
   *  - after user clicks on the 'Reset Layout' (aka Default Layout) button (after resetLayout)
   *
   * When executed it saves the current layout in local storage, and updates Component state with it.
   *
   * @param currentLayout - the current layout of the Portfolio Items
   * @param allLayouts - all layouts of the Portfolio Items, as a map of breakpoints (ie 'lg', 'md', 'sm', 'xs', 'xxs') to LayoutInterface arrays
   */
  const onLayoutChange: ResponsiveReactGridLayoutonLayoutChange = (
    currentLayout: ReadonlyArray<LayoutInterface>,
    allLayouts: LayoutsObject
  ) => {
    // on layout change we store the layouts object in local storage
    saveToLS("layouts", allLayouts);
    // we store the layouts in the component's state, and trigger a re-render
    setLayouts(allLayouts);
  };

  // CONSTANT: starting width of each Portfolio Item
  const startingWidth = 4;

  return (
    <PortfolioSectionContainer // DIV
      id={htmlID}
      theme={{
        backgroundColor: theme.container.backgroundColor,
        color: theme.item.color,
      }}>
      {/* Portfolio Section TITLE*/}
      <PortfolioSectionTitle theme={theme.sectionHeader}>Open Source & Portfolio</PortfolioSectionTitle>
      {/* Portfolio Section - RESET Layout Button */}
      <ResetLayoutButton onClick={resetLayout} theme={theme.resetLayoutButton}>Reset Layout</ResetLayoutButton>
      {/* <button onClick={resetLayout}>Reset Layout</button> */}
      {/* Portfolio Section - GRID LAYOUT */}
      <ResponsiveReactGridLayout
        className={className}
        cols={cols}
        rowHeight={rowHeight}
        // Initialize Layouts from Local Storage or else with Empty Object
        layouts={layouts}

        // we store the Layouts (breakpoints -> layouts) in the component's state, and local storage when user changes the layout (when an item is droped (after a drag-n-drop), when the user resizes an item after they release of the click button), or when the "Reset Layout" button is clicked
        onLayoutChange={onLayoutChange}

        // handle resize, happening when user drags from bottom right
        // this runs after user clicks bottom-right and while they keep the mouse clicked. It runs 'continuously' on every pixel moved sort-a-thing.
        // currently we use simple heuristic to increase height when width decreases
        onResize={handleItemResize}  // if W <= 2 add 2 H else if W <= 3 add 1 H

        // If true, WidthProvider will measure the container's width before mounting children.
        // Use this if you'd like to completely eliminate any resizing animation on application/component mount.
        measureBeforeMount={true}
      >
        {data.map((item, index) => {
          let row = 0;
          let col = 0;

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
              {/* Initialize the ZIndexContext with state value and setter */}
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
