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

const BasicSecondModal = ({
  isBasicSecondModalOpen,
  closeBasicSecondModal,
  secondModalSize,
  secondModalAriaLabel,
  secondModalTitle,
  secondModalContent,
}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby={secondModalAriaLabel}
        aria-describedby="modal for creating parts quotes"
        open={isBasicSecondModalOpen}
        onClose={closeBasicSecondModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isBasicSecondModalOpen}>
          <div style={getRootModalStyle(secondModalSize)}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ paddingLeft: "8px" }}
                >
                  {secondModalTitle}
                </Typography>
              </Grid2>
            </Grid2>
            {secondModalContent}
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default BasicSecondModal;
