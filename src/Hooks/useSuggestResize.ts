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
    width_unit_length?: number;
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

const useMemoizedResizeSuggestionAlgorithm: () => [ResizeItemWithContextAlgorithm] = () => {
    // Resize Algorithm with Context - Concrete Implementation
    const algorithCallback: ResizeItemWithContextAlgorithm = (item, context) => {

        // Resize Suggestion - Concrete Implementation, as Pure Function (no deps)
        const resizeSuggestionAlgo: ResizeItemWithContextAlgorithm = (item, context) => {
            const contentDims = {
                height: (context.contentHeight ?? 0) + (context.contentAdjustmentOffsetHeight ?? 0),
                width: (context.contentWidth ?? 0) + (context.contentAdjustmentOffsetWidth ?? 0)
            };
            const suggestedItemUnitsChanges: SuggestedItemUnits = {
                unitsWidth: undefined,
                unitsHeight: undefined
            };
            if (contentDims.height) {

                // convert current Item Height Units to PX
                const userHeightPX: number = item.h * context.unit_length;

                // if User Height PX is "not enough" for Content Height
                if (userHeightPX < contentDims.height) {  // compare PX

                    // measure how many Units are needed to "cover" the Content Height
                    // const adjustedUnitsHeight: number = Math.ceil(contentDims.height / context.unit_length);
                    const adjustedUnitsHeight: number = Math.ceil(contentDims.height / context.unit_length);

                    // Suggest to adjust the Item's Height Units
                    suggestedItemUnitsChanges.unitsHeight = adjustedUnitsHeight;
                }
            }
            if (contentDims.width) {

                const width_unit_length = context.width_unit_length ?? context.unit_length;
                // convert current Item Width Units to PX
                const userWidthPX: number = item.w * width_unit_length;

                // if User Width PX is "not enough" for Content Width
                if (userWidthPX < contentDims.width) {  // compare PX

                    // measure how many Units are needed to "cover" the Content Width
                    const adjustedUnitsWidth: number = Math.ceil(contentDims.width / width_unit_length);

                    // Suggest to adjust the Item's Width Units
                    suggestedItemUnitsChanges.unitsWidth = adjustedUnitsWidth;
                }

            }

            return suggestedItemUnitsChanges;
        }

        const suggestedItemUnitChanges = resizeSuggestionAlgo(item, context);
        console.log('suggestedItemUnitChanges:', suggestedItemUnitChanges);
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

export { useMemoizedResizeSuggestionAlgorithm, type ResizeItemWithContextAlgorithm };
