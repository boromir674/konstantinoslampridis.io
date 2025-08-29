import React, { type ButtonHTMLAttributes, useRef, useState, FC } from "react";
import styled from "@emotion/styled";
import { Responsive, type ResponsiveProps } from "react-grid-layout";

// Import Interfaces for type checking
import PortfolioItemInterface from "../../PortfolioItemInterface";
import { LayoutsObject } from '../../interfaces';

// Import Hooks
import useDimsReporter from '../../Hooks/useExposeStatelessDimsReporter';
import useGridLayoutHandlers from '../../Hooks/useReactGridLayoutHandlers';
import useLayoutsState from '../../Hooks/useLayoutsState';

// Import HoC
import WidthProvider from '../../HoC/WidthProvider';
import { withDefaultProps } from "../hoc";
// Import Context for managing ZIndex
import ZIndexContext from '../../ZIndexContext';

// Import App Components for rendering contents of each Portfolio Item
import PortfolioItemCard from "./PortfolioItem";
import Typography from '../Typography';
import AppPortfolioItem, { type AppPortfolioItemProps } from "./AppPortfolioItem";

import "../../css/react-grid-layout.css";
import "../../css/react-resizable.css";


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

////  GRID ITEM Top Level DIV Component  ////
const LayoutItem = styled.div<LayoutItemProps>`
  // Highly impactful on UX/UI
  border-style: solid;
  border-width: 1px;

  // groove, inset, outset, ridge, solid, dashed, dotted, double, none, hidden
  // border color
  border-color: var(--app-interactive-primary);

  // background-color has no effect here

  display: flex;
  flex-direction: column;

  // design this item so that its height and width gets adjusted based on contents
  height: max-content;
  width: max-content;
  height: 100%;

  background-color: var(--app-container-primary);
  padding: 0px;
  // hover does not work here, only in InnerContainer

  width: 100%;
  // margin-bottom: 10px;

  // prevent iner children from overflowing
  // overflow: hidden;
`;
//// TOP LEVEL DIV COMPONENT ////
const PortfolioSectionContainer = styled.div<{
  theme: {
    backgroundColor: string;
    color: string;
  }
}>`
  background-color: var(--app-surface-primary);
  color: var(--app-text-primary);
  font-family: var(--app-font, inherit);
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
const PortfolioSectionTitle = styled(withDefaultProps({
  variant: "h1",
}, Typography)) <PortfolioSectionTitleProps>`
  font-family: font-family: var(--app-font, inherit);
  font-size: var(--app-font-size-heading-2xl, 32px);
  color: var(--app-text-primary, ${props => props.theme.color});
  background-color: var(--app-color-main-area, --app-surface-primary, ${props => props.theme.backgroundColor});
  padding-bottom: 20px;
`;

// COMPONENT - Reset Layout Button

interface ResetLayoutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: {
    fontFamily: string;
    fontSize: string;
    // color: string;
    // backgroundColor: string;
  };
};
const ResetLayoutButton = styled(withDefaultProps({
  component: 'button',
}, Typography)) <ResetLayoutButtonProps>`
  font-family: ${props => props.theme.fontFamily};
  font-size: ${props => props.theme.fontSize};
  margin-bottom: 10px;
  marging-left: 10px;
