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
import CircularProgress from "@material-ui/core/CircularProgress";

import { usePlayers } from "@/services/webapi/hooks/usePlayers";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";

import KickButton from "./components/KickButton";
import BanButton from "./components/BanButton";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    overflow: "auto"
  }
}));

const PlayersPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const playersData = usePlayers();

  if (playersData.errorMessage) {
    return (
      <PageContainer title={t("pages.players.title")}>
        <RequireLogin />
        <ErrorPageContent errorMessage={playersData.errorMessage} />;
      </PageContainer>
    );
  } else if (!playersData.isLoaded) {
    return (
      <PageContainer title={t("pages.players.title")}>
        <RequireLogin />
        <CircularProgress />
      </PageContainer>
    );
  }

  const { players, kickPlayer, banPlayer } = playersData;

  return (
    <PageContainer title={t("pages.players.title")}>
      <RequireLogin />
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
                <TableCell align="right">
                  {t("pages.players.actions")}
                </TableCell>
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
    </PageContainer>
  );
};

export default PlayersPage;
