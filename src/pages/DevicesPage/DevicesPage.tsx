import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import { useDevices } from "@/services/webapi/hooks/useDevices";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    overflow: "auto"
  }
}));

const DevicesPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const devices = useDevices();

  return (
    <PageContainer title={t("pages.devices.title")}>
      <RequireLogin />
      <div className={classes.root}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Device Name</TableCell>
                <TableCell>Prefab Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {devices.map(device => (
                <TableRow key={device.referenceId}>
                  <TableCell>{device.displayName}</TableCell>
                  <TableCell>{device.prefabName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageContainer>
  );
};

export default DevicesPage;
