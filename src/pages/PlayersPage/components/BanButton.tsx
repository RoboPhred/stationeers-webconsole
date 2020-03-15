import * as React from "react";

import { useTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import BlockIcon from "@material-ui/icons/Block";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import NumericField from "@/components/NumericField";

export interface BanButtonProps {
  steamName: string;
  steamId: string;
  banPlayer(steamId: string, reason: string | null, duration: number): void;
}

const BanButton: React.FC<BanButtonProps> = ({
  steamName,
  steamId,
  banPlayer
}) => {
  const { t } = useTranslation();
  const [isBanning, setBanning] = React.useState(false);
  const [banReason, setBanReason] = React.useState("");
  const [banDuration, setBanDuration] = React.useState(Number.NaN);

  const onBanClick = React.useCallback(() => {
    setBanning(true);
  }, []);
  const onBanCommit = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault();
      e.stopPropagation();
      setBanning(false);
      banPlayer(steamId, banReason, banDuration);
    },
    [steamId, banReason, banDuration]
  );
  const onBanCancel = React.useCallback((e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setBanning(false);
  }, []);
  const onBanReasonChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setBanReason(e.target.value);
    },
    []
  );
  const onBanDurationChange = React.useCallback((value: number) => {
    setBanDuration(value);
  }, []);

  return (
    <IconButton
      title={t("pages.players.verbs.ban_player")}
      onClick={onBanClick}
    >
      <BlockIcon />
      <Dialog
        open={isBanning}
        onClose={onBanCancel}
        aria-labelledby="ban-dialog-title"
      >
        <DialogTitle id="ban-dialog-title">
          {t("pages.players.ban_named_player", { steamId, steamName })}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {t("pages.players.ban_player_confirm")}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="input-dialog-input"
            label={t("pages.players.kick_ban_reason")}
            fullWidth
            value={banReason}
            onChange={onBanReasonChange}
          />
          <NumericField
            id="ban-dialog-duration"
            label={t("pages.players.ban_duration")}
            value={banDuration}
            onChange={onBanDurationChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onBanCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={onBanCommit} color="primary">
            {t("pages.players.verbs.ban_player")}
          </Button>
        </DialogActions>
      </Dialog>
    </IconButton>
  );
};

export default BanButton;
