import React, { FC, useCallback, useRef, useState, useEffect, forwardRef, useImperativeHandle } from "react";
import useDimensions from "../Hooks/useExposeDimensionsReporter";
import useStatelessDimensions from "../Hooks/useExposeStatelessDimsReporter";

interface DimensionReporterProps {
    // allows CLIENT to SUBSCRIBE (event handler) to DIMENSIONS Updates
    onReportDimensions: (dimensions: { width: number; height: number }) => void;
}

// SELF DIMS REPORTER COMPONENT - V1
const DimensionReporter = forwardRef((props: DimensionReporterProps, ref) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
        width: 0,
        height: 0,
    });

    // allows CLIENT to (on-demand) "POLL" for DIMENSIONS
    useImperativeHandle(ref, () => ({
        reportDimensions: () => dimensions,
    }));

    useEffect(() => {
        if (!containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                const { offsetWidth, offsetHeight } = containerRef.current;
                const newDimensions = { width: offsetWidth, height: offsetHeight };
                setDimensions(newDimensions);
                props.onReportDimensions(newDimensions); // Notify client code
            }
        };

        // Create a ResizeObserver to track changes in dimensions
        const resizeObserver = new ResizeObserver(handleResize);
        resizeObserver.observe(containerRef.current);

        // Trigger initial measurement
        handleResize();

        return () => {
            resizeObserver.disconnect();
        };
    }, [props]);

    return (
        <div ref={containerRef} style={{ border: "1px solid black", padding: "10px" }}>
            <p>
                Width: {dimensions.width}px, Height: {dimensions.height}px
            </p>
            <div>Resize this container to see dimensions change.</div>
        </div>
    );
});

// CLIENT COMPONENT - V1
const DimsReporterV1 = () => {
    const reporterRef = useRef<{ reportDimensions: () => { width: number; height: number } } | null>(
        null
    );

    // Real-Time Listener/Subscription to Dimensions Changes
    const handleDimensionsUpdate = (dimensions: { width: number; height: number }) => {
        console.log("Dimensions updated WIDTH:", dimensions.width, "HEIGHT:", dimensions.height);
    };

    // ON-DEMAND / Poll for Dimensions, by wraping "exposed" DimensionReporter interface
    const reportCurrentDimensions = () => {
        if (reporterRef.current) {
            const dimensions = reporterRef.current.reportDimensions();
            console.log("On-Demand Call reportDimensions: WIDTH", dimensions.width, "HEIGHT", dimensions.height);
        }
    };

    return (
        <div>
            <h1>Dimension Reporter Example</h1>
            <button onClick={reportCurrentDimensions}>On-Demand Poll Dimensions</button>
            <DimensionReporter
            // boilerplate to bind the html element/node to the ref object
            ref={reporterRef}
            // pass custom handler of real-time Resize Events
            onReportDimensions={handleDimensionsUpdate} />
        </div>
    );
};


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


// CLIENT COMPONENT - V2
const DimsReporterV2 = () => {
    // const { ref, dimensions, reportDimensions } = useDimensions();
    const [ ref, reportDimensions ] = useStatelessDimensions();
    // ON-DEMAND / Poll for Dimensions, by wraping "exposed" DimensionReporter interface
    const handleReportDimensions = () => {
        const currentDimensions = reportDimensions();
        console.log("On-Demand Call reportDimensions: WIDTH", currentDimensions.width, "HEIGHT", currentDimensions.height);
    };

    // without a useState any call to reportDimensions will fail since ref is null here
    // const dims = reportDimensions();

    return (
        <div>
            <h1>Dimension Reporter Example</h1>
            <GridItemContents backgroundColor="lightblue"/>
            <button onClick={handleReportDimensions}>On-Demand Poll Dimensions</button>
            <div
                // bind and grant Dimensions Reporting ability (using browser-api)
                ref={ref}
                // story-specific styles
                style={{
                    border: "1px solid black",
                    padding: "20px",
                    resize: "both",  // Allow user resizing
                    overflow: "auto",
                    width: "200px",
                    height: "150px",
                }}
            >
                Resize me!
            </div>
            {/* <p>
                Current Width: {dims.width}px, Current Height: {reportDimensions().height}px
            </p> */}
        </div>
    );
};


// STORYBOOK STORIES
// type AppProps = typeof DimsReporterV1 | typeof DimsReporterV2;
type AppProps = { children: JSX.Element };

// const App: FC<{ (props: React.ComponentType): JSX.Element }> = (Component) => {
const App: FC<AppProps> = ({children}) => {
    return (
        <div>
            {children}
        </div>
    );
}

// Story Configuration
export default {
    component: App,
    title: "Dims Reporter Component",
    tags: ["autodocs"],
};

const SimpleExampleArgs: AppProps = {children: <DimsReporterV1/>};

export const SimpleExample = {
    args: SimpleExampleArgs,
};

const WithHookArgs: AppProps = {children: <DimsReporterV2/>};
export const WithHook = {
    args: WithHookArgs,
};
