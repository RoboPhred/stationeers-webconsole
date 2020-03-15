import * as React from "react";

import { useTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";

import InputDialog from "@/components/InputDialog";

export interface KickButtonProps {
  steamName: string;
  steamId: string;
  kickPlayer(steamId: string, reason: string | null): void;
}

const KickButton: React.FC<KickButtonProps> = ({
  steamName,
  steamId,
  kickPlayer
}) => {
  const { t } = useTranslation();
  const [isKicking, setKicking] = React.useState(false);

  const onKickClick = React.useCallback(() => {
    setKicking(true);
  }, []);
  const onKickCommit = React.useCallback(
    (reason: string) => {
      setKicking(false);
      kickPlayer(steamId, reason);
    },
    [steamId]
  );
  const onKickCancel = React.useCallback(() => {
    setKicking(false);
  }, []);

  return (
    <IconButton
      title={t("pages.players.verbs.kick_player")}
      onClick={onKickClick}
    >
      <BackspaceIcon />
      <InputDialog
        open={isKicking}
        title={t("pages.players.kick_named_player", { steamId, steamName })}
        description={t("pages.players.kick_player_confirm")}
        label={t("pages.players.kick_ban_reason")}
        commitLabel={t("pages.players.verbs.kick_player")}
        onCommit={onKickCommit}
        onClose={onKickCancel}
      />
    </IconButton>
  );
};

export default KickButton;
