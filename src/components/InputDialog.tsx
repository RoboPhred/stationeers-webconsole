import * as React from "react";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface InputDialogProps {
  open: boolean;
  title: string;
  label: string;
  commitLabel?: string;
  description?: string;
  defaultValue?: string;
  onCommit(value: string): void;
  onClose(): void;
}

const InputDialog: React.FC<InputDialogProps> = ({
  open,
  title,
  label,
  commitLabel,
  description,
  defaultValue,
  onCommit,
  onClose
}) => {
  const { t } = useTranslation();
  const [value, setValue] = React.useState(defaultValue || "");

  const onCommitClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onCommit(value);
    },
    [onCommit, value]
  );

  const onCloseClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      onClose();
    },
    [onClose]
  );

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
    },
    []
  );

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="input-dialog-title">
      <DialogTitle id="input-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
        <TextField
          autoFocus
          margin="dense"
          id="input-dialog-input"
          label={label}
          fullWidth
          value={value}
          onChange={onInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseClick} color="primary">
          Cancel
        </Button>
        <Button onClick={onCommitClick} color="primary">
          {commitLabel ? commitLabel : t("verbs.commit")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputDialog;
