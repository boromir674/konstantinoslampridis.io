import React, { FC, forwardRef, type ReactNode, useRef, useState, useCallback, useContext, useMemo, useEffect } from "react";

import { Responsive, WidthProvider } from "react-grid-layout";
import styled from "@emotion/styled";

// import App Styles Symbols
import { lightTheme, darkTheme, type ComputedTheme } from '../theme';

// Import Interfaces and Types
import PortfolioItemInterface from "../PortfolioItemInterface";
import { PortfolioLayoutItemContentProps } from '../Components/Portfolio/PortfolioItem/PortfolioItemContainer';

import useLayoutsState from '../Hooks/useLayoutsState'
import useGridLayoutHandlers from '../Hooks/useGridLayoutHandlers';
import ZIndexContext from '../ZIndexContext';

// keep same public interface as PortfolioSection
import { defaultProps as portfolioSectionDefaultProps, ResponsiveLocalStorageLayoutProps } from '../Components/Portfolio/PortfolioSection';

/// Local Type Checking
// Dimensions Reporter Interface
type DimsReporter = () => { width: number; height: number };


////// CONSTANT DATA //////
const DATA: PortfolioItemInterface[] = [
    // PROJECT 1
    {
        title: "ID: 0 " + "Python Package Generator",
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
        title: "ID: 1 " + "Neural Style Transfer",
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
        title: "ID: 2 " + "Topic Modeling Toolkit",
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
        title: "ID: 3 " + "Project with 2 Releases",
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
import { LayoutInterface } from '../Components/Portfolio/LayoutInterface';

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
const GridItemContents = (props: { backgroundColor: string, children?: React.ReactNode }) => {
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])

    // Increment Render Counter
    logComponentRerender()

    return <div style={{ backgroundColor: props.backgroundColor }}>
        <h2>Render Times: {rendersNo.current}</h2>
    </div>
}


// PRODUCTION APP COMPONENT that Renders 1 DIV and calls renderProps to render its children
const DefaultPortfolioContentsContainer = portfolioSectionDefaultProps.element_to_render as typeof portfolioSectionDefaultProps.element_to_render



// RnD / Support Component with Dims Reporting capabilities
const AppPortfolioItemWithDimsReporter = forwardRef((props: PortfolioLayoutItemContentProps, ref) => {

    // const [ ref, reportDimensions ] = useStatelessDimensions();

    return (
        // <div ref={ref as React.RefObject<HTMLDivElement>}>
        <DefaultPortfolioContentsContainer
            // ref={ref as React.RefObject<HTMLDivElement>}
            // Give the Portfolio Container Div the ability to measure its dimensions
            // ref={ref}
            {...props} />
        // </div>
    );
});

// DESIGNER'S INTERFACE: renderProps: (data, theme) => React.ReactNode Interface
// To control what/how elements (ie content and/or styles) are rendered inside each
// portfolioSectionDefaultProps.element_to_render Component (2 DIVs), modify
// the portfolioSectionDefaultProps.renderProps or use different callback

type RenderProps = ResponsiveLocalStorageLayoutProps["renderProps"];

const RENDER_ITEM_CONTENTS_DEFAULT_CALLBACK = portfolioSectionDefaultProps.renderProps as ResponsiveLocalStorageLayoutProps["renderProps"];

import AppPortfolioItem, { AppPortfolioItemProps } from "../Components/Portfolio/AppPortfolioItem";

const HARD_CODED_DEFAULT: RenderProps = (data, theme, refs) => <AppPortfolioItem data={data} theme={theme} refs={refs} />


const renderItemElements: RenderProps = (data, theme, refs) => {
    return <>
        {/* Component to Count Number of Render Times */}
        <GridItemContents backgroundColor={theme.releases.releaseButtonTheme.backgroundColor}></GridItemContents>
        {/* Production Component Render */}
        {/* Renders Title, Description, Links, and Releases */}
        {/* {RENDER_ITEM_CONTENTS_DEFAULT_CALLBACK(data, theme, refs)} */}
        {HARD_CODED_DEFAULT(data, theme, refs)}
    </>
}

interface GridItemContentsRegistry {
    [key: string]: {
        // client can pass to rendered Components
        ref: React.RefObject<HTMLDivElement | null>,
        dimsReporter: DimsReporter,
    };
}

type DimsReporterRegistry = Record<string, React.RefObject<DimsReporter | null>>;

type DivRefsDict = Record<string, {
    ref: React.RefObject<HTMLElement | null>;
    dimsReporter: DimsReporter;
}[]>;

type Reducer<S, T> = (acc: S, _: T, index: number) => S;

// COMPONENT: GRID LAYOUT
const ResponsiveGridLayout = WidthProvider(Responsive);

