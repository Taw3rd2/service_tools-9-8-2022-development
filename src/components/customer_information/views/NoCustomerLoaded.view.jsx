import React from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";

const NoCustomerLoaded = () => {
  return (
    <ThemeProvider theme={lightTheme}>
      <div style={{ padding: "8px" }}>
        <Grid2 container justifyContent="center" alignContent="center">
          <Typography variant="h5" color="primary">
            No Customer Loaded
          </Typography>
        </Grid2>
      </div>
    </ThemeProvider>
  );
};

export default NoCustomerLoaded;
