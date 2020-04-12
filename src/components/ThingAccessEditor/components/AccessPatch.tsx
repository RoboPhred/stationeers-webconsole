import * as React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";

import { cls } from "@/utils";

import AccessColors from "../access-colors";

const useStyles = makeStyles((theme: Theme) => ({
  accessPatch: {
    border: "5px solid",
    borderRadius: "2px",
    width: "100%",
    height: "100%",
    cursor: "pointer",
  },
}));

export interface AccessPatchProps {
  className?: string;
  accessState: number;
  index: number;
  setAccessState(accessState: number): void;
}

const AccessPatch: React.FC<AccessPatchProps> = ({
  className,
  accessState,
  index,
  setAccessState,
}) => {
  const classes = useStyles();
  const hasAccess = accessState & index;
  const borderColor = AccessColors[index];
  const background = hasAccess ? AccessColors[index] : undefined;

  const onClick = React.useCallback(() => {
    if (hasAccess) {
      setAccessState(accessState & ~index);
    } else {
      setAccessState(accessState | index);
    }
  }, [hasAccess, accessState, index, setAccessState]);

  return (
    <div
      className={cls(classes.accessPatch, className)}
      style={{ borderColor, background }}
      onClick={onClick}
    />
  );
};

export default AccessPatch;
