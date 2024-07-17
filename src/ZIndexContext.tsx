import { createContext } from 'react';

// Create a context with an initial value of an object that has `zIndex` and `setZIndex`.
// `zIndex` is a number and `setZIndex` is a function that updates `zIndex`.
// The initial value is just a placeholder, it will be replaced by the actual value provided by ZIndexContext.Provider.
const ZIndexContext = createContext<{ zIndex: number; setZIndex: (zIndex: number) => void }>({
    zIndex: 0,
    // Instead of an empty function, provide a function that throws an error.
    // This makes it clear that setZIndex is not supposed to be called without a context provider.
    setZIndex: () => {
        throw new Error('setZIndex function should not be called without a context provider');
    },
});

export default ZIndexContext;
