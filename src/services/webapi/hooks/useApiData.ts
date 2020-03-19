import * as React from "react";
import { ApiFunction } from "../api";
import { useApiCall } from "./useApiCall";

export interface UseApiCommon {
  refresh(): void;
}

export interface UseApiDataUnpopulated extends UseApiCommon {
  isLoaded: false;
  errorMessage: string | null;
}
export type UseApiDataPopulated<TResult> = TResult &
  UseApiCommon & {
    isLoaded: true;
    errorMessage: string | null;
  };

export type UseApiData<TResult> =
  | UseApiDataUnpopulated
  | UseApiDataPopulated<TResult>;

// I feel like this should be extends UseApiData<infer D> but that results in UseApiDataPopulated<D> | UseApiDataUnpopulated
export type PopulatedApiData<T> = T extends UseApiDataPopulated<infer D>
  ? UseApiDataPopulated<D>
  : never;

export function useApiData<
  TResult,
  TArgs extends any[],
  TFunc extends ApiFunction<any, TArgs>
>(
  apiCall: TFunc,
  resultTransformer?: (result: PromiseResult<ReturnType<TFunc>>) => TResult,
  ...args: TArgs
): UseApiDataPopulated<TResult> {
  const invokeApiCall = useApiCall<PromiseResult<ReturnType<TFunc>>, TArgs>(
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
        let result: any = await invokeApiCall(...args);
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
