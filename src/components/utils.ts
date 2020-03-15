import * as React from "react";
import { RouteComponentProps } from "react-router";

export function useLinkClick(
  history: RouteComponentProps["history"],
  to: string,
  target?: string,
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
) {
  // Code copied from implementation of Link in react-router-dom

  return React.useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      if (onClick) {
        onClick(event);
      }

      if (
        !event.defaultPrevented && // onClick prevented default
        event.button === 0 && // ignore everything but left clicks
        (!target || target === "_self") && // let browser handle "target=_blank" etc.
        !isModifierPressed(event) // ignore clicks with modifier keys
      ) {
        event.preventDefault();

        history.push(to);
      }
    },
    [onClick, target, history, to]
  );
}

function isModifierPressed(event: React.MouseEvent<any>) {
  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
}
