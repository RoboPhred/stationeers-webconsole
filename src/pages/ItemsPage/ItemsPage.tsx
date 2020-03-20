import * as React from "react";
import { useTranslation } from "react-i18next";

import { useItems } from "@/services/webapi/hooks/useItems";

import PageContainer from "@/components/PageContainer";
import RequireLogin from "@/components/RequireWebapiAuthorization";
import ErrorPageContent from "@/components/ErrorPageContent";
import LoadingPageContent from "@/components/LoadingPageContent";

import ItemsPageContent from "./components/ItemsPageContent";

const ItemsPage: React.FC = () => {
  const { t } = useTranslation();
  const itemsData = useItems();

  let content: React.ReactChild;
  if (itemsData.isLoaded) {
    content = <ItemsPageContent {...itemsData} />;
  } else if (itemsData.errorMessage) {
    content = <ErrorPageContent errorMessage={itemsData.errorMessage} />;
  } else {
    return <LoadingPageContent />;
  }

  return (
    <PageContainer title={t("pages.items.title")}>
      <RequireLogin />
      {content}
    </PageContainer>
  );
};

export default ItemsPage;
