import React, { FC, type ReactNode, useRef, useState, useCallback, useContext, useMemo } from "react";

// Import the "Responsive" version of the GridLayout to support "Breakpoints" and Layouts
import { Responsive, WidthProvider } from "react-grid-layout";
// IE
// layouts={layouts}
//breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
import styled from "@emotion/styled";

// import App Styles Symbols
import { lightTheme, darkTheme, type ComputedTheme } from '../../theme';

import PortfolioItemInterface from "../../PortfolioItemInterface";
import useLayoutsState from '../../Hooks/useLayoutsState'
import useGridLayoutHandlers from '../../Hooks/useReactGridLayoutHandlers';
import ZIndexContext from '../../ZIndexContext';

// keep same public interface as PortfolioSection
import { defaultProps as portfolioSectionDefaultProps, ResponsiveLocalStorageLayoutProps } from './PortfolioSection'

import { PortfolioLayoutItemContentProps } from './PortfolioItem/PortfolioItemContainer';

// import "../../css/react-grid-layout.css";
// import "../../css/react-resizable.css";
////// CONSTANT DATA //////
const DATA: PortfolioItemInterface[] = [
    // PROJECT 1
    {
        title: "Python Package Generator",
        development_period: "2020-2021",
        status: "Mature",
        description:
            "A CLI tool to generate a Python package with a single command.",
        source_code_repo: "boromir674/cookiecutter-python-package",
        resource_links: [
            {
                url: 'https://github.com/example/repo',
                type: 'github',
            },
            {
                url: 'https://example.com/docs',
                type: 'docs',
            },
            {
                url: 'https://example.com/ci-cd',
                type: 'ci/cd',
            },
        ],
        release: [
            {
                type: "pypi",
                name: "cookiecutter-python-package",
                artifact_version: "2.4.0",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                // docker pull boromir674/generate-python:v2.4.0
                type: "docker",
                name: "generate-python",
                artifact_version: "v2.4.0",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                type: "github",
                name: "cookiecutter-python-package",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                artifact_version: "v2.4.0",
            },
        ],
        tags: ["Python", "CLI", "Automation", "Docker"],
    },
    // PROJECT 2
    {
        title: "Neural Style Transfer",
        development_period: "2020-2021",
        status: "Stable",
        description:
            "Re-paint any image with the style of another image (ie Van Gogh painting) using a Neural Style Transfer algorithm, accessible through an easy-to-use CLI.",
        source_code_repo: "boromir674/neural-style-transfer",
        resource_links: [
            {
                url: 'https://github.com/neural-style-transfer',
                type: 'github',
            },
            {
                url: 'https://neural-style-transfer.com/ci-cd',
                type: 'ci/cd',
            },
        ],
        release: [
            {
                type: "pypi",
                artifact_version: "0.6.1",
                name: "neural-style-transfer",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                type: "docker",
                name: "nst",
                artifact_version: "v0.6.1",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                type: "github",
                name: "neural-style-transfer",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                artifact_version: "v0.6.1",
            },

        ],
        tags: [
            "Neural Style Transfer",
            "Deep Learning",
            "Python",
            "Docker",
            "CLI",
            "Sphinx",
            "PyPI",
        ],
    },
    // PROJECT 3
    {
        title: "Topic Modeling Toolkit",
        development_period: "2018-2019",
        status: "Mature",
        description:
            "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
        source_code_repo: "boromir674/topic-modeling-toolkit",
        resource_links: [
            {
                url: 'https://github.com/neural-style-transfer',
                type: 'github',
            },
        ],
        release: [
            {
                type: "pypi",
                artifact_version: "0.5.2",
                name: "topic-modeling-toolkit",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                type: "docker",
                name: "topic-modeling",
                artifact_version: "v0.5.2",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
            },
            {
                type: "github",
                name: "topic-modeling-toolkit",
                urlText: "https://pypi.org/projects/cookiecutter-python-package",
                artifact_version: "v0.5.2",
            },
        ],
        tags: [
            "Machine Learning",
            "Unsupervised Learning",
            "Topic Modeling",
            "Regression Testing",
            "Python",
            "PyPI",
            "automation",
            "CLI",
        ],
    },
    // Project with 2 Releases
    {
        title: "Project with 2 Releases",
        development_period: "2018-2019",
        status: "Mature",
        description:
            "A Python library for Topic Modeling providing a unified interface facilitating various research operations. It is designed to be easily extensible, allowing developers to implement their own algorithms and plug them in the toolkit.",
        source_code_repo: "boromir674/repo-with-2-releases",
        resource_links: [
            {
                url: 'https://github.com/repo-with-2-releases',
                type: 'github',
            },
            {
                url: 'https://repo-with-2-releases.com/ci-cd',
                type: 'ci/cd',
            },
        ],
        release: [
            {
                type: "pypi",
                artifact_version: "0.5.2",
                name: "repo-with-2-releases",
                urlText: "https://pypi.org/projects/repo-with-2-releases",
            },
            {
                type: "github",
                name: "repo-with-2-releases",
                urlText: "https://pypi.org/projects/repo-with-2-releases",
                artifact_version: "v0.5.2",
            },
        ],
        tags: [
            "Machine Learning",
            "Unsupervised Learning",
            "Topic Modeling",
            "Regression Testing",
            "Python",
            "PyPI",
            "automation",
            "CLI",
        ],
    },
];

