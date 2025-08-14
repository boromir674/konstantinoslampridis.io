import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

export type ColorMode = 'light' | 'dark';
export type InitialMode = ColorMode | 'system';

interface UseColorModeOptions {
  initial?: InitialMode;          // 'light' | 'dark' | 'system'  (default: 'system')
  storageKey?: string;            // localStorage key (default: 'color-mode')
  persist?: boolean;              // persist choice (default: true)
  respectSystemPreference?: boolean; // if true, system changes live-update when initial === 'system'
}

interface ColorModeAPI {
  mode: ColorMode;                // current effective mode
  setMode: (m: ColorMode) => void;
  toggle: () => void;
  isSystem: boolean;              // true if initial was 'system' AND no manual override yet
  setSystem: () => void;          // revert to system (if using system mode)
}

/**
 * useColorMode
 * - Allows caller to define starting mode at runtime.
 * - Supports 'system' initial (uses prefers-color-scheme).
 * - Optional persistence in localStorage.
 */
export default function useColorMode(opts: UseColorModeOptions = {}): ColorModeAPI {
  const {
    initial = 'system',
    storageKey = 'color-mode',
    persist = true,
    respectSystemPreference = true,
  } = opts;

  const systemQuery = '(prefers-color-scheme: dark)';
  const getSystem = () =>
    window.matchMedia && window.matchMedia(systemQuery).matches ? 'dark' : 'light';

  // Determine first load mode (no SSR flash using useLayoutEffect)
  const resolvedInitial: ColorMode =
    ((): ColorMode => {
      if (typeof window === 'undefined') return initial === 'dark' ? 'dark' : 'light';
      if (persist) {
        const stored = localStorage.getItem(storageKey) as ColorMode | null;
        if (stored === 'light' || stored === 'dark') return stored;
      }
      if (initial === 'system') return getSystem();
      return initial;
    })();

  const [mode, setModeState] = useState<ColorMode>(resolvedInitial);
  const systemActiveRef = useRef(initial === 'system' && !(persist && localStorage.getItem(storageKey)));

  // Apply class to <html>
  const apply = useCallback((m: ColorMode) => {
    const root = document.documentElement;
    if (m === 'dark') root.classList.add('dark');
    else root.classList.remove('dark');
  }, []);

  useLayoutEffect(() => {
    apply(mode);
  }, [mode, apply]);

  const setMode = useCallback(
    (m: ColorMode) => {
      systemActiveRef.current = false;
      setModeState(m);
      if (persist) localStorage.setItem(storageKey, m);
    },
    [persist, storageKey]
  );

  const toggle = useCallback(
    () => setMode(mode === 'dark' ? 'light' : 'dark'),
    [mode, setMode]
  );

  const setSystem = useCallback(() => {
    systemActiveRef.current = true;
    const sys = getSystem();
    setModeState(sys);
    if (persist) localStorage.removeItem(storageKey);
  }, [persist, storageKey]);

  // React to system changes if still in system mode
  useEffect(() => {
    if (!respectSystemPreference) return;
    if (!systemActiveRef.current) return;
    const mq = window.matchMedia(systemQuery);
    const handler = () => {
      if (systemActiveRef.current) setModeState(getSystem());
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [respectSystemPreference]);

  return {
    mode,
    setMode,
    toggle,
    isSystem: systemActiveRef.current,
    setSystem,
  };
}