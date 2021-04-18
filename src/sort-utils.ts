import { compare } from "natural-orderby";

export enum Order {
  Ascending = "asc",
  Descending = "desc",
}
export type Comparator<T> = (a: T, b: T) => number;

export function flipOrder(order: Order): Order {
  return order === Order.Ascending ? Order.Descending : Order.Ascending;
}

export function getComparator<T>(
  order: Order,
  orderBy: keyof T
): Comparator<T> {
  const comparator = compare({ order: order });
  return (a: T, b: T) => {
    const av = a[orderBy];
    const bv = b[orderBy];
    const aNullOrEmpty = av == null || (av as any) === "";
    const bNullOrEmpty = bv == null || (bv as any) === "";
    if (aNullOrEmpty && bNullOrEmpty) {
      return 0;
    } else if (aNullOrEmpty) {
      return order === Order.Ascending ? -1 : 1;
    } else if (bNullOrEmpty) {
      return order === Order.Ascending ? 1 : -1;
    }

    return comparator(av, bv);
  };
}

export function stableSort<T>(array: T[], comparator: Comparator<T>) {
  const stabilizedThis = array.map((el, index) => [el, index] as const);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
