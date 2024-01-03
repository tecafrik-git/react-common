import React from "react";
import ErrorMessage from "../ErrorMessage";

export default function ErrorBoundary({ error }: { error: Error }) {
  return (
    <ErrorMessage
      error={error}
      message="Une erreur est survenue. Veuillez contacter le support."
    />
  );
}
