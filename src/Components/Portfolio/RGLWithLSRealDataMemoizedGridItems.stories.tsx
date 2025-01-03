import React, { FC, useRef, useState, useCallback, useContext, useMemo } from "react";

// Import the "Responsive" version of the GridLayout to support "Breakpoints" and Layouts
import { Responsive, WidthProvider } from "react-grid-layout";
// IE
// layouts={layouts}
//breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
import styled from "@emotion/styled";

// import App Styles Symbols
import { lightTheme, darkTheme } from '../../theme';
import PortfolioItemInterface from "../../PortfolioItemInterface";
import useLayoutsState from '../../Hooks/useLayoutsState'
import AppProjectLinksPane, { AppProjectLinksPaneProps } from './AppProjectLinksPane';
import ZIndexContext from '../../ZIndexContext';
// import "../../css/react-grid-layout.css";
// import "../../css/react-resizable.css";
////// CONSTANT DATA //////
const data: PortfolioItemInterface[] = [
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
import { jsx } from "@emotion/react";

type LayoutsObject = {
    //     lg: LayoutArray;
    //     md: LayoutArray;
    //     sm: LayoutArray;
    //     xs: LayoutArray;
    //     xxs: LayoutArray;
    [key: string]: LayoutInterface[];
}

type LayoutArray = ReadonlyArray<LayoutInterface>;
type ResponsiveReactGridLayoutonLayoutChange = (layout: LayoutArray, layouts: LayoutsObject) => void;


//// COMPONENT that Renders Top-Level DIV of a Grid Item  ////
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

// COMPONENT - DESIGNER'S ENTRYPOINT
// Use to implement Hover Effects and other Styles on Grid Items
const ItemWithHover = styled.span`
  // SCALE ON HOVER
  &:hover {
    transform: scale(1.03);
    // box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
    // background-color:
    // color:
  }
`

// Grid Item Component that counts self re-renders, simulates constant data from props with string type for demonstration
interface CounterGridItemProps {
    constantDataFromProps: string;
    children?: React.ReactNode;
    linksPane: AppProjectLinksPaneProps;
    // onClick?: () => void;
}
const CounterGridItem: FC<CounterGridItemProps> = (props) => {
    const rendersNo = useRef(0)
    // Initialize the zIndex state for this item
    // const { zIndex: contextZIndex } = useContext(ZIndexContext);
    // const [, setZIndex] = useState(contextZIndex);

    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()

    return (
        // <ZIndexContext.Provider value={{
        //     setZIndex
        // }}>
        <ItemWithHover>
            <p>{props.children}{" -> "}{props.constantDataFromProps}: {rendersNo.current}</p>
            <AppProjectLinksPane {...props.linksPane} />
        </ItemWithHover>

    );
}


// Both <ResponsiveReactGridLayout> and <ReactGridLayout> take width to calculate positions on drag events. In simple cases a HOC WidthProvider can be used to automatically determine width upon initialization and window resize events.
const ResponsiveGridLayout = WidthProvider(Responsive);

type realDataGridItemCallback = (props: { index: number, itemOutline: string, linksPane: AppProjectLinksPaneProps, zIndex: number, setZIndex: (zIndex: number) => void }) => React.ReactNode;

type renderChildCallback = (reactNode: React.ReactNode) => React.ReactNode;
type GridRealDataWithLSAndMemoizedItemsProps = {
    itemOutline: string;
    data: PortfolioItemInterface[];
}
type ExternalLinkTypeNames = "github" | 'source_code_repo' | "docs" | "documentation" | "ci/cd";
type StateInitializer = (length: number) => number[];
const GridRealDataWithLSAndMemoizedItems: FC<GridRealDataWithLSAndMemoizedItemsProps> = (props) => {
    // ID to State mapping: Initial State of ZIndex's for each Grid Item

    const initialState: number[] = useMemo(() => {
        return new Array(props.data.length).fill(0);
    }, [props.data.length]);

    const [zIndices, setZIndices] = useState(initialState);

    // render Callback to use in Memoize Operation
    const realDataGridItem: realDataGridItemCallback = (props) => {
        return <LayoutItem
            style={{
                outline: props.itemOutline,
                // allows increasing top-level grid item height, to allow children pop-ups to be visible
                zIndex: props.zIndex,  // zIndex probably requires to extract this into a separate FC Component, skip for now
            }}
            key={props.index}
            data-grid={{
                // Index starts from 0
                i: props.index.toString(),
                x: props.index, y: 1, w: 1, h: 2
            }}
        >
            <ZIndexContext.Provider value={{
                // zIndex,
                setZIndex: props.setZIndex,
                // setZIndex: (newZIndex: number) => {
                //     setZIndices((prevZIndices) => {
                //         return {
                //             ...prevZIndices,
                //             [idx]: {
                //                 zIndex: newZIndex
                //             }
                //         };
                //     });
                // }
            }}>

                <CounterGridItem linksPane={props.linksPane} className="text" constantDataFromProps="Render Times">ID {props.index}, props.zIndex: {props.zIndex}, state ZIndex: {}</CounterGridItem>
            </ZIndexContext.Provider>

        </LayoutItem>;
    }

    // MEMOIZE GRID CHILDREN !!!
    // works for moving and resizing but not when opening modal dialog
    // modal dialog re-renders all Grid Items, due to to the State being aan array
    const children = React.useMemo(() => {
        // return new Array(props.count).fill(undefined).map((val, idx) => {
        return props.data.map((val, idx) => {
            // Initialize the zIndex state for this item

            return realDataGridItem({
                index: idx,
                itemOutline: props.itemOutline,
                // zIndex: zIndex,
                linksPane: {
                    data: {
                        // links: [
                        //     {
                        //         title: 'Source Code',
                        //         url: 'https://github.com/example/repo',
                        //         type: 'github',
                        //     },
                        //     {
                        //         title: 'Documentation',
                        //         url: 'https://example.com/docs',
                        //         type: 'docs',
                        //     },
                        //     {
                        //         title: 'CI/CD Pipeline',
                        //         url: 'https://example.com/ci-cd',
                        //         type: 'ci/cd',
                        //     },
                        // ],
                        // links: [],
                        links: (val.resource_links || []).map((link) => {
                            return {
                                title: link.type,
                                url: link.url,
                                type: link.type as ExternalLinkTypeNames,
                            };
                        }),
                    },
                    theme: {
                        // Link Pane Title Header
                        // headerFontFamily: lightTheme.portfolio.item.resourceLinks.fontFamily,
                        headerColor: lightTheme.portfolio.item.resourceLinks.headerColor,
                        // item: lightTheme.portfolio.item.resourceLinks.item,
                        item: {
                            ...lightTheme.portfolio.item.resourceLinks.item,
                            icons: [
                                // github
                                {
                                    svgStyles: {
                                        width: "14px",
                                        height: "14px",
                                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                                    },
                                },
                                // docs
                                {
                                    svgStyles: {
                                        width: "14px",
                                        height: "14px",
                                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                                    },
                                },
                                // ci/cd
                                {
                                    svgStyles: {
                                        width: "14px",
                                        height: "14px",
                                        fill: lightTheme.portfolio.item.resourceLinks.item.color
                                    },
                                },
                            ],
                        },
                        header: {
                            fontFamily: '',
                            fontSize: ''
                        }
                    }
                },
                // state as Object (seems to work but renders all items in grid when open modal-dialog)
                // // Initial zIndex for this item
                // zIndex: zIndices[idx].zIndex,
                // // Callback to set zIndex for this item
                // setZIndex: (newZIndex: number) => {
                //     setZIndices((prevZIndices) => {
                //         return {
                //             ...prevZIndices,
                //             [idx]: {
                //                 zIndex: newZIndex
                //             }
                //         };
                //     });
                // }

                // state as array of numbers number[]
                // Initial zIndex for this item
                zIndex: zIndices[idx],
                // Callback to set zIndex for this item
                setZIndex: (newZIndex: number) => {
                    setZIndices((prevZIndices) => {
                        return prevZIndices.map((zIndex, index) => {
                            if (index === idx) {
                                return newZIndex;
                            } else {
                                return zIndex;
                            }
                        });
                    });
                }
            });
        });
    }, [props.data, props.itemOutline, zIndices]);

    // Helper Code for Showing Number of Renders
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()

    // Code for implementing Saving and Loading Layouts from Local Storage
    const [layouts, setLayouts, saveToLS] = useLayoutsState();

    // Handler for Clicking on RESET Button
    const handleClickResetLayoutButton = () => {
        setLayouts({});
    };

    // Handler for ensuring User Layout Changes are persisted in Local Storage
    const onLayoutChange: ResponsiveReactGridLayoutonLayoutChange = (
        currentLayout: ReadonlyArray<LayoutInterface>,
        allLayouts: LayoutsObject
    ) => {
        // on layout change we store the layouts object in local storage
        saveToLS("layouts", allLayouts);
        // we store the layouts in the component's state, and trigger a re-render
        setLayouts(allLayouts);
    };

    // const renderChild: renderChildCallback = (reactNode: React.ReactNode) => {
    //     // Initialize the zIndex state for this item
    //     const [zIndex, setZIndex] = useState(0);
    //     return <ZIndexContext.Provider value={{
    //         zIndex,
    //         setZIndex
    //     }}>
    //         {reactNode}
    //     </ZIndexContext.Provider>
    // };

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
            // Handler User Layout Changes by ensuring they are persisted in Local Storage
            onLayoutChange={onLayoutChange}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}>
            {/* {function (_children) {
                const [zIndex, setZIndex] = useState(0);
                return _children.map((child) => {
                    return <ZIndexContext.Provider value={{
                        // zIndex,
                        setZIndex
                    }}>
                        {child}
                    </ZIndexContext.Provider>
                });
            }(children)} */}
            {children}
            {/* {children.map((child) => renderChild(child))} */}
        </ResponsiveGridLayout>
    </>;
}


export default {
    component: GridRealDataWithLSAndMemoizedItems,
    title: "Grid from Real Data, with Local Storage and Memoized Items",
    tags: ["autodocs"],
};

const SimpleArgs: GridRealDataWithLSAndMemoizedItemsProps = {
    data,
    itemOutline: "1px solid black",
}

export const RealDataResponsiveLocalStorageLayout = {
    args: SimpleArgs,
}
