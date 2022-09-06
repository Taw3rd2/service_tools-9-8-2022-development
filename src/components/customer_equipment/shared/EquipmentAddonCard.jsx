import React from "react";

import { Card, CardContent, Typography } from "@mui/material";

const EquipmentAddonCard = ({ cardName, cardValue }) => {
  return (
    <Card>
      <CardContent>
        <Typography
          variant="body2"
          color="primary"
          sx={{
            mt: "8px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {cardName}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {cardValue}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default EquipmentAddonCard;
