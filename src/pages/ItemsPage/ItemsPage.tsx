import * as React from "react";
import { useTranslation } from "react-i18next";

import { useItems } from "@/services/webapi/hooks/useItems";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";

const ItemsPage: React.FC = () => {
  const { t } = useTranslation();

  const items = useItems();

  return (
    <PageContainer title={t("pages.items.title")}>
      <RequireLogin />
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </PageContainer>
  );
};

export default ItemsPage;