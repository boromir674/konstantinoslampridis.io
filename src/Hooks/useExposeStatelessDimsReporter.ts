/** Hook for exposing DimsReporter stateless Interface instance */
import React, {useRef, type MutableRefObject } from 'react';

// HOOK
/** Provides a ref to bind to a DOM element and a function to report its dimensions
 * 
 * @example
 *     const MyComponent = () => {
 *       const [ ref, reportDimensions ] = useStatelessDimensions();
 *       return (
 *         <>
 *          <button onClick={() => alert(reportDimensions())}>Report Dimensions</button>
 *          <div ref={ref}>  // select the DOM element to measure, by binding the ref
 *          </div>
 *        </>
 *      );
 *     };
*/
const useExposeStatelessDimsReporter: () => [
    // React Ref (ie useRef)
    MutableRefObject<HTMLElement | null>,
    // DimsReporter Callback Interface
    () => { width: number; height: number; },
] = () => {
    // create a ref to store the DOM element to "measure" (initially null)
    const ref = useRef<HTMLElement | null>(null);

    // Return the ref and a function to report the dimensions
    return [
        ref,
        () => {
            if (!ref.current) throw new Error('Ref is null. Bind the ref to a DOM element.');
            return {
                // it is expected that the ref is not null at this point (bind happened already in client code)
                width: (ref as MutableRefObject<HTMLElement>).current.offsetWidth,
                height: (ref as MutableRefObject<HTMLElement>).current.offsetHeight,
            }; // Return the most recent dimensions
        },
    ];
};

export default useExposeStatelessDimsReporter;
