import * as React from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

import { isAuthorizedSelector } from "@/services/webapi/selectors/authorization";
import ListItemLink from "@/components/ListItemLink";

import NavItems from "@/nav-links";

const Nav: React.FC = () => {
  const { t } = useTranslation();
  const isAuthorized = useSelector(isAuthorizedSelector);
  return (
    <List component="nav">
      {NavItems.map(({ name, path, i18nKey, requireWebapiConnection }) => (
        <ListItemLink
          key={name}
          to={path}
          button
          autoselect
          disabled={requireWebapiConnection && !isAuthorized}
        >
          <ListItemText>{t(i18nKey, { default: name })}</ListItemText>
        </ListItemLink>
      ))}
    </List>
  );
};

export default Nav;
