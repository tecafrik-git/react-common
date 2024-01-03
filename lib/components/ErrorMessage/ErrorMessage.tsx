import React, { Alert, Typography } from "@mui/material";

type ErrorMessageProps = {
  error: Error | null;
  message?: string;
};

const ErrorMessage = ({ error, message }: ErrorMessageProps) => {
  return error ? (
    <Alert severity="error">
      {message || "Une erreur est survenue. Veuillez réessayer"}
      <br />
      <Typography variant="caption">
        Code d'erreur: {error.message || "Erreur inconnue"}
      </Typography>
    </Alert>
  ) : null;
};

export default ErrorMessage;