// Single Grid Item Interface
import { LayoutInterface } from './LayoutInterface';

type LayoutsObject = {
    //     lg: LayoutArray;
    //     md: LayoutArray;
    //     sm: LayoutArray;
    //     xs: LayoutArray;
    //     xxs: LayoutArray;
    [key: string]: LayoutInterface[];
}

//// COMPONENT, same as PROD, that Renders Top-Level DIV of a Grid Item  ////
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

// RnD / Support Component to show number of Renders per Grid Item
const GridItemContents = (props: { backgroundColor: string, id: string, children?: React.ReactNode }) => {
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])

    // Increment Render Counter
    logComponentRerender()

    return <div style={{ backgroundColor: props.backgroundColor }}>
        <h2>ID {props.id}, Render Times: {rendersNo.current}</h2>
    </div>
}


// DESIGNER'S ENTRYPOINT: interface is FC<{data, renderProps}>
// App Default is FC PortfolioItemCard, which renders 2 STYLED DIVs and uses prop
// render callback(data, theme) to create/render the inner DIV's elements

// DESIGNER'S ENTRYPOINT: Grid Item Styles
// To Change App Design (ie scale Grid Item more on-hover) modify
// Styled DIVs declared in PortfolioItemCard module

const AppPortfolioItemWithDimsReporter = (props: PortfolioLayoutItemContentProps) => {
    
    // const [ ref, reportDimensions ] = useStatelessDimensions();

    const DefaultPortfolioContentsContainer: FC<PortfolioLayoutItemContentProps> = portfolioSectionDefaultProps.element_to_render as FC<PortfolioLayoutItemContentProps>;
    return (
        <DefaultPortfolioContentsContainer
        // Give the Portfolio Container Div the ability to measure its dimensions
        // ref={ref}
        {...props} />
    );
};


// COMPONENT that Renders 1 DIVS and call renderProps to render its children
const ResponsiveLayoutItemContent: FC<{
    data: PortfolioItemInterface;
    renderProps: ResponsiveLocalStorageLayoutProps["renderProps"];
}
> = portfolioSectionDefaultProps.element_to_render as FC;

// DESIGNER'S ENTRYPOINT: (data, theme) => React.ReactNode Interface
// To control what/how elements (ie content and/or styles) are rendered inside each
// portfolioSectionDefaultProps.element_to_render Component (2 DIVs), modify
// the portfolioSectionDefaultProps.renderProps or use different callback
const RENDER_ITEM_CONTENTS_DEFAULT_CALLBACK = portfolioSectionDefaultProps.renderProps as ResponsiveLocalStorageLayoutProps["renderProps"];
type RenderProps = typeof RENDER_ITEM_CONTENTS_DEFAULT_CALLBACK;
const renderItemElements: RenderProps = (data, theme) => {
    // GIRD ITEM ELEMENTS (inside 2 DIVs)
    console.log("Running Render Item Elements");
    return <>
        {/* Component to Count Number of Render Times */}
        <GridItemContents backgroundColor={theme.releases.releaseButtonTheme.backgroundColor}></GridItemContents>
        {/* Production Component Render */}
        {/* Renders Title, Description, Links, and Releases */}
        {RENDER_ITEM_CONTENTS_DEFAULT_CALLBACK(data, theme)}
    </>
}

