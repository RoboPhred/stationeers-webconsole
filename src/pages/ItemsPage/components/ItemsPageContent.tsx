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

import { Order, flipOrder, stableSort, getComparator } from "@/sort-utils";

import { ItemPayload } from "@/services/webapi/payloads";
import { UseItems } from "@/services/webapi/hooks/useItems";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

export type ItemsPageContentProps = PopulatedApiData<UseItems>;

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

const ItemsPageContent: React.FC<ItemsPageContentProps> = ({ items }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [order, setOrder] = React.useState<Order>(Order.Ascending);
  const [orderBy, setOrderBy] = React.useState<keyof ItemPayload>("prefabName");
  const [devicePrefabFilter, setDevicePrefabFilter] = React.useState<string>(
    ""
  );

  const onDeviceTypeFilterChanged = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setDevicePrefabFilter(e.target.value);
    },
    []
  );

  const onSortByType = React.useCallback(() => {
    if (orderBy !== "prefabName") {
      setOrderBy("prefabName");
      setOrder(Order.Ascending);
    } else {
      setOrder(flipOrder(order));
    }
  }, [order, orderBy]);

  const onSortByQuantity = React.useCallback(() => {
    if (orderBy !== "quantityText") {
      setOrderBy("quantityText");
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

  const lowerCasePrefabFilter = devicePrefabFilter.toLowerCase();

  const filteredItems = items.filter((item) => {
    if (
      devicePrefabFilter !== "" &&
      item.prefabName.toLowerCase().indexOf(lowerCasePrefabFilter) === -1
    ) {
      return false;
    }

    return true;
  });

  const sortedItems = stableSort(filteredItems, getComparator(order, orderBy));

  return (
    <div className={classes.root}>
      <TableContainer className={classes.tableContainer} component={Paper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
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
                  active={orderBy === "quantityText"}
                  direction={orderBy === "quantityText" ? order : "asc"}
                  onClick={onSortByQuantity}
                >
                  {t("things.quantity")}
                </TableSortLabel>
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
            {sortedItems.map((item) => (
              <TableRow key={item.referenceId}>
                <TableCell>{item.prefabName}</TableCell>
                <TableCell>{item.quantityText}</TableCell>
                <TableCell>{item.health}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ItemsPageContent;
