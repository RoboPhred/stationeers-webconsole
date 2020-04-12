import * as React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useThing } from "@/services/webapi/hooks/useThing";

import AccessPatch from "./components/AccessPatch";

import AccessColors from "./access-colors";

export interface ThingAccessEditorProps {
  referenceId: string;
}

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    marginBottom: theme.spacing(),
  },
  grid: {
    display: "grid",
    gridTemplateColumns: theme.spacing(7, 7, 7, 7),
    gridTemplateRows: theme.spacing(7, 7, 7, 7),
  },
  accessColor: {
    padding: theme.spacing(2),
  },
}));

const ThingAccessEditor: React.FC<ThingAccessEditorProps> = ({
  referenceId,
}) => {
  const classes = useStyles();
  const thing = useThing(referenceId);

  if (!thing.isLoaded) {
    return <CircularProgress />;
  }

  const { accessState, setAccessState } = thing;
  return (
    <Paper>
      <Typography className={classes.title} variant="h6">
        Authorized
      </Typography>
      <div className={classes.grid}>
        {Object.keys(AccessColors).map((index) => {
          const i = Number(index);
          return (
            <AccessPatch
              key={i}
              className={classes.accessColor}
              accessState={accessState}
              index={i}
              setAccessState={setAccessState}
            />
          );
        })}
      </div>
    </Paper>
  );
};

export default ThingAccessEditor;
