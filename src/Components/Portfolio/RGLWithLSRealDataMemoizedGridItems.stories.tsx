import React, { FC, useRef, useState, useCallback } from "react";

// Import the "Responsive" version of the GridLayout to support "Breakpoints" and Layouts
import { Responsive, WidthProvider } from "react-grid-layout";
// IE
// layouts={layouts}
//breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
import styled from "@emotion/styled";

import PortfolioItemInterface from "../../PortfolioItemInterface";


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


////  GRID ITEM Top Level DIV Component  ////
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



// Grid Item Component that counts self re-renders, simulates constant data from props with string type for demonstration
interface CounterGridItemProps {
    constantDataFromProps: string;
    children?: React.ReactNode;
    // onClick?: () => void;
}
const CounterGridItem: FC<CounterGridItemProps> = (props) => {
    const rendersNo = useRef(0)
    // const [counter, setCounter] = useState(0)

    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()

    return (
        <span><p>{props.children}{"->"}{props.constantDataFromProps}: {rendersNo.current}</p></span>
    );
}


// HOOK - Use Layouts State
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
// HOOK - Use Layouts State and Encode/decode to and from Local Storage
type useLayoutsStateHook = (initialLayouts?: LayoutsObject) => [LayoutsObject, React.Dispatch<React.SetStateAction<LayoutsObject>>, (key: string, value: LayoutsObject) => void, (key: string) => LayoutsObject];
const useLayoutsState: useLayoutsStateHook = (initialLayouts?: LayoutsObject) => {

    /** 
    * Get a value, from local storage, by key
    * @param key - key to get from local storage
    * @returns value from local storage
    */
    const getFromLS = (key: string) => {
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
    const saveToLS = (key: string, value: LayoutsObject) => {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(
                "rgl-8",
                JSON.stringify({
                    [key]: value,
                })
            );
        }

    }

    const [layouts, setLayouts] = useState<LayoutsObject>(
        JSON.parse(JSON.stringify(getFromLS("layouts") || initialLayouts))
    );

    return [layouts, setLayouts, saveToLS, getFromLS]
}

type LayoutArray = ReadonlyArray<LayoutInterface>;
type ResponsiveReactGridLayoutonLayoutChange = (layout: LayoutArray, layouts: LayoutsObject) => void;


// Both <ResponsiveReactGridLayout> and <ReactGridLayout> take width to calculate positions on drag events. In simple cases a HOC WidthProvider can be used to automatically determine width upon initialization and window resize events.
const ResponsiveGridLayout = WidthProvider(Responsive);

type GridRealDataWithLSAndMemoizedItemsProps = {
    itemOutline: string;
    data: PortfolioItemInterface[];
}
const GridRealDataWithLSAndMemoizedItems: FC<GridRealDataWithLSAndMemoizedItemsProps> = (props) => {
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

    // Code for Memoizing each Child Grid Item !
    const children = React.useMemo(() => {
        // return new Array(props.count).fill(undefined).map((val, idx) => {
        return props.data.map((val, idx) => {
            return <LayoutItem key={idx}
            // style={{ outline: "1px solid black" }}
            style={{
                outline: props.itemOutline,
                // allows increasing top-level grid item height, to allow children pop-ups to be visible
                // zIndex: zIndex,  // zIndex probably requires to extract this into a separate FC Component, skip for now
              }}
            data-grid={{ x: idx, y: 1, w: 1, h: 1 }}>
                <CounterGridItem className="text" constantDataFromProps="Render Times">ID {idx}</CounterGridItem>
            </LayoutItem>;
        });
    }, [props.data, props.itemOutline]);
    return <>
        {/* SUPPORT ELEMENTS */}
        <p>Render Times: {rendersNo.current}</p>
        <button onClick={handleClickResetLayoutButton}>Reset Layout</button>
        {/* GRID ELEMENT */}
        <ResponsiveGridLayout
            layouts={layouts}
            // Handler User Layout Changes by ensuring they are persisted in Local Storage
            onLayoutChange={onLayoutChange}
            cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}>{children}</ResponsiveGridLayout>
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
