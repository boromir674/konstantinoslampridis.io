import { useState, useEffect, useCallback } from "react";

interface WindowSize {
  innerWidth: number | null;
  innerHeight: number | null;
}

/**
 * Equip a component with a state attribute that trackes the window size
 *
 * @summary This hook can be used to equip a component with the windowSize state
 * attribute, which automatically updates when a window "resize" (browser) event
 * happens. The necessary event listener is attached on component mount and
 * detached on unmount. The windowSize state attribute is initialized with null
 * if client signals we are doing 'server side rendering' or with the current
 * window size on hook invocation if 'server side render' is off.
 * @param {boolean} SSROn - Are we doing server side rendering, or not?
 * @return {[{innerWidth: number | null; innerHeight: number | null}]} The window size.
 */
const useWindowSizeTrackingState = (
  SSROn: boolean
): [{ innerWidth: number | null; innerHeight: number | null }] => {
  // initialize the windowSize state attribute with null if client signals we
  // are doing 'server side rendering' or query the browser window at runtime
  const [windowSize, setWindowSize] = useState<WindowSize>(() =>
    SSROn
      ? {
          // runs when build command runs (ie on developer machine, or on a server)
          innerWidth: null,
          innerHeight: null,
        }
      : {
          // runs on client browser, on component mount (due to useEffect below)
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        }
  );

  const getWindowSize = useCallback(() => {
    const { innerWidth, innerHeight } = window;
    return { innerWidth, innerHeight };
  }, [windowSize]);

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return [windowSize];
};

export default useWindowSizeTrackingState;
