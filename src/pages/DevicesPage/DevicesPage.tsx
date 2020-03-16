import * as React from "react";
import { useTranslation } from "react-i18next";

import { Theme, makeStyles } from "@material-ui/core/styles";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";

import { Order, flipOrder, stableSort, getComparator } from "@/sort-utils";

import { useDevices } from "@/services/webapi/hooks/useDevices";
import { DevicePayload } from "@/services/webapi/payloads";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
    overflow: "auto"
  },
  container: {
    width: "100%",
    height: "100%"
  }
}));

const DevicesPage: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const [order, setOrder] = React.useState<Order>(Order.Ascending);
  const [orderBy, setOrderBy] = React.useState<keyof DevicePayload>(
    "displayName"
  );
  const [deviceNameFilter, setDeviceNameFilter] = React.useState<string>("");

  const onDeviceNameFilterChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeviceNameFilter(e.target.value);
    },
    []
  );

  const onSortByName = React.useCallback(() => {
    if (orderBy !== "displayName") {
      setOrderBy("displayName");
      setOrder(Order.Ascending);
    } else {
      setOrder(flipOrder(order));
    }
  }, [order, orderBy]);

  const devices = useDevices();
  const filteredDevices = devices.filter(x =>
    deviceNameFilter === ""
      ? true
      : x.displayName.indexOf(deviceNameFilter) != -1
  );
  const sortedDevices = stableSort(
    filteredDevices,
    getComparator(order, orderBy)
  );

  return (
    <PageContainer title={t("pages.devices.title")}>
      <RequireLogin />
      <div className={classes.root}>
        <TableContainer component={Paper} className={classes.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "displayName"}
                    direction={orderBy === "displayName" ? order : "asc"}
                    onClick={onSortByName}
                  >
                    {t("pages.devices.device_name")}
                  </TableSortLabel>
                  <div>
                    <TextField
                      label="Filter"
                      margin="none"
                      value={deviceNameFilter}
                      onChange={onDeviceNameFilterChanged}
                    />
                  </div>
                </TableCell>
                <TableCell>{t("pages.devices.prefab_type")}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedDevices.map(device => (
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
