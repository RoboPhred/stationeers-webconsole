import * as React from "react";

import { UseItems } from "@/services/webapi/hooks/useItems";
import { PopulatedApiData } from "@/services/webapi/hooks/useApiData";

export type ItemsPageContentProps = PopulatedApiData<UseItems>;

const ItemsPageContent: React.FC<ItemsPageContentProps> = ({ items }) => {
  return <div>{JSON.stringify(items, null, 2)}</div>;
};

export default ItemsPageContent;
