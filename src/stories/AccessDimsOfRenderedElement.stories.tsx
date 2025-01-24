import React, { FC, useCallback, useRef } from 'react';

// Component Referencing Ref
interface ComponentReferencingRefProps {};
const ComponentReferencingRef: FC<ComponentReferencingRefProps> = () => {
    const ref = useRef<HTMLDivElement>(null);

    const handleClick = useCallback(() => {
        if (ref.current) {
            // access div's dimensions through ref
            const dims = {
                width: ref.current.offsetWidth,
                height: ref.current.offsetHeight,
            }
            console.log('Component Referencing Ref: ', dims);
        } else {
            console.log('Component Referencing Ref: Ref is null');
        }
    }, []);

    return (
        <>
            <button onClick={handleClick}>Click to Log Ref</button>
            <div
                // Store div reference in ref.current
                ref={ref}
                style={{resize: "both", overflow: "auto", border: "1px solid black", padding: "10px"}}
            >
                <h1>Component Referencing Ref</h1>
                <p>Component Referencing Ref</p>
            </div>
        </>
    );
}

// STORY Configuration
// If Story is placed inside src/stories then nest story under PoC Group
// const isInsideStoriesDir = __dirname.includes('stories');
// const PREFIX = isInsideStoriesDir ? 'PoC/' : '';

// title: `${PREFIX}Component Referencing Ref`,
export default {
    component: ComponentReferencingRef,
    title: 'PoC/Bind Ref to an HTML Div and on-demand "live" access its Width and Height, leveraging browser api',
    tags: ["autodocs"],
};

// STORY that simply renders the Component
export const componentReferencingRefProps: ComponentReferencingRefProps = {};
