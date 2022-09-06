import React from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Backdrop,
  Fade,
  Modal,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { getRootModalStyle, lightTheme } from "../../theme/Theme";

const BasicModal = ({
  isBasicModalOpen,
  closeBasicModal,
  modalSize,
  modalAriaLabel,
  modalTitle,
  modalContent,
}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby={modalAriaLabel}
        aria-describedby="modal for creating parts quotes"
        open={isBasicModalOpen}
        onClose={closeBasicModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isBasicModalOpen}>
          <div style={getRootModalStyle(modalSize)}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ marginLeft: "8px" }}
                >
                  {modalTitle}
                </Typography>
              </Grid2>
            </Grid2>
            {modalContent}
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default BasicModal;
