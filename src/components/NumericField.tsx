import * as React from "react";

import { useTranslation } from "react-i18next";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

export interface NumericFieldProps {
  id: string;
  label: string;
  value: number;
  onChange(value: number): void;
}

const NumericField: React.FC<NumericFieldProps> = ({
  id,
  label,
  value,
  onChange
}) => {
  const { t } = useTranslation();
  var [innerValue, setInnerValue] = React.useState("");
  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInnerValue(e.target.value);
      const numValue = Number(e.target.value);
      onChange(numValue);
    },
    []
  );

  const isError = isNaN(Number(innerValue));

  const displayValue = innerValue
    ? innerValue
    : isNaN(value)
    ? ""
    : String(value);

  return (
    <FormControl error={isError}>
      <InputLabel htmlFor={`${id}-input`}>{label}</InputLabel>
      <Input
        id={`${id}-input`}
        value={displayValue}
        type="number"
        onChange={onInputChange}
        aria-describedby={isError ? `${id}-error-text` : undefined}
      />
      {isError && (
        <FormHelperText id={`${id}-error-text`}>
          {t("errors.must_be_number")}
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default NumericField;
