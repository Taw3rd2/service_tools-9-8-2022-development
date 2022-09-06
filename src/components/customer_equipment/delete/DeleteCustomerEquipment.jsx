import React from "react";

import { deleteCustomerEquipment } from "../customerEquipmentFunctions";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { Close, DeleteForever } from "@mui/icons-material";
import { defaultRedButton, defaultTableButton } from "../../../theme/Theme";

const DeleteCustomerEquipment = ({
  customer,
  selectedEquipment,
  closeDetails,
  closeDelete,
}) => {
  console.log("selectedEquipment: ", selectedEquipment);
  return (
    <div style={{ padding: "8px" }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="body1" gutterBottom>
            {`Unrecoverable Delete!`}
          </Typography>
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
          startIcon={<DeleteForever />}
          sx={defaultRedButton}
          onClick={() =>
            deleteCustomerEquipment(
              customer,
              selectedEquipment,
              closeDetails,
              closeDelete
            )
          }
        >
          Confirm Unrecoverable Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          sx={defaultTableButton}
          onClick={() => closeDelete()}
        >
          Close
        </Button>
      </Grid2>
    </div>
  );
};

export default DeleteCustomerEquipment;