import React, { useContext, useEffect, useState } from "react";

import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import { updateDocument } from "../../../firebase/firestore.utils";
import { ToastContext } from "../../../context/toastContext";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Backdrop,
  Button,
  Fade,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const EditDayLabel = ({
  isEditDayLabelModalOpen,
  closeEditDayLabelModal,
  calendarDateSelected,
  selectedDayLabel,
}) => {
  const { dispatch } = useContext(ToastContext);
  const db = getFirestore();

  const [technicians, setTechnicians] = useState([]);
  useEffect(
    () =>
      onSnapshot(collection(db, "technicians"), (snapshot) =>
        setTechnicians(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  const labelDate = calendarDateSelected;
  const [locationName, setLocationName] = useState(
    selectedDayLabel.locationName ? selectedDayLabel.locationName : ""
  );
  const [tech, setTech] = useState(
    selectedDayLabel.tech ? selectedDayLabel.tech : ""
  );

  const onSubmit = (event) => {
    event.preventDefault();
    const updatedLabel = {
      labelDate,
      locationName,
      tech,
    };
    updateDocument(doc(db, "calLabel", selectedDayLabel.id), updatedLabel)
      .then(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedDateAndTime(new Date()),
            type: "SUCCESS",
            title: "Update Day Label",
            message: "Updated the day label in the cloud",
          },
        });
        closeEditDayLabelModal();
      })
      .catch((error) => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedDateAndTime(new Date()),
            type: "ERROR",
            title: "Update Day Label",
            message: "There was an error updating",
          },
        });
        console.log("Firestore error: ", error);
      });
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="edit-day-label-modal"
        aria-describedby="edit-day-label"
        open={isEditDayLabelModalOpen}
        onClose={closeEditDayLabelModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isEditDayLabelModalOpen}>
          <div style={modalStyle}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Edit Day Label
                </Typography>
              </Grid2>
            </Grid2>
            <form onSubmit={onSubmit} autoComplete="new-password">
              <Grid2 container spacing={2}>
                <Grid2 xs={6}>
                  {technicians.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="select-tech-lead">Tech Lead</InputLabel>
                      <Select
                        labelId="select-tech-lead"
                        id="tech-lead"
                        value={tech}
                        label="Tech Lead"
                        onChange={(event) => setTech(event.target.value)}
                        inputProps={{ tabIndex: "1" }}
                      >
                        {technicians
                          .sort((a, b) => a.name.localeCompare(b.name))
                          .map((technician) => (
                            <MenuItem
                              key={technician.id}
                              value={technician.name}
                            >
                              {technician.name}
                            </MenuItem>
                          ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid2>
                <Grid2 xs={6}>
                  <TextField
                    label="Location Name"
                    fullWidth
                    value={locationName}
                    onChange={(event) => setLocationName(event.target.value)}
                    inputProps={{ tabIndex: "2" }}
                  />
                </Grid2>

                <Grid2
                  container
                  alignItems="flex-start"
                  justifyContent="flex-end"
                  direction="row"
                  sx={{ marginTop: "24px" }}
                >
                  <Button
                    sx={{ marginLeft: "8px" }}
                    type="submit"
                    variant="outlined"
                    color="primary"
                    startIcon={<ArrowUpward />}
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{ marginLeft: "8px" }}
                    type="button"
                    variant="outlined"
                    color="primary"
                    onClick={() => closeEditDayLabelModal()}
                    startIcon={<Close />}
                  >
                    Close
                  </Button>
                </Grid2>
              </Grid2>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default EditDayLabel;
