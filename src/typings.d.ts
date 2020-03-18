interface Window {
  __REDUX_DEVTOOLS_EXTENSION__?(): any;
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: Function;
}

type ReactComponentProps<T> = T extends React.ComponentType<infer P>
  ? P
  : never;

type PromiseResult<T> = T extends Promise<infer R> ? R : never;
type PromiseReturnType<T> = T extends (...args: any[]) => Promise<infer R>
  ? R
  : never;
