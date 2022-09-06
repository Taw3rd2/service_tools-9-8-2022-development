import React from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";
import { defaultTableButton } from "../../../theme/Theme";

const CreatePartsQuoteContent = ({ closeBasicSecondModal }) => {
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="caption">The creation starts here</Typography>
        </Grid2>
      </Grid2>
      <Grid2
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddCircleOutline />}
          sx={defaultTableButton}
        >
          Submit New Parts Quote
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          sx={defaultTableButton}
          onClick={() => closeBasicSecondModal()}
        >
          Close
        </Button>
      </Grid2>
    </>
  );
};

export default CreatePartsQuoteContent;
