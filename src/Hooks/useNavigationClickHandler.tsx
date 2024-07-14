import { useCallback } from 'react';

/*
    * This hook is used to handle the click event on the navigation items.
    * It is used to scroll to the corresponding section on the page.

    * @param {string} to - The element id of the section to scroll to.
*/
const useHandleNavigationClickFunction = (elementId: string) => 
    useCallback(() => {
        const element = document.querySelector(elementId);
        // NEW
        // const element = document.getElementById(elementId);
        if (element) {
            const yOffset = -100; // adjust this as needed
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
            // NEW
            // element.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        }
    }, [elementId]);


export default useHandleNavigationClickFunction;
