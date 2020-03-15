import * as React from "react";

import { makeStyles } from "@material-ui/core/styles";

import Drawer from "@material-ui/core/Drawer";

import Sidebar from "@/components/Sidebar";
import Appbar from "@/components/Appbar";

const SIDEBAR_WIDTH = 200;

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100%"
  },
  sidebar: {
    width: SIDEBAR_WIDTH
  },
  appRoot: {
    display: "flex",
    flexDirection: "column",
    width: `calc(100% - ${SIDEBAR_WIDTH}px)`,
    height: "100%",
    marginLeft: SIDEBAR_WIDTH
  },
  content: {
    minHeight: 0,
    width: "100%",
    height: "100%",
    overflow: "auto"
  }
});

export interface PageContainerProps {
  title: string;
  back?: boolean;
}

type Props = PageContainerProps;
const PageContainer: React.FC<Props> = ({ title, back, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Drawer variant="permanent" anchor="left">
        <Sidebar className={classes.sidebar} />
      </Drawer>
      <div className={classes.appRoot}>
        <Appbar title={title} back={back} />
        <div className={classes.content}>{children}</div>
      </div>
    </div>
  );
};
export default PageContainer;
