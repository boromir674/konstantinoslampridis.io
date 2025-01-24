/** Demonstrates CSS Reset on Box Model */
import React, { FC, forwardRef } from 'react';
// Import Dims Reporter Hook
import useStatelessDimensions from '../Hooks/useExposeStatelessDimsReporter';

////// Do CSS Reset //////
import '../global.css'; // Import the global CSS reset


// Story Component Props
interface Props {
    // Outer Box Margin
    outerMarginTop: string;
    outerMarginBottom: string;
    // outerMarginLeft: string;
    // outerMarginRight: string;

    // Outer Padding
    outerPaddingTop: string;
    outerPaddingBottom: string;

    // Outer Box Border Width
    outerBorderWidth: string;

    // Vertical Gap between the inner elements
    stackedItemsInBetweenGap: string;

    // Inner Element A - Margin, Padding, and Border
    itemAHeight: string;
    itemATopMargin: string;
    itemABottomMargin: string;
    itemATopPadding: string;
    itemABottomPadding: string;
    itemABoderWidth: string;

    // Inner Element B - Margin, Padding, and Border
    itemBHeight: string;
    itemBTopMargin: string;
    itemBBottomMargin: string;
    itemBTopPadding: string;
    itemBBottomPadding: string;
    itemBBoderWidth: string;
}



// Div Component with Self-Binding Dims Reporter
const MyDiv = forwardRef<HTMLDivElement, {
    // Props
    height: string;
    topMargin: string;
    bottomMargin: string;
    topPadding: string;
    bottomPadding: string;
    borderWidth: string;
    // Ref
    ref: React.RefObject<HTMLDivElement>;
}>((props, ref) => {
    const reportProps = (data: [string, string][]): string => {
        return data.map(([key, value]) => `${key}: ${value}`).join(", ");
    }
    return <div ref={ref as React.RefObject<HTMLDivElement>}
        style={{
            height: props.height,
            marginTop: props.topMargin,
            marginBottom: props.bottomMargin,
            paddingTop: props.topPadding,
            paddingBottom: props.bottomPadding,
            border: `${props.borderWidth} solid black`,
        }}
    >
        {reportProps([
            ["Margin Top", props.topMargin],
            ["Margin Bottom", props.bottomMargin],
            ["Padding Top", props.topPadding],
            ["Padding Bottom", props.bottomPadding],
            ["Border Width", props.borderWidth],
            ["Height", props.height],
        ])}
    </div>
});


// STORY Component
const BoxModelDemo: FC<Props> = (props) => {
    const [refA, reportDimensionsA] = useStatelessDimensions();
    const [refB, reportDimensionsB] = useStatelessDimensions();
    return <>
        {/* Helpers Buttons to log Dimensions of Items A and B: */}
        <button onClick={() => console.log(reportDimensionsA())}>Report Dimensions of Item A</button>
        <button onClick={() => console.log(reportDimensionsB())}>Report Dimensions of Item B</button>
        <div
            style={{
                // Outer Box Margin
                marginTop: props.outerMarginTop,
                marginBottom: props.outerMarginBottom,

                // Outer Box Padding
                paddingTop: props.outerPaddingTop,
                paddingBottom: props.outerPaddingBottom,

                border: `${props.outerBorderWidth} solid black`,
                padding: "1rem",
                // Inner Elements
                display: "flex",
                flexDirection: "column",
                gap: props.stackedItemsInBetweenGap,
            }}
        >
            {/* ITEM A */}
            <MyDiv ref={refA as React.RefObject<HTMLDivElement>}
                // Without CSS Reset:
                //  - "Occupied Height" = top-margin + bottom-margin + "Item Height"
                //  - "Item Height"     = height + padding + border
                height={props.itemAHeight}
                topMargin={props.itemATopMargin}
                bottomMargin={props.itemABottomMargin}
                topPadding={props.itemATopPadding}
                bottomPadding={props.itemABottomPadding}
                borderWidth={props.itemABoderWidth}
            />

            {/* ITEM B */}
            <MyDiv ref={refB as React.RefObject<HTMLDivElement>}
                // Without CSS Reset:
                //  - "Occupied Height" = top-margin + bottom-margin + "Item Height"
                //  - "Item Height"     = height + padding + border
                height={props.itemBHeight}
                topMargin={props.itemBTopMargin}
                bottomMargin={props.itemBBottomMargin}
                topPadding={props.itemBTopPadding}
                bottomPadding={props.itemBBottomPadding}
                borderWidth={props.itemBBoderWidth}
            />
        </div>
    </>
}


// STORY CONFIGURATION
export default {
    component: BoxModelDemo,
    title: "Box Model/With CSS Reset",
    tags: ["autodocs"],
};

// STORY A with PX Values
export const StoryWithPXValues: { args: Props } = {
    args: {
        outerMarginTop: "5px",
        outerMarginBottom: "5px",
        outerPaddingTop: "4px",
        outerPaddingBottom: "4px",
        outerBorderWidth: "3px",
        
        itemAHeight: "100px",
        itemATopMargin: "5px",
        itemABottomMargin: "5px",
        itemATopPadding: "4px",
        itemABottomPadding: "4px",
        itemABoderWidth: "3px",
        
        stackedItemsInBetweenGap: "2px",

        itemBHeight: "100px",
        itemBTopMargin: "5px",
        itemBBottomMargin: "5px",
        itemBTopPadding: "4px",
        itemBBottomPadding: "4px",
        itemBBoderWidth: "3px",
    }
}


// STORY A with REM Values
export const StoryWithREMValues: { args: Props } = {
    args: {
        outerMarginTop: "1rem",
        outerMarginBottom: "1rem",
        outerPaddingTop: "1rem",
        outerPaddingBottom: "1rem",
        outerBorderWidth: "1px",

        itemAHeight: "10rem",        
        itemATopMargin: "1rem",
        itemABottomMargin: "1rem",
        itemATopPadding: "1rem",
        itemABottomPadding: "1rem",
        itemABoderWidth: "1px",

        stackedItemsInBetweenGap: "1rem",

        itemBHeight: "10rem",
        itemBTopMargin: "1rem",
        itemBBottomMargin: "1rem",
        itemBTopPadding: "1rem",
        itemBBottomPadding: "1rem",
        itemBBoderWidth: "1px",
    }
}
