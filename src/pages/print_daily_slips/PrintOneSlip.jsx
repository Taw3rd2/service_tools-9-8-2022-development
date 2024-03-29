import React from "react";
import { useLocation } from "react-router-dom";

import PrintDailySlip from "./print_daily/PrintDailySlip";
import ViewDailySlip from "./view_daily/ViewDailySlip";

import { useMediaQuery } from "@mui/material";

const PrintOneSlip = () => {
  const matchesPrint = useMediaQuery("print");
  const location = useLocation();
  const dispatches = [];
  const { state } = location;
  dispatches.push(state);

  return (
    <>
      {matchesPrint ? (
        <div
          style={{
            pageBreakAfter: "always",
            display: "grid",
            gridTemplateColumns: "48%48%",
          }}
        >
          {dispatches.map((dispatch, index) => (
            <PrintDailySlip key={index}> {dispatch} </PrintDailySlip>
          ))}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {dispatches.map((dispatch, index) => (
            <ViewDailySlip key={index}> {dispatch} </ViewDailySlip>
          ))}
        </div>
      )}
    </>
  );
};

export default PrintOneSlip;
