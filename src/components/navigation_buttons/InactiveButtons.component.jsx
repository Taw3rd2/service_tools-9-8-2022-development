import { Typography } from "@mui/material";
import { AddCircle, Assignment, BuildCircle } from "@mui/icons-material";

import "../../global_style/style.css";

const reportButton = {
  border: "1px solid teal",
  textAlign: "center",
  padding: "8px",
};

const InactiveButtons = () => {
  return (
    <div
      style={{
        flexGrow: 1,
        border: "2px solid teal",
        padding: "4px",
      }}
    >
      <div className="row">
        <div className="quadRowInput">
          <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Create New</Typography>
            <Typography variant="subtitle1">Dispatch</Typography>
          </div>
        </div>
        <div className="quadRowInput">
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Customer</Typography>
            <Typography variant="subtitle1">Dispatches</Typography>
          </div>
        </div>
        <div className="quadRowInput">
          <div style={reportButton}>
            <BuildCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Add</Typography>
            <Typography variant="subtitle1">Maintenance</Typography>
          </div>
        </div>
        <div className="quadRowInput">
          <div style={reportButton}>
            <BuildCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Warranty</Typography>
            <Typography variant="subtitle1">Manager</Typography>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="quadRowInput">
          <div style={reportButton}>
            <AddCircle style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Blank</Typography>
            <Typography variant="subtitle1">Parts Quote</Typography>
          </div>
        </div>

        <div className="quadRowInput">
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Parts</Typography>
            <Typography variant="subtitle1">Quotes</Typography>
          </div>
        </div>

        <div className="quadRowInput">
          <div style={reportButton}>
            <Assignment style={{ fontSize: 60, color: "grey" }} />
            <Typography variant="subtitle1">Equipment</Typography>
            <Typography variant="subtitle1">Quotes</Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InactiveButtons;
