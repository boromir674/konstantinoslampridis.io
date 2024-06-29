import { createContext } from 'react';

// Create a context with an initial value of an object that has `zIndex` and `setZIndex`.
// `zIndex` is a number and `setZIndex` is a function that updates `zIndex`.
// The initial value is just a placeholder, it will be replaced by the actual value provided by ZIndexContext.Provider.
const ZIndexContext = createContext<{ zIndex: number; setZIndex: (zIndex: number) => void }>({ zIndex: 0, setZIndex: () => {} });

export default ZIndexContext;
