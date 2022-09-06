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

const BasicThirdModal = ({
  isBasicThirdModalOpen,
  closeBasicThirdModal,
  thirdModalSize,
  thirdModalAriaLabel,
  thirdModalTitle,
  thirdModalContent,
}) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby={thirdModalAriaLabel}
        aria-describedby="modal for creating parts quotes"
        open={isBasicThirdModalOpen}
        onClose={closeBasicThirdModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isBasicThirdModalOpen}>
          <div style={getRootModalStyle(thirdModalSize)}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography
                  variant="h5"
                  color="primary"
                  style={{ paddingLeft: "8px" }}
                >
                  {thirdModalTitle}
                </Typography>
              </Grid2>
            </Grid2>
            {thirdModalContent}
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default BasicThirdModal;
