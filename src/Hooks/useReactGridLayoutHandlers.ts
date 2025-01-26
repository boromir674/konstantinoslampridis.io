import { LayoutInterface, LayoutsObject } from '../interfaces';
import { ResponsiveProps, ItemCallback } from 'react-grid-layout';

// temporarily import symbols from use Resize Suggest Hook
import { useMemoizedResizeSuggestionAlgorithm as useResizeAlgorithm, ResizeItemWithContextAlgorithm } from './useSuggestResize';

// Returned onLayoutChange Handler
type LayoutChangeEventHandler = (layout: LayoutInterface[], layouts: LayoutsObject) => void;
// Returned onResize Handler
type ResizeHandler = (
    layout: LayoutInterface[],
    oldItem: LayoutInterface,
    newItem: LayoutInterface,
    placeholder: LayoutInterface,
    event: MouseEvent,
    element: HTMLElement,
) => void;


const useReactGridLayoutHandlers: (
    // Hook Arg 0
    layoutChangeCallbacks: {  // this will be called in order by the handler at runtime
        saveToLS: (value: LayoutsObject) => void;
        setLayouts: (layouts: LayoutsObject) => void;
    },
    // Hook Arg 1
    resizeHandlerFactoryParameters: {
        // resizeAlgorithm: ResizeItemWithContextAlgorithm;
        unitLength: number;
        getContentHeight: (gridItemID: string) => number;
        contentAdjustmentOffsetHeight?: number;
        widthUnitLength?: number;
    }
) => [LayoutChangeEventHandler, ResizeHandler] = (
    layoutChangeCallbacks,
    resizeData,
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
        const handleLayoutChange: ResponsiveProps["onLayoutChange"] =
            // useCallback(
            (
                currentLayout: LayoutInterface[],
                allLayouts: LayoutsObject
            ) => {
                // on layout change we store the layouts object in local storage, under a key
                layoutChangeCallbacks.saveToLS(allLayouts);
                // we store the layouts in the component's state, and trigger a re-render
                layoutChangeCallbacks.setLayouts(allLayouts);
            }
        // , [layoutChangeCallbacks.saveToLS, layoutChangeCallbacks.setLayouts]);


        // onResize HANDLER
        const [resizeAlgo] = useResizeAlgorithm();
        const handleOnResize: ItemCallback =
            // useCallback(
            (
                layout,
                oldItem,
                newItem,
                placeholder,
                event,
                element,
            ) => {
                const index: string = newItem.i.toString();

                // Get potential Height Unit Suggestion, with Content-Aware Adjustment
                // const suggestedUnitValues = resizeData.resizeAlgorithm(
                const suggestedUnitValues = resizeAlgo(
                    newItem,  // information about Resized Item Dim Units; ie 1, 2, 3, 4, 5, 6
                    {
                        // fit Units to contentHeight, as sum of heights requested from browser-api
                        contentHeight: resizeData.getContentHeight(index),  // possibly queries the browser-api
                        // contentWidth: Math.max(...contentRegistry.current[index].map(({ dimsReporter }) => dimsReporter().width)),
                        unit_length: resizeData.unitLength,  // px
                        width_unit_length: resizeData.widthUnitLength,  // px // 97.5,
                        // account for Description Component Margin
                        contentAdjustmentOffsetHeight: resizeData.contentAdjustmentOffsetHeight,  // px
                        // contentAdjustmentOffsetWidth: -40, // px
                    }
                );
                // UPDATE: increase suggested in Height Units
                if (suggestedUnitValues !== undefined) {
                    if (suggestedUnitValues.unitsHeight) {
                        newItem.h = suggestedUnitValues.unitsHeight;
                        placeholder.h = suggestedUnitValues.unitsHeight;
                    }
                    if (suggestedUnitValues.unitsWidth) {
                        newItem.w = suggestedUnitValues.unitsWidth;
                        placeholder.w = suggestedUnitValues.unitsWidth;
                    }
                }
            }


        return [handleLayoutChange, handleOnResize];
    };


export default useReactGridLayoutHandlers;
