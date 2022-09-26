import React, { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { Close, DeleteForever } from "@mui/icons-material";
import { defaultRedButton, defaultTableButton } from "../../../theme/Theme";

import { deleteWarranty } from "../warrantyFunctions";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const DeleteWarrantyContent = ({
  customer,
  selectedWarranty,
  closeDetails,
  closeDelete,
}) => {
  const { dispatch } = useContext(ToastContext);

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Delete Warranty",
        message: "Removed warranty from the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Delete Warranty",
        message: "There was an error removing",
      },
    });
  };
  return (
    <div>
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
          color="primary"
          startIcon={<DeleteForever />}
          sx={defaultRedButton}
          onClick={() =>
            deleteWarranty(
              customer,
              selectedWarranty,
              activateSuccessNotification,
              activateFailureNotification,
              closeDetails,
              closeDelete
            )
          }
        >
          Confirm Delete
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

export default DeleteWarrantyContent;
