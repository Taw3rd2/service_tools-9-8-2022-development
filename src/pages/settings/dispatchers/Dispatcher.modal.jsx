import React, { useContext, useState } from "react";
import { getFirestore, collection, doc } from "firebase/firestore";
import { ToastContext } from "../../../context/toastContext";

import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const style = {
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

const Dispatcher = ({
  isDispatcherModalOpen,
  closeDispatcherModal,
  dispatcher,
}) => {
  const { dispatch } = useContext(ToastContext);
  const db = getFirestore();

  const [name, setName] = useState(dispatcher ? dispatcher.name : "");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { name };
    if (dispatcher) {
      console.log("dispatcher name: ", name);
      updateDocument(doc(db, "dispatchers", dispatcher.id), data)
        .then(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "SUCCESS",
              title: "Update Dispatcher",
              message: "Update Dispatcher in the cloud",
            },
          });
          closeDispatcherModal();
        })
        .catch((error) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "ERROR",
              title: "Update Dispatcher",
              message: "There was a error updating",
            },
          });
          console.log("Firebase error: ", error);
        });
    } else {
      createUnNamedDocument(collection(db, "dispatchers"), data)
        .then(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "SUCCESS",
              title: "Create Dispatcher",
              message: "Created new dispatcher in the cloud",
            },
          });
          closeDispatcherModal();
        })
        .catch((error) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "ERROR",
              title: "Create Dispatcher",
              message: "There was an error creating",
            },
          });
          console.log("Firebase error: ", error);
        });
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="dispatcher-modal"
        aria-describedby="modal for dispatcher edits"
        open={isDispatcherModalOpen}
        onClose={closeDispatcherModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDispatcherModalOpen}>
          <div style={style}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography variant="h5" color="primary">
                  {dispatcher
                    ? `Edit Dispatcher ${dispatcher.name}`
                    : "New Dispatcher"}
                </Typography>
              </Grid2>
            </Grid2>

            <form onSubmit={onSubmit} autoComplete="new password">
              <Grid2 container spacing={2} sc={{ marginTop: "8px" }}>
                <Grid2 xs={12}>
                  <TextField
                    label="Name"
                    value={name}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
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
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="submit"
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="button"
                  variant="outlined"
                  onClick={() => closeDispatcherModal()}
                  startIcon={<Close />}
                >
                  Close
                </Button>
              </Grid2>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default Dispatcher;
