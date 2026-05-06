import { useEffect, useState } from "react";

/**
 * Returns the current Date, refreshed at the given interval (default 30s).
 * Use for live clocks and "minutes ago"-style labels.
 */
export function useNow(intervalMs: number = 30_000) {
  const [now, setNow] = useState<Date>(() => new Date());
  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs]);
  return now;
}
