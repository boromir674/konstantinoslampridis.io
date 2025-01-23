/** Hook for exposing DimsReporter stateless Interface instance */
import React, {useRef, type MutableRefObject } from 'react';


/** Returns a ref and a Layout (Dimensions) Reporter of a DOM (bound) element.
 * 
 * Provides a ref and a function that when called returns a
 * {width: number; height: number} object.
 * 
 * The ref should be bound by client code to an html DOM element (ie in jsx),
 * and only then the function "will work" (ie return the dimensions).
 * 
 * The function reports the Layout as width/height Integers matching the
 * "Border Box" of the element.
 * 
 * If No CSS reset is applied:
 *  -  "Border Box" is "Content Box" + Padding + Border
 *    - ie Layout Height = Content Height + Padding + Border
 * 
 * Typically, offsetWidth and offsetHeight are measurements in pixels of the
 * element's CSS width and height, including any borders, padding, and
 * vertical scrollbars (if rendered). It does not include the width of
 * pseudo-elements such as ::before or ::after.
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
