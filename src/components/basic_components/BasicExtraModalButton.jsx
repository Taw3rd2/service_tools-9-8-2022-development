import { Button } from "@mui/material";
import React from "react";

const BasicExtraModalButton = ({ buttonText, startIcon, modifier, duty }) => {
  return (
    <Button
      variant="outlined"
      color="primary"
      startIcon={startIcon}
      sx={modifier}
      onClick={duty}
    >
      {buttonText}
    </Button>
  );
};

export default BasicExtraModalButton;
