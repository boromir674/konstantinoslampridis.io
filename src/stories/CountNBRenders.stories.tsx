/** Story showcasing hook for Counting Number of Renders */

import React, { FC, useCallback, useRef, useEffect } from 'react';

// HOOK - Automatically Count Renders
type UseRenderCounterHook = () => [number, () => void]

const useRenderCounter: UseRenderCounterHook = () => {
    const rendersNo = useRef(0)
    // const logComponentRerender = useCallback(() => {
    //     rendersNo.current = rendersNo.current + 1
    // }, [rendersNo.current])

    useEffect(() => {
        rendersNo.current = rendersNo.current + 1
    }, []);
    
    // return [rendersNo.current, logComponentRerender]
    return [rendersNo.current]
}

// Component Props Interface
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface RenderTimesComponentProps {
    propForRender: string;
    // Story Specific props
    // useHook: boolean;
}

// Component
const RenderTimesComponent: FC<RenderTimesComponentProps> = (props) => {
    const [renderCounter] = useRenderCounter()
    // logComponentRerender()

    return <div>
        <h2>Render Times: {renderCounter}</h2>
        <p>Prop for Render: {props.propForRender}</p>
    </div>
}

export default {
    component: RenderTimesComponent,
    title: "RenderTimesWithHook",
    tags: ["autodocs"],
};

const SimpleArgsForComponentWithHook: RenderTimesComponentProps = {
    propForRender: "Hello World",
}

// STORY: Component using Hook to Count Renders
export const RenderTimesComponentWithHook = {
    args: SimpleArgsForComponentWithHook,
}
