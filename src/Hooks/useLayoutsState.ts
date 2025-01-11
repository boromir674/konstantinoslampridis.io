/** Provides GridLayouts state, setter and encoder for LS integration */
import React, { useState } from 'react';
import { LayoutInterface, LayoutsObject } from '../interfaces';


type useLayoutsStateHook = (initialLayouts?: LayoutsObject) => [LayoutsObject, React.Dispatch<React.SetStateAction<LayoutsObject>>, (key: string, value: LayoutsObject) => void, (key: string) => LayoutsObject];

const useLayoutsState: useLayoutsStateHook = (initialLayouts?: LayoutsObject) => {

    /** 
    * Get a value, from local storage, by key
    * @param key - key to get from local storage
    * @returns value from local storage
    */
    const getFromLS = (key: string) => {
        type LS = {
            [key: string]: any;
        };
        let ls: LS = {};
        if (typeof window !== "undefined" && window.localStorage) {
            try {
                ls = JSON.parse(window.localStorage.getItem("rgl-8") || "{}");
            } catch (e) {
                /* Ignore */
            }
        }
        return ls[key];
    }

    /** 
  * Save a jsonified key value pair to local storage, under the key "rgl-8".
  * @summary Saves a jsonified key value pair to local storage, by setting the
  * "rgl-8" key to point to the jsonified key value pair
  * @param key - key to save to local storage
  * @param value - value to save to local storage
  */
    const saveToLS = (key: string, value: LayoutsObject) => {
        if (typeof window !== "undefined" && window.localStorage) {
            window.localStorage.setItem(
                "rgl-8",
                JSON.stringify({
                    [key]: value,
                })
            );
        }

    }

    const [layouts, setLayouts] = useState<LayoutsObject>(
        JSON.parse(JSON.stringify(getFromLS("layouts") || initialLayouts || {}))
    );

    return [layouts, setLayouts, saveToLS, getFromLS]
}

export default useLayoutsState;
