import React, { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, Typography } from "@mui/material";
import { Close, DeleteForever } from "@mui/icons-material";
import { defaultRedButton, defaultTableButton } from "../../../theme/Theme";

import { deleteMaintenance } from "../maintenanceFunctions";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const DeleteMaintenanceContent = ({
  customer,
  selectedMaintenance,
  closeDetailsModal,
  closeDeleteModal,
}) => {
  const { dispatch } = useContext(ToastContext);

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Delete Maintenance",
        message: "Removed maintenance from the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Delete Maintenance",
        message: "There was an error removing",
      },
    });
  };
  return (
    <div>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="body1" gutterBottom>
            {`Unrecoverable delete!`}
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
            deleteMaintenance(
              customer,
              selectedMaintenance,
              activateSuccessNotification,
              activateFailureNotification,
              closeDetailsModal,
              closeDeleteModal
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
          onClick={() => closeDeleteModal()}
        >
          Close
        </Button>
      </Grid2>
    </div>
  );
};

export default DeleteMaintenanceContent;
