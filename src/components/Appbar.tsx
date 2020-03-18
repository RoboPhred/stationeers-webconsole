import * as React from "react";

import MaterialAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import { makeStyles, Theme } from "@material-ui/core/styles";

import BackButton from "./BackButton";

export interface AppbarProps {
  title: string;
  back?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1
  },
  chip: {
    marginRight: theme.spacing()
  }
}));

type Props = AppbarProps;

const Appbar: React.FC<Props> = ({ title, back }) => {
  const classes = useStyles();
  return (
    <MaterialAppBar position="static">
      <Toolbar>
        {back && <BackButton />}
        <Typography className={classes.title} variant="h6" color="inherit">
          {title}
        </Typography>
      </Toolbar>
    </MaterialAppBar>
  );
};
export default Appbar;
