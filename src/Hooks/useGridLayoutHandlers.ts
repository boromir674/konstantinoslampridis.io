import { useCallback } from 'react';

import { LayoutInterface, LayoutsObject } from '../interfaces';


type LayoutChangeEventHandler = (layout: ReadonlyArray<LayoutInterface>, layouts: LayoutsObject) => void;

const useGridLayoutHandlers: (
    layoutChangeCallbacks: {
        saveToLS: (value: LayoutsObject) => void;
        setLayouts: (layouts: LayoutsObject) => void;
    },
) => [LayoutChangeEventHandler] = (
    layoutChangeCallbacks,
) => {
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

        return [handleLayoutChange];
    };

export default useGridLayoutHandlers;
