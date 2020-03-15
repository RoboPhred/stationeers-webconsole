import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import ListItem from "@material-ui/core/ListItem";

import { useLinkClick } from "./utils";

export interface ListItemLinkProps {
  to: string;
  autoselect?: boolean;
  button?: boolean;
  disabled?: boolean;
  target?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

type Props = ListItemLinkProps & RouteComponentProps;
const ListItemLink: React.FC<Props> = ({
  history,
  location,
  to,
  autoselect,
  button,
  target,
  disabled,
  onClick,
  children
}) => {
  const onListItemClick = useLinkClick(history, to, target, onClick);
  return (
    <ListItem
      selected={autoselect && pathStartsWith(location.pathname, to)}
      component="a"
      button={button as any} // typings are weird here.  `button` works fine, `button={true}` does not.
      href={history.createHref({ pathname: to })}
      disabled={disabled}
      onClick={onListItemClick}
    >
      {children}
    </ListItem>
  );
};
export default withRouter(ListItemLink);

function pathStartsWith(path: string, startsWith: string): boolean {
  if (path === startsWith) {
    return true;
  }

  return path.substr(0, startsWith.length + 1) === `${startsWith}/`;
}
