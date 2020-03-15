import * as React from "react";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";

import Nav from "./Nav";

export interface SidebarProps {
  className?: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    ...theme.mixins.toolbar,
    display: "flex",
    paddingLeft: theme.spacing(3),
    alignItems: "center"
  },
  ghButton: {
    marginLeft: "auto",
    marginRight: theme.spacing()
  }
}));

type Props = SidebarProps;

const Sidebar: React.FC<Props> = ({ className }) => {
  const classes = useStyles();
  return (
    <div className={className}>
      <div className={classes.toolbar}>
        <Typography variant="h6" color="textSecondary">
          WebStation
        </Typography>
      </div>
      <Divider />
      <Nav />
    </div>
  );
};
export default Sidebar;
