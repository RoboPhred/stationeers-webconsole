import * as React from "react";
import { useTranslation } from "react-i18next";

import CircularProgress from "@material-ui/core/CircularProgress";

import { useItems } from "@/services/webapi/hooks/useItems";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";

const ItemsPage: React.FC = () => {
  const { t } = useTranslation();

  const itemsData = useItems();

  let content: React.ReactChild;
  if (itemsData.errorMessage) {
    content = <ErrorPageContent errorMessage={itemsData.errorMessage} />;
  } else if (!itemsData.isLoaded) {
    return <CircularProgress />;
  } else {
    content = <pre>{JSON.stringify(itemsData.items)}</pre>;
  }

  return (
    <PageContainer title={t("pages.items.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default ItemsPage;
