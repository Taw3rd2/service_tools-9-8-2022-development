import React from "react";
import { doc, getFirestore } from "firebase/firestore";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Backdrop, Button, Fade, Modal, Typography } from "@mui/material";
import { Close, Delete } from "@mui/icons-material";
import { deleteDocument } from "../../firebase/firestore.utils";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../theme/Theme";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 350,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const DeleteItem = ({
  isDeleteItemModalOpen,
  closeDeleteItemModal,
  parentCollection,
  item,
}) => {
  const db = getFirestore();

  const onItemDelete = () => {
    deleteDocument(doc(db, parentCollection, item.id)).then(() =>
      closeDeleteItemModal()
    );
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="settings-delete-modal"
        aria-describedby="modal to delete items"
        open={isDeleteItemModalOpen}
        onClose={closeDeleteItemModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isDeleteItemModalOpen}>
          <div style={style}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography variant="h5" gutterBottom color="primary">
                  Delete ?
                </Typography>
              </Grid2>
              <Grid2 xs={12}>
                <Typography variant="body1" gutterBottom>
                  Unrecoverable delete!
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
                sx={{
                  marginLeft: "8px",
                  color: "red",
                }}
                size="large"
                color="inherit"
                variant="outlined"
                startIcon={<Delete />}
                onClick={() => onItemDelete()}
              >
                Delete
              </Button>
              <Button
                sx={{
                  marginLeft: "8px",
                }}
                size="large"
                color="primary"
                variant="outlined"
                startIcon={<Close />}
                onClick={() => closeDeleteItemModal()}
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

export default DeleteItem;
