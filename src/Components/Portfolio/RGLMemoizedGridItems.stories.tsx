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

// Both <ResponsiveReactGridLayout> and <ReactGridLayout> take width to calculate positions on drag events. In simple cases a HOC WidthProvider can be used to automatically determine width upon initialization and window resize events.
const ResponsiveGridLayout = WidthProvider(Responsive);

type GridWithMemoizedItemsProps = {
    count: number
}
const GridWithMemoizedItems: FC<GridWithMemoizedItemsProps> = (props) => {
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])
    logComponentRerender()

    const children = React.useMemo(() => {
        return new Array(props.count).fill(undefined).map((val, idx) => {
            return <div key={idx} style={{ outline: "1px solid black" }} data-grid={{ x: idx, y: 1, w: 1, h: 1 }}>
                <CounterGridItem className="text" constantDataFromProps="Render Times">ID {idx}</CounterGridItem>
            </div>;
        });
    }, [props.count]);
    return <>
        <p>Render Times: {rendersNo.current}</p><ResponsiveGridLayout cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }} breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}>{children}</ResponsiveGridLayout>
    </>;
}


export default {
    component: GridWithMemoizedItems,
    title: "Grid/Without State and Memoized Trivial Items",
    tags: ["autodocs"],
};

const SimpleArgs: GridWithMemoizedItemsProps = {
    count: 5,
}

export const MinimumNumberOfItemReRenders = {
    args: SimpleArgs,
}
