import * as React from "react";

import Typography from "@material-ui/core/Typography";

export interface ErrorPageContentProps {
  errorMessage: string;
}

export const ErrorPageContent: React.FC<ErrorPageContentProps> = ({
  errorMessage
}) => {
  return (
    <div>
      <Typography variant="h6">Error</Typography>
      <Typography>{errorMessage}</Typography>
    </div>
  );
};

export default ErrorPageContent;
