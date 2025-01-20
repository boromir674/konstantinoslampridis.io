import { useCallback, useMemo } from 'react';

// INPUT
/** Represents the 'width' and 'height' measured in "Units"; positive integers */
interface Item {
    w: number;   // measured in Units; ie 1, 2, 3, 4, 5, ...
    h: number;  // measured in Units
}
interface ResizeContext {
    contentHeight?: number;  // measured in px
    contentWidth?: number;   // measured in px
    unit_length: number;
    contentAdjustmentOffsetHeight?: number;  // measured in px
    contentAdjustmentOffsetWidth?: number;  // measured in px
};
// OUTPUT
/** Represents the object returned by the Algorithm: 'width'/'height' in Units */
type SuggestedItemUnits = {
    unitsWidth?: number;   // measured in units
    unitsHeight?: number;  // measured in units
} | undefined;

type ResizeItemWithContextAlgoV4<E, C, R> = ((item: E, context: C, ...args: any[]) => R);


// local type alias for DRY
type ResizeItemWithContextAlgorithm = ResizeItemWithContextAlgoV4<Item, ResizeContext, SuggestedItemUnits>;

// const useResizeSuggestionAlgorithm = useCallback<ResizeItemWithContextAlgorithm>(
//     // Concrete Implementation of Resize Suggestion Algorithm
//     (item, context) => {
//         const contentDims = {
//             height: (context.contentHeight ?? 0) + (context.contentAdjustmentOffsetHeight ?? 0),
//             width: (context.contentWidth ?? 0) + (context.contentAdjustmentOffsetWidth ?? 0)
//         };
//         if (contentDims.height) {

//             // convert Item Height Units to PX
//             // const userHeightPX = item.unitsHeight * context.unit_length;
//             const userHeightPX: number = useMemo(() => item.h * context.unit_length, [item.h, context.unit_length]);

//             console.log("User Height: ", userHeightPX, 'Units', item.h);

//             // if User Height PX is "not enough" for Content Height
//             if (userHeightPX < contentDims.height) {  // compare PX

//                 // measure how many Units are needed to "cover" the Content Height
//                 // const adjustedUnitsHeight: number = Math.ceil(contentDims.height / context.unit_length);
//                 const adjustedUnitsHeight: number = useMemo(() => Math.ceil(contentDims.height / context.unit_length), [contentDims.height, context.unit_length]);

//                 return {  // Suggest to adjust the Item's Height Units
//                     unitsHeight: adjustedUnitsHeight
//                 }
//             }
//         } else {
//             console.warn('Content Height could not computed!');
//         }
//         // we have concluded that Item's Units "are sufficient" to cover the Content Height
//         // so we suggest "no changes" without a return value
//     }, [
//     // Dependencies
// ]);

const useMemoizedResizeSuggestionAlgorithm: () => [ResizeItemWithContextAlgorithm] = () => {
        // Resize Algorithm with Context - Concrete Implementation
        const algorithCallback: ResizeItemWithContextAlgorithm = (item, context) => {

            // Resize Suggestion - Concrete Implementation, as Pure Function (no deps)
            const resizeSuggestionAlgo: ResizeItemWithContextAlgorithm = (item, context) => {
                const contentDims = {
                    height: (context.contentHeight ?? 0) + (context.contentAdjustmentOffsetHeight ?? 0),
                    width: (context.contentWidth ?? 0) + (context.contentAdjustmentOffsetWidth ?? 0)
                };
                if (contentDims.height) {

                    // convert Item Height Units to PX
                    // const userHeightPX = item.unitsHeight * context.unit_length;

                    // const userHeightPX: number = useMemo(() => item.h * context.unit_length, [item.h, context.unit_length]);
                    
                    const userHeightPX: number = item.h * context.unit_length;

                    console.log("User Height: ", userHeightPX, 'Units', item.h);

                    // if User Height PX is "not enough" for Content Height
                    if (userHeightPX < contentDims.height) {  // compare PX

                        // measure how many Units are needed to "cover" the Content Height
                        // const adjustedUnitsHeight: number = Math.ceil(contentDims.height / context.unit_length);

                        const adjustedUnitsHeight: number = Math.ceil(contentDims.height / context.unit_length);

                        // const adjustedUnitsHeight: number = useMemo(() => Math.ceil(contentDims.height / context.unit_length), [contentDims.height, context.unit_length]);

                        return {  // Suggest to adjust the Item's Height Units
                            unitsHeight: adjustedUnitsHeight
                        }
                    }
                } else {
                    console.warn('Content Height could not computed!');
                }
                // we have concluded that Item's Units "are sufficient" to cover the Content Height
                // so we suggest "no changes" without a return value
            }

            const suggestedItemUnitChanges = resizeSuggestionAlgo(item, context);

            // const suggestedItemUnitChanges = useMemo(() => resizeSuggestionAlgo(item, context), [
            //     // Dependencies
            //     resizeSuggestionAlgo,

            //     item.h, item.w,

            //     context.unit_length,

            //     context.contentHeight, context.contentWidth,

            //     context.contentAdjustmentOffsetHeight,
            //     context.contentAdjustmentOffsetWidth,
            // ]);

            return suggestedItemUnitChanges;
        };
        return [algorithCallback];
    };

export { useMemoizedResizeSuggestionAlgorithm };
