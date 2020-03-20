import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

import Typography from "@material-ui/core/Typography";

export interface ErrorPageContentProps {
  errorMessage: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    textAlign: "center"
  },
  content: {
    display: "inline-block"
  },
  icon: {
    fontSize: 84
  },
  message: {
    marginTop: theme.spacing()
  }
}));
export const ErrorPageContent: React.FC<ErrorPageContentProps> = ({
  errorMessage
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <ErrorOutlineIcon className={classes.icon} fontSize="large" />
        <Typography variant="h4">{t("errors.generic_title")}</Typography>
        <Typography className={classes.message}>{errorMessage}</Typography>
      </div>
    </div>
  );
};

export default ErrorPageContent;
