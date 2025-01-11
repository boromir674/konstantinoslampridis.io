import React, { FC, useRef, useState, useCallback } from "react";

// Import the "Responsive" version of the GridLayout to support "Breakpoints" and Layouts
import { Responsive, WidthProvider } from "react-grid-layout";
// IE
// layouts={layouts}
//breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}


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

type GridWithMemoizedItemsProps = {
    count: number
}
const GridWithStateAndMemoizedItems: FC<GridWithMemoizedItemsProps> = (props) => {
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
        return new Array(props.count).fill(undefined).map((val, idx) => {
            return <div key={idx} style={{ outline: "1px solid black" }} data-grid={{ x: idx, y: 1, w: 1, h: 1 }}>
                <CounterGridItem className="text" constantDataFromProps="Render Times">ID {idx}</CounterGridItem>
            </div>;
        });
    }, [props.count]);
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
    component: GridWithStateAndMemoizedItems,
    title: "Grid with Local Storage and Memoized Items",
    tags: ["autodocs"],
};

const SimpleArgs: GridWithMemoizedItemsProps = {
    count: 5,
}

export const SimpleResponsiveLocalStorageLayout = {
    args: SimpleArgs,
}
