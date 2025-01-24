import React, { FC, useEffect, useCallback, useRef } from 'react';


interface DynamicMultiRefBindingToRenderedElementsProps {
    refBinding: string;
};
const DynamicMultiRefBindingToRenderedElementsWithOneHandler: FC<DynamicMultiRefBindingToRenderedElementsProps> = (props) => {
    const refs = useRef<Record<string, React.RefObject<HTMLDivElement | null>>>({
        '0': useRef<HTMLDivElement | null>(null),
        '1': useRef<HTMLDivElement | null>(null),
        '2': useRef<HTMLDivElement | null>(null),
    });

    const handleClick = useCallback(() => {
        console.log('Records of Refs:', refs.current);
        console.log('Ref 0: ', refs.current['0'].current);
        console.log('Ref 1: ', refs.current['1'].current);
        console.log('Ref 2: ', refs.current['2'].current);
    }, []);

    const DATA = ['Data Content 1', 'Data Content 2', 'Data Content 3'];
    const DIV_STYLE = { resize: "both", overflow: "auto", border: "1px solid black", padding: "10px" };

    // GLOBAL RESIZE HANDLER
    const handleResizeGlobally: React.EventHandler<React.SyntheticEvent> = useCallback((event) => {
        console.log('Global Resize Event: ', event);
    }, []);

    // GLOBAL RESIZE OBSERVER
    const resizeObserver = useRef<ResizeObserver | null>(null);

    useEffect(() => {
        // Create a ResizeObserver
        resizeObserver.current = new ResizeObserver((entries) => {
            entries.forEach((entry) => {
                console.log('DIV Element ID = ', entry.target.id);
                const { target, contentRect, borderBoxSize } = entry;
                console.log(`Resizing ${target.id || 'NO ID'}:`, {
                    width: contentRect.width,
                    height: contentRect.height,
                });

                // Retrieve the key from a data attribute
                const key = target.getAttribute('data-key');
                console.log(`Resizing element with key ${key}:`, {
                    width: contentRect.width,
                    height: contentRect.height,
                });
            });
        });

        // Observe each ref
        Object.values(refs.current).forEach((refObj) => {
            if (refObj.current) {
                resizeObserver.current?.observe(refObj.current);
            }
        });

        return () => {
            // Clean up the ResizeObserver
            resizeObserver.current?.disconnect();
        };
    }, []);

    return (
        <>
            <button onClick={handleClick}>Click to Log All Refs</button>
            {DATA.map((data, idx) => {

                const handleThisButtonClick = () => {
                    const refObject = refs.current[idx.toString()];
                    console.log('Ref ', idx, ' : ', refObject.current);
                    // Due to our Box model the dims below are roughly:
                    console.log('Dimensions: ', {
                        // WIDTH = width + padding + border_width * 2
                        width: refObject.current?.offsetWidth,
                        // HEIGHT = height + padding + border_width * 2
                        height: refObject.current?.offsetHeight,
                    });
                }

                return (
                    // If refBinding is 'static'
                    <>
                        {
                            props.refBinding === 'static' ?
                                // If refBinding is 'static' bind with simple syntax
                                <div
                                    id={`ID-${idx.toString()}`}
                                    key={idx.toString()}
                                    ref={refs.current[idx.toString()] as React.RefObject<HTMLDivElement>}
                                    style={DIV_STYLE as React.CSSProperties}
                                    // style allows user to drag-n-drop which should fire an onResize event
                                    // here we pass a handler to the onResize Event
                                    onResize={handleResizeGlobally}
                                >
                                    {data}
                                    <button onClick={handleThisButtonClick}>Click to Log This Ref</button>
                                </div> :
                                // If refBinding is 'dynamic' bind with callback
                                <div
                                    key={idx.toString()}
                                    ref={(el) => {
                                        const refObject: React.RefObject<HTMLDivElement | null> = { current: el };
                                        refs.current[idx.toString()] = refObject;
                                    }}
                                    style={DIV_STYLE as React.CSSProperties}
                                >
                                    {data}
                                    <button onClick={handleThisButtonClick}>Click to Log This Ref</button>
                                </div>
                        }
                    </>
                );
            })}
        </>
    );
}

// STORY Configuration
export default {
    component: DynamicMultiRefBindingToRenderedElementsWithOneHandler,
    title: 'PoC/Bind Multiple Refs to dynamic HTML Divs and use Global Resize Handler',
    tags: ["autodocs"],
};

// STORY that Binds Multiple Refs to Dynamically generated HTML Elements, using the 'static' syntax
export const MultiRefBindingWithStaticSyntax: DynamicMultiRefBindingToRenderedElementsProps = {
    refBinding: 'static'
};

// STORY that Binds Multiple Refs to Dynamically generated HTML Elements, using the 'dynamic' syntax
export const MultiRefBindingWithDynamicSyntax: DynamicMultiRefBindingToRenderedElementsProps = {
    refBinding: 'dynamic'
};
