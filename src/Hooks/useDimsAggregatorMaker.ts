import { useCallback } from 'react';


type DimsReporter = () => { width: number, height: number };

type DimsAggregator = (dimsReporter: DimsReporter[]) => number;

type DimensionKey = 'width' | 'height';
type AggregatorType = 'HEIGHT_SUM' | 'WIDTH_SUM';


// Concrete Enumeration of Dimension Keys
const width: DimensionKey = 'width';
const height: DimensionKey = 'height';
const keysSet = new Set([width, height]);


type DimsAggregatorMaker = (aggregatorType: AggregatorType) => [DimsAggregator];

/** Callback returning Callback that sums Height or Width, given DimsReporter array.
 * 
 * @example
 *     const [sumHeights] = makeAggregator('height');
 *     const [sumWidths] = makeAggregator('width');
 * 
 *     const dimsReporters = [
 *       () => ({ width: 20, height: 5}),
 *       () => ({ width: 10, height: 15}),
 *     ];
 * 
 *     console.log(sumHeights(dimsReporters) === 20); // true
 *     console.log(sumWidths(dimsReporters) === 30); // true
 * 
*/
const makeAggregator: DimsAggregatorMaker = (aggregatorType) => {

    const dimKey = aggregatorType.replace('_SUM', '').toLowerCase() as DimensionKey;

    if (!keysSet.has(dimKey)) {
        throw new Error(`Aggregator type ${aggregatorType} is not supported. Supported: ${Array.from(keysSet).join(', ')}`);
    }

    const dimsAggregator: DimsAggregator = (dimsReporter: DimsReporter[]) => {
        return dimsReporter.reduce((acc, dimsReporter, _index) => {
            return acc + dimsReporter()[dimKey];
        }, 0);
    };

    return [dimsAggregator];
};

export { makeAggregator };