import useDimsReporter from '../Hooks/useExposeStatelessDimsReporter';
interface DynamicMultiRefBindingToRenderedGridProps {
    theme: ResponsiveLocalStorageLayoutProps["theme"];
    renderProps: ResponsiveLocalStorageLayoutProps["renderProps"];
};
// MAIN COMPONENT
const DynamicMultiRefBindingToRenderedGrid: FC<DynamicMultiRefBindingToRenderedGridProps> = (props) => {
    // Helper Code for Showing Number of Renders
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()

    // Code for implementing Saving and Loading Layouts from Local Storage
    const [layouts, setLayouts, saveToLS] = useLayoutsState();

    const reducer: Reducer<DivRefsDict, PortfolioItemInterface> = (acc, _, index) => {
        // const [ref, dimsReporter] = useDimsReporter();
        // acc[index.toString()] = useRef<HTMLDivElement | null>(null);
        // populate with array of 3 objects
        acc[index.toString()] = Array.from({ length: 3 }, () => {
            const [ref, dimsReporter] = useDimsReporter();
            return {
                ref,
                dimsReporter,
            }
        });
        return acc;
    }
    // DECLARE REFS, with unique index per Grid Item
    const refs = useRef<DivRefsDict>(
        DATA.reduce(reducer, {})
    );

    const handleClick = useCallback(() => {
        console.log('Records of Refs:', refs.current);
        // REF 0
        console.log('Ref 0: ', refs.current['0'][0]['ref'].current);
        console.log('Ref 0: ', refs.current['0'][1]['ref'].current);
        console.log('Ref 0: ', refs.current['0'][2]['ref'].current);
    }, []);

    const DIV_STYLE = { resize: "both", overflow: "auto", border: "1px solid black", padding: "10px" };

    // EVENT HANDLERS - GRID LAYOUT CHANGE
    const [handleLayoutChange] = useGridLayoutHandlers({
        setLayouts,
        saveToLS: useCallback((allLayouts: LayoutsObject) => {
            saveToLS("layouts", allLayouts);
        }, [saveToLS]),
    });

    // GLOBAL RESIZE HANDLER - OLD Version
    const handleItemResize = (
        layout,
        oldItem,
        newItem,
        placeholder,
        event,
        element,
    ) => {
        console.log('RESIZE ALGO SIMPLE');
        const index: string = newItem.i.toString();
        // console.log(`Reading Element ${index} DIMS`, refs.current[index].current?.getBoundingClientRect());

        // NEW ALGORITHM: Content Aware Height Adjustment
        // assumes each "unit" is 160px
        // here the reported dims are the same as the outer grid item div, so the logic does not work as expected. we need to report the inner content's dims they are rendered in
        const contentHeight = refs.current[index].current?.getBoundingClientRect().height;
        console.log('Content Aware Algo: ', index, contentHeight);
        if (!contentHeight) {
            console.warn('Content Height is not available, because ref is not yet attached to the DOM element');
        } else {
            // if grid item height is not enough for inner content heigth
            const userHeight = newItem.h * 160;
            if (userHeight < contentHeight) {
                // adjust newItem.h so that it is >= contentHeight
                const adjustedHeightValue = Math.ceil(contentHeight / 160);
                console.log("Prev height: ", newItem.h, "New Height: ", adjustedHeightValue);
                newItem.h = adjustedHeightValue;
                placeholder.h = adjustedHeightValue;
            }
        }

        // // OLG ALGORITHM: heuristic to adjust height based on width
        // if (newItem.w <= 2) {  // if user resized item with "very small" width
        //     const heightPlusTwo = newItem.h + 2;
        //     // modifying `layoutItem` to enforce constraints
        //     newItem.h = heightPlusTwo;
        //     placeholder.h = heightPlusTwo;
        // } else if (newItem.w <= 3) {  // if user resized item resulting in "small" width
        //     const heightPlusOne = newItem.h + 1;
        //     // modifying `layoutItem` to enforce constraints
        //     newItem.h = heightPlusOne;
        //     placeholder.h = heightPlusOne;
        // }
    };

    const sumItemContentOccupiedHeight = useCallback((itemIndex: string) => {
        // convert {dimsReporter}[] to [rep1, rep2, ...]
        const dimsReporters: DimsReporter[] = refs.current[itemIndex].map(({ dimsReporter }) => dimsReporter);
        // DEBUG CODE
        for (const dimsReporter of dimsReporters) {
            if (!dimsReporter) {
                console.warn('DimsReporter is null. Bind the ref to a DOM element.');
                return 0;
            }
            const res = dimsReporter()
            console.log('DimsReporter:', res);
        }
        // get reported dims and sum height values
        const sumHeights = dimsReporters.reduce((acc, dimsReporter, _index) => {
            return acc + dimsReporter().height;
        }, 0);
        return sumHeights;
    }, [refs.current]);

    // GLOBAL RESIZE HANDLER - NEW Version

    const handleItemResizeV2 = useCallback((
        layout,
        oldItem,
        newItem,
        placeholder,
        event,
        element,
    ) => {
        console.log('RESIZE ALGO SIMPLE V2');
        const index: string = newItem.i.toString();

        // NEW ALGORITHM: Content Aware Height Adjustment
        // assumes each "unit" is 160px
        const record = refs.current[index];
        // console.log("Computing Occupied HEIGHT for ", index, record);
        const occupiedContentsHeight = sumItemContentOccupiedHeight(index) +
            67.48;  // hack to account for item render times "header"

        const occupiedUnits = Math.ceil(occupiedContentsHeight / 160);
        console.log(`Item ${index} Required Content Height:`, occupiedContentsHeight, 'Units', occupiedUnits);
        if (!occupiedContentsHeight) {
            console.warn('Content Height is not available, because refs are not attached to the DOM element');
        } else {
            // if grid item height is not enough for inner content heigth
            const userHeight = newItem.h * 160;
            console.log("User Height: ", userHeight, 'Units', newItem.h);
            if (userHeight < occupiedContentsHeight) {
                // adjust newItem.h so that it is >= contentHeight
                const adjustedHeightValue = Math.ceil(occupiedContentsHeight / 160);
                console.log("Prev height: ", newItem.h, "New Height: ", adjustedHeightValue);
                newItem.h = adjustedHeightValue;
                placeholder.h = adjustedHeightValue;
            }
        }
    }, [sumItemContentOccupiedHeight, refs.current]);

    const handleResetLayout = () => {
        setLayouts({});
    };

    return <>
        {/* SUPPORT ELEMENTS */}
        <button onClick={handleClick}>Click to Log All Refs</button>

        <p>GRID CONTAINER Render Times: {rendersNo.current}</p>
        {/* SHOW Layouts as JSON */}
        {/* <p>Layouts: {JSON.stringify(layouts)}</p> */}
        {/* RESET LAYOUT BUTTON */}
        <button onClick={handleResetLayout}>Reset Layout</button>
        {/* GRID ELEMENT */}
        <ResponsiveGridLayout
            layouts={layouts}
            onLayoutChange={handleLayoutChange}
            // onResize={handleItemResize}
            onResize={handleItemResizeV2}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        >
            {DATA.map((item, index) => {
                // STATE INITIALIZATION PER GRID ITEM
                const [zIndex, setZIndex] = useState(0);

                // MEMOIZATION OF GRID ITEMS
                const child = React.useMemo(() => {
                    console.log("Rendering Grid Item: ", index);
                    return (
                        <LayoutItem
                            style={{
                                outline: props.itemOutline,
                                zIndex: zIndex,
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
                                <AppPortfolioItemWithDimsReporter
                                    // ref={refs.current[index.toString()] as React.RefObject<HTMLDivElement>}
                                    data={item}
                                    renderProps={(d: PortfolioItemInterface) => {

                                        return props.renderProps(
                                            d,
                                            props.theme.item.theme,
                                            refs.current[index.toString()].map(({ ref }) => ref as React.RefObject<HTMLElement>),
                                        )
                                    }}
                                >
                                </AppPortfolioItemWithDimsReporter>
                            </ZIndexContext.Provider>
                        </LayoutItem>
                    )
                }, [props.data, props.itemOutline, index, item, zIndex]);
                return child;
            })}
        </ResponsiveGridLayout>
    </>;

}

// STORY Configuration
export default {
    component: DynamicMultiRefBindingToRenderedGrid,
    title: 'React Grid Layout/DynamicMultiRefBindingToRenderedGrid',
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
const maxNumberOfReleasesPerPortfolioItems = () => DATA.reduce(
    (acc, { release = [] }) => Math.max(acc, release.length),
    0
);
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


// STORY that Binds Multiple Refs to Dynamically generated HTML Elements, using the 'static' syntax
const MultiRefBindingWithStaticSyntaxArgs: DynamicMultiRefBindingToRenderedGridProps = {
    renderProps: renderItemElements,
    theme: {
        ...lightThemeObj,
        item: {
            ...lightThemeObj.item,
            outline: `${lightThemeObj.item.outline.width} solid ${lightThemeObj.item.outline.color}`
        },
    },
};

// STORY 1: Static ref binding
export const DemonstratesIntegrationWithResponsiveGridLayout = {
    args: MultiRefBindingWithStaticSyntaxArgs,
}
