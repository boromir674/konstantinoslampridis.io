import { useCallback } from 'react';

import { LayoutInterface, LayoutsObject } from '../interfaces';

type LayoutChangeEventHandler = (layout: ReadonlyArray<LayoutInterface>, layouts: LayoutsObject) => void;
type ItemResizeEventHandler = (layout: ReadonlyArray<LayoutInterface>, oldItem: LayoutInterface, newItem: LayoutInterface, placeholder: LayoutInterface) => void;

const useGridLayoutHandlers: (layoutChangeCallbacks: {
    saveToLS: (value: LayoutsObject) => void;
    setLayouts: (layouts: LayoutsObject) => void;
}) => [LayoutChangeEventHandler, ItemResizeEventHandler] = (layoutChangeCallbacks) => {
    // interfaces with { WidthProvider, Responsive } from "react-grid-layout";

    /**
     * Handle Layout-Change Event, by calling the provided callbacks which accept a LayoutsObject.
     *
     * Layout-Change Events fire:
     *  - after a drag-n-drop action by the user
     *  - after a resize action on an Item (after mouse is released from bottom-right corner) by the user
     *  - after user clicks on the 'Reset Layout' (aka Default Layout) button (after resetLayout)
     *
     * When executed it is expected to save the current layout in local storage,
     * and update Grid Component state with it.
     *
     * @param currentLayout - the current layout of the Portfolio Items; a LayoutInterface array
     * @param allLayouts - all layouts of the Portfolio Items, as a map of breakpoints (ie 'lg', 'md', 'sm', 'xs', 'xxs') to LayoutInterface arrays
     */
    const handleLayoutChange: LayoutChangeEventHandler = useCallback((
        currentLayout: ReadonlyArray<LayoutInterface>,
        allLayouts: LayoutsObject
    ) => {
        // on layout change we store the layouts object in local storage, under a key
        layoutChangeCallbacks.saveToLS(allLayouts);
        // we store the layouts in the component's state, and trigger a re-render
        layoutChangeCallbacks.setLayouts(allLayouts);
    }, [layoutChangeCallbacks.saveToLS, layoutChangeCallbacks.setLayouts]);

    /**
     * Handle Grid-Item-Resize Event, by heuristically modifying Item Height.
     * 
     * Handles Grid-Item-Resize Event, by heuristically post modifying Item
     * Height, enforcing a minimum Height constraint inversely proportional to Width.
     * 
     * It uses a simple heuristic for increasing the Height when the Width
     * decreases below predefined thresholds.  
     * Currently 2 thresholds are used:
     *  - If      width <= 2 units -->  add 2 units to height
     *  - Else If width <= 3 units -->  add 1 unit  to height
     * 
     * Grid-Item-Resize Events are fired:
     * 
     *  - continuously *during* user drags-and-drops on the bottom right corner
     *    of a Grid Layout Item (right after the bottom-right corner is pressed,
     *    continuing until the mouse is released)
     * 
     * Can be used to enforce constraints when User resizes a Grid Layout Item.
     *
     * @param layout - all Layout Items as array of objects of LayoutInterface type
     * @param oldLayoutItem - the resized LayoutInterface object, before the resize
     * @param layoutItem - the resized LayoutInterface object, after the resize. This object is mutable, and can be modified
     * @param placeholder - 
     */
    const handleItemResize = useCallback((
        layout: ReadonlyArray<LayoutInterface>,
        oldLayoutItem: LayoutInterface,
        layoutItem: LayoutInterface,
        placeholder: LayoutInterface,
    ) => {
        // TODO add code that reads "live" size of the item contents (title, description, link/releases lists)
        // and adjusts it height accordingly !

        if (layoutItem.w <= 2) {  // if user resized item with "very small" width
            const heightPlusTwo = layoutItem.h + 2;
            // modifying `layoutItem` to enforce constraints
            layoutItem.h = heightPlusTwo;
            placeholder.h = heightPlusTwo;
        } else if (layoutItem.w <= 3) {  // if user resized item resulting in "small" width
            const heightPlusOne = layoutItem.h + 1;
            // modifying `layoutItem` to enforce constraints
            layoutItem.h = heightPlusOne;
            placeholder.h = heightPlusOne;
        }
    }, []);

    return [handleLayoutChange, handleItemResize];
};

export default useGridLayoutHandlers;
