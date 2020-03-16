import * as React from "react";

import Typography from "@material-ui/core/Typography";

export interface ErrorIndicatorProps {
  errorMessage: string;
}

export const ErrorIndicator: React.FC<ErrorIndicatorProps> = ({
  errorMessage
}) => {
  return (
    <div>
      <Typography variant="h6">Error</Typography>
      <Typography>{errorMessage}</Typography>
    </div>
  );
};

export default ErrorIndicator;
