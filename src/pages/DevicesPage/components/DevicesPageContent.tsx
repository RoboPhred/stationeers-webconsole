import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link as RouterLink } from "react-router-dom";

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
import Link from "@material-ui/core/Link";

import { Order, flipOrder, stableSort, getComparator } from "@/sort-utils";

import { DevicePayload } from "@/services/webapi/payloads";

import { UseDevices } from "@/services/webapi/hooks/useDevices";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

export type DevicesPageContentProps = PopulatedApiData<UseDevices>;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: "100%",
    height: "100%",
    padding: theme.spacing(),
  },
  tableContainer: {
    height: "100%",
  },
}));

const DevicesPageContent: React.FC<DevicesPageContentProps> = ({ devices }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [order, setOrder] = React.useState<Order>(Order.Ascending);
  const [orderBy, setOrderBy] = React.useState<keyof DevicePayload>(
    "displayName"
  );
  const [deviceNameFilter, setDeviceNameFilter] = React.useState<string>("");
  const [devicePrefabFilter, setDevicePrefabFilter] = React.useState<string>(
    ""
  );

  const onDeviceNameFilterChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDeviceNameFilter(e.target.value);
    },
    []
  );

  const onDeviceTypeFilterChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDevicePrefabFilter(e.target.value);
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

  const onSortByType = React.useCallback(() => {
    if (orderBy !== "prefabName") {
      setOrderBy("prefabName");
      setOrder(Order.Ascending);
    } else {
      setOrder(flipOrder(order));
    }
  }, [order, orderBy]);

  const onSortByHealth = React.useCallback(() => {
    if (orderBy !== "health") {
      setOrderBy("health");
      setOrder(Order.Ascending);
    } else {
      setOrder(flipOrder(order));
    }
  }, [order, orderBy]);

  const lowerCaseNameFilter = deviceNameFilter.toLowerCase();
  const lowerCasePrefabFilter = devicePrefabFilter.toLowerCase();

  const filteredDevices = devices.filter((device) => {
    if (
      deviceNameFilter !== "" &&
      device.displayName.toLowerCase().indexOf(lowerCaseNameFilter) === -1
    ) {
      return false;
    }

    if (
      devicePrefabFilter !== "" &&
      device.prefabName.toLowerCase().indexOf(lowerCasePrefabFilter) === -1
    ) {
      return false;
    }

    return true;
  });

  const sortedDevices = stableSort(
    filteredDevices,
    getComparator(order, orderBy)
  );

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} component={Paper}>
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
                    label={t("things.filter_by_name")}
                    margin="none"
                    value={deviceNameFilter}
                    onChange={onDeviceNameFilterChanged}
                  />
                </div>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "prefabName"}
                  direction={orderBy === "prefabName" ? order : "asc"}
                  onClick={onSortByType}
                >
                  {t("things.prefab_type")}
                </TableSortLabel>
                <div>
                  <TextField
                    label={t("things.filter_by_type")}
                    margin="none"
                    value={devicePrefabFilter}
                    onChange={onDeviceTypeFilterChanged}
                  />
                </div>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "health"}
                  direction={orderBy === "health" ? order : "asc"}
                  onClick={onSortByHealth}
                >
                  {t("things.health")}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDevices.map((device) => (
              <TableRow key={device.referenceId}>
                <TableCell>
                  <Link
                    component={RouterLink}
                    to={`/devices/${device.referenceId}`}
                  >
                    {device.displayName}
                  </Link>
                </TableCell>
                <TableCell>{device.prefabName}</TableCell>
                <TableCell>{device.health}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default DevicesPageContent;
