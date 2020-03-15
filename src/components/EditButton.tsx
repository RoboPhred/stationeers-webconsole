import * as React from "react";

import { useTranslation } from "react-i18next";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";

export type EditButtonProps = ReactComponentProps<typeof IconButton>;

const EditButton: React.FC<EditButtonProps> = props => {
  const { t } = useTranslation();
  return (
    <IconButton title={t("verbs.edit")} {...props}>
      <EditIcon />
    </IconButton>
  );
};

export default EditButton;