// Both <ResponsiveReactGridLayout> and <ReactGridLayout> take width to calculate positions on drag events. In simple cases a HOC WidthProvider can be used to automatically determine width upon initialization and window resize events.
const ResponsiveGridLayout = WidthProvider(Responsive);
type GridRealDataWithLSAndMemoizedItemsProps = {
    itemOutline: string;
    data: PortfolioItemInterface[];
    theme: ResponsiveLocalStorageLayoutProps["theme"];
    renderProps: ResponsiveLocalStorageLayoutProps["renderProps"];
}
const GridWithDistributedState: FC<GridRealDataWithLSAndMemoizedItemsProps> = (props) => {
    // Helper Code for Showing Number of Renders
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()
    // Helper Code for computing Common svg styles
    const commonSVGStyles = useMemo(() => {
        return {
            width: "14px",
            height: "14px",
            fill: darkTheme.portfolio.item.releases.item.color
        }
    }, []);

    // Code for implementing Saving and Loading Layouts from Local Storage
    const [layouts, setLayouts, saveToLS] = useLayoutsState();
    // EVENT HANDLERS - RESET BUTTON
    const handleClickResetLayoutButton = useCallback(() => { setLayouts({}) }, [setLayouts]);
    // EVENT HANDLERS - GRID LAYOUT
    const [handleLayoutChange] = useGridLayoutHandlers({
        setLayouts,
        saveToLS: useCallback((allLayouts: LayoutsObject) => {
            saveToLS("layouts", allLayouts);
        }, [saveToLS]),
    });

    // Global Resize Handler
    const handleItemResize = (
        layout,
        oldItem,
        newItem,
        placeholder,
        event,
        element,
    ) => {

        console.log('RESIZE ALGO SIMPLE');
        if (newItem.w <= 2) {  // if user resized item with "very small" width
            const heightPlusTwo = newItem.h + 2;
            // modifying `layoutItem` to enforce constraints
            newItem.h = heightPlusTwo;
            placeholder.h = heightPlusTwo;
        } else if (newItem.w <= 3) {  // if user resized item resulting in "small" width
            const heightPlusOne = newItem.h + 1;
            // modifying `layoutItem` to enforce constraints
            newItem.h = heightPlusOne;
            placeholder.h = heightPlusOne;
        }
    };

    return <>
        {/* SUPPORT ELEMENTS */}
        <p>GRID CONTAINER Render Times: {rendersNo.current}</p>
        {/* SHOW Layouts as JSON */}
        <p>Layouts: {JSON.stringify(layouts)}</p>
        {/* RESET LAYOUT BUTTON */}
        <button onClick={handleClickResetLayoutButton}>Reset Layout</button>
        {/* GRID ELEMENT */}
        <ResponsiveGridLayout
            layouts={layouts}
            // Save to LS and set State when Layout-Change Events happen:
            //  - after a drag-n-drop action by the user
            //  - after a resize action on an Item (after mouse is released from bottom-right corner) by the user
            //  - after user clicks on the 'Reset Layout' (aka Default Layout) button (after resetLayout)
            onLayoutChange={handleLayoutChange}
            onResize={handleItemResize}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        >
            {DATA.map((item, index) => {
                // STATE INITIALIZATION PER GRID ITEM
                const [zIndex, setZIndex] = useState(0);

                // MEMOIZATION OF GRID ITEMS
                // MEMOIZE GRID CHILDREN !!!
                // works for moving and resizing but not when opening modal dialog
                // modal dialog re-renders all Grid Items, due to to the State being aan array
                const child = React.useMemo(() => {
                    console.log("Rendering Grid Item: ", index);
                    return (
                        <LayoutItem
                            style={{
                                outline: props.itemOutline,
                                // allows increasing top-level grid item height, to allow children pop-ups to be visible
                                zIndex: zIndex,  // zIndex probably requires to extract this into a separate FC Component, skip for now
                            }}
                            key={index}
                            data-grid={{
                                // Index starts from 0
                                i: index.toString(),
                                x: index, y: 1,
                                w: 3, h: 3
                            }}
                        >
                            <ZIndexContext.Provider value={{
                                setZIndex: setZIndex,
                            }}>
                                <ResponsiveLayoutItemContent
                                    stringID={index.toString()}
                                    data={item}
                                    // Renders Elements of Grid Item, given data and theme
                                    // renderItem={(d: PortfolioItemInterface) => portfolioSectionDefaultProps.renderProps(d, props.theme.item.theme)}
                                    renderProps={(d: PortfolioItemInterface) => props.renderProps(d, props.theme.item.theme)}
                                >
                                    {/* ID {index}, zIndex: {zIndex} */}
                                </ResponsiveLayoutItemContent>
                            </ZIndexContext.Provider>
                        </LayoutItem>
                    )
                }, [props.data, props.itemOutline, index, item, zIndex]);
                return child;
            })}
        </ResponsiveGridLayout>
    </>;
}


