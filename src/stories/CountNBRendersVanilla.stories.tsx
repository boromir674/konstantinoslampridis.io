/** Story showcasing hook for Counting Number of Renders */

import React, { FC, useCallback, useRef } from 'react';


// Component Props Interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RenderTimesComponentProps {
    propForRender: string;
}

// Component
const RenderTimesComponent: FC<RenderTimesComponentProps> = (props) => {
    const rendersNo = useRef(0)
    const logComponentRerender = useCallback(() => {
        rendersNo.current = rendersNo.current + 1
    }, [])

    // Increment Render Counter
    logComponentRerender()

    return <div>
        <h2>Render Times: {rendersNo.current}</h2>
        <p>Prop for Render: {props.propForRender}</p>
    </div>
}

export default {
    component: RenderTimesComponent,
    title: "RenderTimes",
    tags: ["autodocs"],
};

const SimpleArgsForComponentWithoutHook: RenderTimesComponentProps = {
    propForRender: "Hello World",
}

// STORY: Component using Hook to Count Renders
export const RenderTimesComponentWithoutHook = {
    args: SimpleArgsForComponentWithoutHook,
}
