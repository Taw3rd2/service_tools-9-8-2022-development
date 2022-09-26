import React, { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";
import { getFirestore, doc } from "firebase/firestore";

import { deleteDocument } from "../../../firebase/firestore.utils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DeleteDayLabel = ({
  isDeleteDayLabelModalOpen,
  closeDeleteDayLabelModal,
  selectedDayLabel,
}) => {
  const { dispatch } = useContext(ToastContext);
  const db = getFirestore();

  const removeDayLabel = () => {
    deleteDocument(doc(db, "calLabel", selectedDayLabel.id))
      .then(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedDateAndTime(new Date()),
            type: "SUCCESS",
            title: "Delete Day Label",
            message: "Removed the day label from the cloud",
          },
        });
        closeDeleteDayLabelModal();
      })
      .catch((error) => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedDateAndTime(new Date()),
            type: "ERROR",
            title: "Delete Day Label",
            message: "There was an error removing the label",
          },
        });
        console.log("Firestore error: ", error);
      });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="delete-day-label-modal"
        aria-describedby="modal for deleting a day label"
        open={isDeleteDayLabelModalOpen}
        onClose={closeDeleteDayLabelModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteDayLabelModalOpen}>
          <div style={modalStyle}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  {`Delete ${selectedDayLabel.locationName}?`}
                </Typography>
              </Grid2>
            </Grid2>
            <Grid2
              container
              alignItems="flex-start"
              justifyContent="flex-end"
              direction="row"
              sx={{ marginTop: "24px" }}
            >
              <Button
                sx={{ marginLeft: "8px", color: "red" }}
                variant="outlined"
                color="inherit"
                startIcon={<Delete />}
                onClick={() => removeDayLabel()}
              >
                Delete
              </Button>
              <Button
                sx={{ marginLeft: "8px" }}
                type="button"
                variant="outlined"
                color="primary"
                onClick={() => closeDeleteDayLabelModal()}
                startIcon={<Close />}
              >
                Close
              </Button>
            </Grid2>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default DeleteDayLabel;
