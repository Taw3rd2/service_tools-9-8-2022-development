import React from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { getFormattedDate } from "../../../utilities/dateUtils";
import { Close, DeleteForever, Update } from "@mui/icons-material";
import { defaultTableButton, defaultRedButton } from "../../../theme/Theme";

const PartsQuoteDetailsContent = ({
  customer,
  partsQuote,
  openDeletePartsQuote,
  closeBasicSecondModal,
}) => {
  console.log("partsQuote", partsQuote);
  return (
    <>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="caption" color="primary">
            {customer.lastname}
          </Typography>
          <Grid2 xs={12}>
            <Typography variant="caption" color="primary">
              {getFormattedDate(partsQuote.quoteDate)}
            </Typography>
          </Grid2>
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
          startIcon={<DeleteForever />}
          sx={defaultRedButton}
          onClick={() => openDeletePartsQuote()}
        >
          Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Update />}
          sx={defaultTableButton}
        >
          Update Parts Quote
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

export default PartsQuoteDetailsContent;
