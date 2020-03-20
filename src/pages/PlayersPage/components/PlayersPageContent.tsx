import * as React from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { UsePlayers } from "@/services/webapi/hooks/usePlayers";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

import KickButton from "./KickButton";
import BanButton from "./BanButton";

export type PlayersPageContentProps = PopulatedApiData<UsePlayers>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    overflow: "auto"
  }
}));

const PlayersPageContent: React.FC<PlayersPageContentProps> = ({
  players,
  kickPlayer,
  banPlayer
}) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Player Name</TableCell>
              <TableCell align="right">{t("steam.steam_id")}</TableCell>
              <TableCell align="right">
                {t("pages.players.play_time")}
              </TableCell>
              <TableCell align="right">{t("pages.players.ping")}</TableCell>
              <TableCell align="right">{t("pages.players.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players.map(player => (
              <TableRow key={player.steamId}>
                <TableCell>{player.steamName}</TableCell>
                <TableCell align="right">{player.steamId}</TableCell>
                <TableCell align="right">
                  {moment.duration(player.playTime, "seconds").humanize()}
                </TableCell>
                <TableCell align="right">{player.ping}</TableCell>
                <TableCell align="right">
                  <KickButton
                    steamName={player.steamName}
                    steamId={player.steamId}
                    kickPlayer={kickPlayer}
                  />
                  <BanButton
                    steamName={player.steamName}
                    steamId={player.steamId}
                    banPlayer={banPlayer}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default PlayersPageContent;
