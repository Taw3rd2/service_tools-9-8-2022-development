import React from "react";
import { useLocation } from "react-router-dom";

import ViewDailySlip from "./ViewDailySlip";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { useMediaQuery } from "@mui/material";
import PrintDailySlip from "./PrintDailySlip";

const PrintOneSlip = () => {
  const matchesPrint = useMediaQuery("print");
  const location = useLocation();
  const dispatches = [];
  const { state } = location;
  dispatches.push(state);

  return (
    <>
      {matchesPrint ? (
        <div style={{ marginTop: "16px" }}>
          <Grid2 container spacing={3}>
            {dispatches.map((dispatch) => (
              <PrintDailySlip key={dispatch.id}> {dispatch} </PrintDailySlip>
            ))}
          </Grid2>
        </div>
      ) : (
        <div style={{ marginTop: "16px" }}>
          <Grid2 container>
            {dispatches.map((dispatch) => (
              <ViewDailySlip key={dispatch.id}> {dispatch} </ViewDailySlip>
            ))}
          </Grid2>
        </div>
      )}
    </>
  );
};

export default PrintOneSlip;
