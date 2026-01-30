// Hooks
import { useCallback, useEffect, useRef } from "react";

type CallbackFn = () => void;

type UseTimeoutReturn = {
  reset: () => void;
  clear: () => void;
};

export default function useTimeout(
  callback: CallbackFn,
  delay: number,
): UseTimeoutReturn {
  const callbackRef = useRef<CallbackFn>(callback);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => callbackRef.current(), delay);
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [delay, set, clear]);

  const reset = useCallback(() => {
    clear();
    set();
  }, [clear, set]);

  return { reset, clear };
}
