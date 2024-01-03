// material UI empty state
import React from 'react';
import { NoTransfer } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState = ({ title, description }: EmptyStateProps) => {
  return (
    <Box sx={{ width: "100%", textAlign: "center" }}>
      <NoTransfer fontSize="large" color="disabled" />
      <Typography variant="h6" gutterBottom color="grey">
        {title || "Aucun résultat trouvé"}
      </Typography>
      <Typography variant="subtitle1" gutterBottom color="grey">
        {description || ""}
      </Typography>
    </Box>
  );
};

export default EmptyState;
