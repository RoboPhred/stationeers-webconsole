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
import IconButton from "@material-ui/core/IconButton";
import BackspaceIcon from "@material-ui/icons/Backspace";
import Paper from "@material-ui/core/Paper";

import { UseBans } from "@/services/webapi/hooks/useBans";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

export type BansPageContentProps = PopulatedApiData<UseBans>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    overflow: "auto"
  }
}));

const BansPageContent: React.FC<BansPageContentProps> = ({
  bans,
  removeBan
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TableContainer component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>{t("steam.steam_id")}</TableCell>
              <TableCell>{t("pages.bans.duration")}</TableCell>
              <TableCell>{t("pages.bans.actions")}</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bans.map(ban => (
              <TableRow key={ban.steamId}>
                <TableCell>{ban.steamId}</TableCell>
                <TableCell>
                  {ban.endTimestamp === 0
                    ? t("pages.bans.forever")
                    : moment.duration(ban.endTimestamp - Date.now()).humanize()}
                </TableCell>
                <TableCell>
                  <IconButton
                    title={t("pages.bans.remove_ban")}
                    onClick={() => removeBan(ban.steamId)}
                  >
                    <BackspaceIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BansPageContent;
