import { useCallback } from 'react';

/*
    * This hook is used to handle the click event on an Experience Item.
    * Use it in the Professional Section to make the component where the
    * mouse is to augment a bit.

    * @param {string} to - The element id of the section to scroll to.
*/
const useHandleClickONExperienceItem = () => 
    useCallback(() => {
        console.log('Pressed Experience Item');
        // const target = document.querySelector(elementId);
        // if (target) {
        //     const yOffset = -100; // adjust this as needed
        //     const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
        //     window.scrollTo({ top: y, behavior: "smooth" });
        // }
    }, []);


export default useHandleClickONExperienceItem;
