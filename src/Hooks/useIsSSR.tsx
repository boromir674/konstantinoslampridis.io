import { useState, useEffect } from "react";

const useIsSSR = () => {
  // we always start off in "SSR mode", to ensure our initial browser render
  // matches the SSR render
  const [isSsr, setIsSsr] = useState(true);

  useEffect(() => {
    // `useEffect` never runs on the server, so we must be on the client if
    // we hit this block
    setIsSsr(false);  // I depend on nothing, I'll run on mount only (ie if we mount onle once, this runs once)
  }, []);

  return isSsr;
};

export default useIsSSR;
