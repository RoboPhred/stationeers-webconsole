import * as React from "react";

export function useRefreshTimer(refresh: () => void) {
  const refreshPeriod = 15 * 1000; // TODO: Should be configurable

  React.useEffect(() => {
    const timeout = setTimeout(refresh, refreshPeriod);
    return () => clearTimeout(timeout);
  }, []);
}