`;
// color: ${props => props.theme.color};
// background-color: ${props => props.theme.backgroundColor};

// WITH WIDTH from WINDOW
const ResponsiveReactGridLayout = WidthProvider<ResponsiveProps>(Responsive);

type RenderProps = (data: PortfolioItemInterface, theme: AppPortfolioItemProps['theme'], refs?: React.RefObject<HTMLElement>[]) => React.ReactNode;
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
  // The Render Props Callback to override defaults
  // renderProps={(d: PortfolioItemInterface) => {
  //   return <AppPortfolioItem data={d} theme={theme.item.theme} />;  // Fragment of elements (title, content, etc)
  // }}
  renderProps: RenderProps;

  // Direct Child Component of LayoutItem that receives Render Props Callback
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

// DESIGNER's ENTRYPOINT
interface AppPortfolioSectionDefaults {
  className: string,
  cols: {
    lg: number;
    md: number;
    sm: number;
    xs: number;
    xxs: number;
  },
  rowHeight: number,
  renderProps: RenderProps,
  element_to_render: typeof PortfolioItemCard,
}

type DefaultsType<T> = T extends Partial<ResponsiveLocalStorageLayoutProps> ? T : never;
// T should be checked that is a Partial<ResponsiveLocalStorageLayoutProps>
// type DefaultMaker<T> = () 

// used to set up default values for the properties of the component
// if the client does not provide them
/** Default Design of breakpoints via 'cols' */
const defaultProps: DefaultsType<AppPortfolioSectionDefaults> = {
  className: "layout",
  // className: 'react-grid-layout',
  cols: { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 },
  // TODO make this dynamic based on the content of the PortfolioItem
  rowHeight: 41, // governs the length each Portfolio Card will cover on the y axis, on initial render,
  // Responsible for Content of Grid Item
  renderProps: (data, theme, refs) => <AppPortfolioItem data={data} theme={theme} refs={refs} />,
  // Direct Child Component of LayoutItem that receives the above Render Props Callback
  // Responsible for Styles of Grid Item
  element_to_render: PortfolioItemCard,  // 1 DIV, with children the renderProps(data, theme) result
};

/// Local Type Checking
type Reducer<S, T> = (acc: S, _: T, index: number) => S;
type ContentItem = { ref: React.RefObject<HTMLElement>, dimsReporter: () => { width: number; height: number } };
type ContentRegistry = Record<string, ContentItem[]>;


// COMPONENT - Reactive Grid Layout (with Local Storage support)
/**
 * On initial render, the Portfolio Section will have a default layout, derived automatically by Responsive Grid logic, with Portfolio Items. 
 */
const ResponsiveLocalStorageLayout: FC<ResponsiveLocalStorageLayoutProps> = ({
  id: htmlID,
  data,
  theme,
  // Default props
  renderProps: inputRenderProps,  // Renders Component with Content
  element_to_render: ResponsiveLayoutItemContent,  // 2 DIVS
  className,
  cols,
  rowHeight,
}) => {

  // Code for implementing Saving and Loading Layouts from Local Storage
  const [layouts, setLayouts, saveToLS] = useLayoutsState();

  // Intialize Ref storing the ContentRegistry of each Portfolio Item
  const reducer: Reducer<ContentRegistry, PortfolioItemInterface> = (acc, _, index) => {
    // we support binding 3 DOM Elements of Portfolio Item Content Elements
    acc[index.toString()] = Array.from({ length: 3 }, () => {
      const [ref, dimsReporter] = useDimsReporter();
      return {
        ref,
        dimsReporter,
      }
    });
    return acc;
  }
  // DECLARE ContentRegistry Ref, as mapping of Grid Item IDs to Array of 3 ContentItem
  const contentRegistry = useRef<ContentRegistry>(
    data.reduce(reducer, {})
  );

  // EVENT HANDLERS
  /**
   * Set the Layouts Object State to empty object {}.
   * 
   * Causes a re-render of the component, with Default Layout automatically derived by React Grid Layout to solve collisions.
   */
  const handleResetLayout = () => {
    setLayouts({});
  };
  const [handleOnLayoutChange, handleOnResize] = useGridLayoutHandlers(
    // Arg 0
    {
      // Callables (aka functions/callbacks) that handleLayoutChange calls
      setLayouts,
      saveToLS: (allLayouts: LayoutsObject) => {
        saveToLS("layouts", allLayouts);
      },
    },
    // Arg 1: ON RESIZE EVENT HANDLER
    {
      unitLength: 50,
      getContentHeight: (gridItemID: string) => contentRegistry.current[gridItemID].reduce((acc, { dimsReporter }) => acc + dimsReporter().height, 0),
      // getContentHeight: (gridItemID: string) => sumContentHeight(gridItemID),
      contentAdjustmentOffsetHeight: theme.item.theme.projectDescription.margin * 2,
      widthUnitLength: 97.5,
    }
  );

  // CONSTANT: starting width of each Portfolio Item
  const startingWidth = 4;

  return (
    <PortfolioSectionContainer // DIV
      id={htmlID}
      theme={{
        // backgroundColor: theme.container.backgroundColor,
        // backgroundColor: 'var(--app-container-primary, ' + theme.container.backgroundColor + ')',
        // color: theme.item.color,
      }}>
      {/* Portfolio Section TITLE*/}
      <PortfolioSectionTitle theme={theme.sectionHeader}>Open Source & Portfolio</PortfolioSectionTitle>

      {/* Portfolio Section - RESET Layout Button */}
      <div style={{paddingLeft: '10px'}}><ResetLayoutButton onClick={handleResetLayout} theme={theme.resetLayoutButton}>Reset Layout</ResetLayoutButton></div>

      {/* Portfolio Section - GRID LAYOUT */}
      <ResponsiveReactGridLayout
        className={className}
        // these styles can override the css styles from react-grid-layout.css
        // style={{

        // }}
        cols={cols}
        rowHeight={rowHeight}
        // Initialize Layouts from Local Storage or else with Empty Object
        layouts={layouts}

        // we store the Layouts (breakpoints -> layouts) in the component's state, and local storage when user changes the layout (when an item is droped (after a drag-n-drop), when the user resizes an item after they release of the click button), or when the "Reset Layout" button is clicked
        onLayoutChange={handleOnLayoutChange}

        // handle resize events, which fire 'continuously' while user holds mouse pressed, after clicking on the bottom-right of any Grid Item
        // onResize={handleOnResize}  // we use content-aware algorithm to increase height if inner content requires it
        onResize={handleOnResize}

        // if true the items will appear and animate/"transition" to match the state Layouts Object
        // if false, the items will appear instantly, without any animation
        // If true, WidthProvider will measure the container's width before mounting children.
        // Use this if you'd like to completely eliminate any resizing animation on application/component mount.
        measureBeforeMount={false}
      >
        {/* GRID LAYOUT CHILDREN - START */}
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

          // MEMOIZATION OF GRID ITEMS
          //  - avoids all item re-renders when moving or resizing!
          //  - zIndex changes only trigger re-render of its own parent LayoutItem
          const child = React.useMemo(() => {
            return (
              <LayoutItem  // DIV
                key={index.toString()}
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
                  // if initial Height is smaller than 7-units, set minH to it, else 7
                  minH: setStartingHeigth() < 7 ? setStartingHeigth() : 7, // this is compared to maxH and h and if smaller throws warning on dev server
                  // maxH: 10,
                }}
                style={{
                  // outline: theme.item.outline,
                  // allows increasing top-level grid item height, to allow children pop-ups to be visible
                  zIndex: zIndex,
                  backgroundColor: 'var(--app-color-draggable, --app-color-main-area, --app-container-primary, ' + theme.item.backgroundColor + ')',
                }}
              >
                {/* Initialize the ZIndexContext with state setter */}
                {/* Allow increasing this zIndex when modal (ie Resource Link) dialogs appears,
                to prevent dialog being shown "lower" than neighbouring Grid Items content. */}
                <ZIndexContext.Provider value={{
                  setZIndex
                }}>
                  <ResponsiveLayoutItemContent // 1 DIV
                    data={item}
                    // Renders Fragment of Elements with Grid Item Contents
                    renderProps={(d: PortfolioItemInterface) => {
                      return inputRenderProps(
                        d,
                        theme.item.theme,
                        contentRegistry.current[index.toString()].map(({ ref }) => ref as React.RefObject<HTMLElement>),
                      )
                    }}
                  />
                </ZIndexContext.Provider>
              </LayoutItem>
            );
          }, [data, theme.item.outline, index, item, zIndex]);
          return child;
        })}
        {/* GRID LAYOUT CHILDREN - STOP */}
      </ResponsiveReactGridLayout>
    </PortfolioSectionContainer>
  );
};


// allow client to ommit any of items in the defaultProps, since we have set up fallbacks
export default withDefaultProps(defaultProps, ResponsiveLocalStorageLayout);
export type { ResponsiveLocalStorageLayoutProps };
export { defaultProps, ResponsiveLocalStorageLayout };
