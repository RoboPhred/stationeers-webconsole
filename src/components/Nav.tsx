import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import { isLoggedInSelector } from "@/services/webapi/selectors/authorization";
import ListItemLink from "@/components/ListItemLink";

import NavItems from "@/nav-links";

const Nav: React.FC = () => {
  const { t } = useTranslation();
  const isAuthorized = useSelector(isLoggedInSelector);
  return (
    <List component="nav">
      {NavItems.map(({ path, i18nKey, requireWebapiConnection }) => (
        <ListItemLink
          key={path}
          to={path}
          button
          autoselect
          disabled={requireWebapiConnection && !isAuthorized}
        >
          <ListItemText>{t(i18nKey)}</ListItemText>
        </ListItemLink>
      ))}
    </List>
  );
};

export default Nav;
