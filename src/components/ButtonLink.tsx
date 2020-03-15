import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import Button, { ButtonProps } from "@material-ui/core/Button";

import { useLinkClick } from "./utils";

export interface ButtonLinkProps {
  className?: string;
  to: string;
  size?: ButtonProps["size"];
  title?: string;
  disabled?: boolean;
  target?: string;
  onClick?(e: React.MouseEvent<HTMLElement>): void;
}

type Props = ButtonLinkProps & RouteComponentProps;

const ButtonLink: React.FC<Props> = ({
  className,
  to,
  size,
  title,
  history,
  disabled,
  target,
  onClick,
  children
}) => {
  const onButtonClick = useLinkClick(history, to, target, onClick);

  return (
    <Button
      className={className}
      size={size}
      title={title}
      component="a"
      href={history.createHref({ pathname: to })}
      disabled={disabled}
      onClick={onButtonClick}
    >
      {children}
    </Button>
  );
};
export default withRouter(ButtonLink);
