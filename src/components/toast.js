import { useCallback, useMemo, useRef, useState } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);
  const timeoutRef = useRef(null);

  const clearToastTimer = useCallback(() => {
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const dismissToast = useCallback(() => {
    clearToastTimer();
    setToast(null);
  }, [clearToastTimer]);

  const showToast = useCallback(
    ({ type, title, message, duration = 3200 }) => {
      clearToastTimer();
      setToast({ type, title, message });
      timeoutRef.current = window.setTimeout(() => {
        setToast(null);
        timeoutRef.current = null;
      }, duration);
    },
    [clearToastTimer]
  );

  const api = useMemo(
    () => ({
      toast,
      dismissToast,
      showError: (title, message, duration) => showToast({ type: "error", title, message, duration }),
      showSuccess: (title, message, duration) => showToast({ type: "success", title, message, duration })
    }),
    [toast, dismissToast, showToast]
  );

  return api;
}
