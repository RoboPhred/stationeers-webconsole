import * as React from "react";

import { withRouter, RouteComponentProps } from "react-router";

import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

export interface BackButtonProps {
  className?: string;
}

type Props = BackButtonProps & RouteComponentProps;
const BackButton: React.FC<Props> = ({ className, history }) => {
  const onClick = React.useCallback(() => {
    history.goBack();
  }, []);

  return (
    <IconButton
      className={className}
      color="inherit"
      aria-label="Back"
      onClick={onClick}
    >
      <ArrowBackIcon />
    </IconButton>
  );
};

export default withRouter(BackButton);
