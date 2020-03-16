import * as React from "react";
import { ApiFunction } from "../api";
import { useApiCall } from "./useApiCall";

export interface UseApiCommon {
  refresh(): void;
}

export interface UseApiUnpopulated extends UseApiCommon {
  isLoaded: false;
  errorMessage: string | null;
}
export type UseApiDataPopulated<TResult> = TResult &
  UseApiCommon & {
    isLoaded: true;
    errorMessage: string | null;
  };

export type UseApiData<TResult> =
  | UseApiUnpopulated
  | UseApiDataPopulated<TResult>;

export function useApiData<TResult, TFunc extends ApiFunction<any, []>>(
  apiCall: TFunc,
  resultTransformer?: (result: PromiseResult<ReturnType<TFunc>>) => TResult
): UseApiDataPopulated<TResult> {
  const invokeApiCall = useApiCall<PromiseResult<ReturnType<TFunc>>, []>(
    apiCall
  );

  // We could repeat the fetch function inside refresh() but we still want
  //  to gate on unmount.
  const [refreshCounter, setRefreshCounter] = React.useState(0);
  const [result, setResult] = React.useState<TResult | null>(null);
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

  React.useEffect(() => {
    let mounted = true;
    async function fetch() {
      try {
        let result: any = await invokeApiCall();
        if (!mounted) {
          return;
        }
        if (resultTransformer) {
          result = resultTransformer(result);
        }
        setResult(result);
        setErrorMessage(null);
      } catch (e) {
        if (!mounted) {
          return;
        }

        // TODO: Show error to user
        setErrorMessage(e.message);
      }
    }

    fetch();
    return () => {
      mounted = false;
    };
  }, [refreshCounter]);

  const refresh = React.useCallback(() => {
    setRefreshCounter(refreshCounter + 1);
  }, [refreshCounter]);

  if (!result) {
    return {
      isLoaded: false,
      errorMessage,
      refresh
    } as any;
  }

  return {
    ...result,
    isLoaded: true,
    errorMessage,
    refresh
  } as any;
}
