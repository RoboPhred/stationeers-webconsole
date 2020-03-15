import * as React from "react";

import { useTranslation } from "react-i18next";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface ConfirmDialogProps {
  open: boolean;
  title: string;
  confirmLabel?: string;
  description?: string;
  onConfirm(): void;
  onClose(): void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  title,
  confirmLabel,
  description,
  onConfirm,
  onClose
}) => {
  const { t } = useTranslation();

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="input-dialog-title">
      <DialogTitle id="input-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {description && <DialogContentText>{description}</DialogContentText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={onConfirm} color="primary">
          {confirmLabel ? confirmLabel : t("verbs.confirm")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