export default {
    component: GridWithDistributedState,
    title: "Grid/With Distributed State and Memoized Items",
    tags: ["autodocs"],
};

// Full App Theme objects LIGHT/DARK
const hookAdapterFunction = (theme: ComputedTheme) => {
    return {
        containerBackgroundColor: theme.backgroundColor,
        topHeaderPane: {
            themeSwitch: theme.themeSwitch,
            navigationBar: theme.navigationBar,
            backgroundColor: theme.topHeaderPane.backgroundColor,
        },
        verticalSidePane: {
            personalInfo: {
                // pass Theme Personal Color Design
                ...theme.personal,
                // adjust interface
                linkColor: theme.personal.urlTextColor,
            },
            education: theme.education,
        },
        verticalMainPane: {
            introduction: theme.introduction,
            professional: theme.professional,
            portfolio: {
                ...theme.portfolio,
                item: {
                    ...theme.portfolio.item,
                    theme: {
                        // Portfolio Project Item - Project Title and Description
                        ...theme.portfolio.item,
                        links: {
                            ...theme.portfolio.item.resourceLinks,
                            item: {
                                ...theme.portfolio.item.resourceLinks.item,
                                icon: {
                                    svgStyles: {
                                        // TODO: supply from theme object
                                        width: "12px",
                                        height: "12px",
                                        fill: theme.portfolio.item.resourceLinks.item.color,
                                    },
                                },
                            },
                        },
                        // Portfolio Project Item - Software Releases
                        releases: {
                            ...theme.portfolio.item.releases,
                            headerFontFamily: theme.portfolio.item.releases.fontFamily,
                            headerColor: theme.portfolio.item.releases.color,
                            releaseButtonTheme: {
                                ...theme.portfolio.item.releases.item,
                                icon: {
                                    svgStyles: {
                                        // TODO: supply from theme object
                                        width: "12px",
                                        height: "12px",
                                        fill: theme.portfolio.item.releases.item.color,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            // ...theme,
            // containerBackgroundColor: theme.backgroundColor,
        },
        bottomFooterPane: {
            ...theme.footerStyles,
            // svgStyles: {
            //   width: "15px",
            //   height: "15px",
            // }
        },
    };
};

type RawColorTheme = typeof lightTheme | typeof darkTheme;

// Adjust Theme to App Theme
// compute maximum number of Releases contained in a single portfolio item
const maxNumberOfReleasesPerPortfolioItems = () => DATA.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
);
// compute maximum number of links contained in a single portfolio item
const maxNumberOfLinksPerPortfolioItems = () => DATA.reduce(
    (acc, { resource_links = [] }) => Math.max(acc, resource_links.length),
    0
);
const computeTheme = (theme: RawColorTheme) => {
    const appTheme = hookAdapterFunction(theme);
    // Adapt 'icon' to 'icons' by crating an rray of the same item multiple times
    const adaptedAppTheme = {
        ...appTheme,
        verticalMainPane: {
            ...appTheme.verticalMainPane,
            portfolio: {
                ...appTheme.verticalMainPane.portfolio,
                item: {
                    ...appTheme.verticalMainPane.portfolio.item,
                    theme: {
                        ...appTheme.verticalMainPane.portfolio.item.theme,
                        links: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.links,
                            item: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.links.item,
                                icons: Array.from({ length: maxNumberOfLinksPerPortfolioItems() }, () => appTheme.verticalMainPane.portfolio.item.theme.links.item.icon
                                ),
                            },
                        },
                        releases: {
                            ...appTheme.verticalMainPane.portfolio.item.theme.releases,
                            releaseButtonTheme: {
                                ...appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme,
                                icons: Array.from({ length: maxNumberOfReleasesPerPortfolioItems() }, () => appTheme.verticalMainPane.portfolio.item.theme.releases.releaseButtonTheme.icon
                                ),
                            },
                        },
                    },
                },
            },
        },
    }
    return adaptedAppTheme;
};
const lightAppTheme = computeTheme(lightTheme);
const lightThemeObj = lightAppTheme.verticalMainPane.portfolio;

const SimpleArgs: GridRealDataWithLSAndMemoizedItemsProps = {
    renderProps: renderItemElements,
    data: DATA,
    itemOutline: "1px solid black",
    theme: {
        ...lightThemeObj,
        item: {
            ...lightThemeObj.item,
            outline: `${lightThemeObj.item.outline.width} solid ${lightThemeObj.item.outline.color}`
        },
    },
}

export const MinimumNumberOfItemReRenders = {
    args: SimpleArgs,
}
