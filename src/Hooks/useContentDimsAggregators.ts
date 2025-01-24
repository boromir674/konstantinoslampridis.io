import { useMemo, useCallback } from 'react';

import { makeAggregator } from './useDimsAggregatorMaker';

// todo dry these
type DimensionKey = 'width' | 'height';
// Concrete Enumeration of Dimension Keys
const width: DimensionKey = 'width';
const height: DimensionKey = 'height';
const keysSet = new Set([width, height]);

type DimsReporter = () => { width: number; height: number };

type ContentRegistry = Record<string, { dimsReporter: DimsReporter }[]>;


type GridItemContentDimAggregator = (itemKey: string) => number;

// type ContentDimsAggregatorsMaker = (contentRegistry: ContentRegistry, ...args: DimensionKey[]) => DimsAggregator[];
type ContentDimsAggregatorsMaker = (contentRegistry: ContentRegistry, ...args: DimensionKey[]) => ReadonlyArray<(itemKey: string) => number>;

const useContentDimsAggregators: ContentDimsAggregatorsMaker = (contentRegistry: ContentRegistry, ...args: DimensionKey[]) => {
    // loop over args and call makeAggregator for each
    const aggregators = args.map((key: DimensionKey) => {
        if (!keysSet.has(key)) {
            throw new Error(`Invalid key ${key}`);
        }
        const aggregator_type = key.toUpperCase() + '_SUM';

        const [sumDims] = makeAggregator(aggregator_type as 'HEIGHT_SUM' | 'WIDTH_SUM');

        const gridContentAggregator: GridItemContentDimAggregator = useCallback((itemKey: string) => {
            const dimsReporters: DimsReporter[] = contentRegistry[itemKey].map(({ dimsReporter }) => dimsReporter);
            return sumDims(dimsReporters);
        }, [sumDims, contentRegistry]);

        return gridContentAggregator;
    });
    return aggregators;
};

export { useContentDimsAggregators };
