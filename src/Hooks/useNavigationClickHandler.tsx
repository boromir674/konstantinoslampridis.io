import { useCallback } from 'react';

/*
    * This hook is used to handle the click event on the navigation items.
    * It is used to scroll to the corresponding section on the page.

    * @param {string} to - The element id of the section to scroll to.
*/
const useHandleNavigationClickFunction = (elementId: string) => 
    useCallback(() => {
        const target = document.querySelector(elementId);
        if (target) {
            const yOffset = -100; // adjust this as needed
            const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    }, [elementId]);


export default useHandleNavigationClickFunction;
