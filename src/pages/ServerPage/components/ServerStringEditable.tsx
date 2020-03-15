import * as React from "react";

import { Theme, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

import EditButton from "@/components/EditButton";
import InputDialog from "@/components/InputDialog";

const useStyles = makeStyles((theme: Theme) => ({
  section: {
    padding: theme.spacing()
  }
}));

export interface ServerStringEditableProps {
  title: string;
  editTitle: string;
  value: string;
  onValueChanged(value: string): void;
}
const ServerStringEditable: React.FC<ServerStringEditableProps> = ({
  title,
  editTitle,
  value,
  onValueChanged
}) => {
  const classes = useStyles();
  const [isEditing, setEditing] = React.useState(false);
  const onEdit = React.useCallback(() => {
    setEditing(true);
  }, []);
  const onCancelEdit = React.useCallback(() => {
    setEditing(false);
  }, []);
  const onCommitEdit = React.useCallback((newValue: string) => {
    setEditing(false);
    onValueChanged(newValue);
  }, []);

  return (
    <div className={classes.section}>
      <span>
        <Typography variant="caption">{title}</Typography>
        <EditButton title={editTitle} onClick={onEdit} />
      </span>
      <Typography variant="h6">{value}</Typography>
      <InputDialog
        open={isEditing}
        title={editTitle}
        label={title}
        defaultValue={value}
        onClose={onCancelEdit}
        onCommit={onCommitEdit}
      />
    </div>
  );
};

export default ServerStringEditable;
