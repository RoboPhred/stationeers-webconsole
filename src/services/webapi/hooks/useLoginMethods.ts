import * as React from "react";

import useSelector from "@/hooks/useSelector";

import { getLoginMethods } from "../api";
import { serverAddressSelector } from "../selectors/server";

export type UseLoginMethods =
  | { isLoaded: false; errorMessage: string | null }
  | { isLoaded: true; errorMessage: string | null; methods: string[] };
export function useLoginMethods(): UseLoginMethods {
  const serverAddress = useSelector(serverAddressSelector);

  const [methods, setMethods] = React.useState<string[] | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    const load = async () => {
      if (!serverAddress) {
        return;
      }

      try {
        const methods = await getLoginMethods(serverAddress);
        setMethods(methods);
      } catch (e) {
        setErrorMessage(e.message);
      }
    };

    load().catch((e) => {
      /* no op */
    });
  }, []);

  if (methods) {
    return {
      isLoaded: true,
      methods,
      errorMessage,
    };
  }

  return {
    isLoaded: false,
    errorMessage,
  };
}
