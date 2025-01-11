import { createContext } from 'react';

/** Context that provides a function to update the z-index CSS property of a parent component.
 * 
 * This context is used by components that need to update the z-index of their parent components.
 * Provides a default setZIndex function to help prevent errors when the context is not provided.
*/
const ZIndexContext = createContext<{

    // INTERFACE
    setZIndex: (zIndex: number) => void;
}>({
    // DEFAULT VALUES
    setZIndex: () => {
        // This initial value is just a placeholder, it will be replaced by the actual value provided by ZIndexContext.Provider.
        throw new Error('setZIndex function should not be called without a context provider');
    },

});

export default ZIndexContext;
