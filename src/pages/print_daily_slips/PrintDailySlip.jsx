import React from "react";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Paper, TextField } from "@mui/material";
import { getFormattedDate } from "../../utilities/dateUtils";

const printStyle = {
  margin: 0,
  padding: 0,
  whiteSpace: "nowrap",
  wordWrap: "break-word",
  wordBreak: "break-word",
  textOverflow: "ellipsis",
  overflow: "hidden",
};

const PrintDailySlip = (props) => {
  return (
    <Grid2 xs sx={{ marginLeft: "28px" }}>
      <Paper variant="outlined" sx={{ height: 500, width: 350 }}>
        <Grid2 container spacing={0}>
          <Grid2 xs={4} sx={{ paddingLeft: "8px" }}>
            {/* Service Date */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Service Date"
              value={getFormattedDate(props.children[1].dateScheduled)}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/* Lead Source */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Lead Source"
              value={props.children[1].leadSource}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingRight: "8px" }}>
            {/* Call Taken By */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Dispatcher"
              value={props.children[1].takenBy}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          {props.children[1].firstname ? (
            <>
              <Grid2 xs={6} sx={{ paddingLeft: "8px" }}>
                <p style={printStyle}>
                  {props.children[1].firstname} {props.children[1].lastname}
                </p>
              </Grid2>

              <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
                {props.children[1].phoneName && props.children[1].phone ? (
                  <p style={printStyle}>{`${props.children[1].phoneName}`}</p>
                ) : props.children[1].phoneName ? (
                  <p style={printStyle}>{`${props.children[1].phoneName}`}</p>
                ) : null}
              </Grid2>
            </>
          ) : (
            <>
              <Grid2 xs={6} sx={{ paddingLeft: "8px" }}>
                <p style={printStyle}>{props.children[1].lastname}</p>
              </Grid2>

              <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
                {props.children[1].phoneName && (
                  <p style={printStyle}>{`${props.children[1].phoneName}`}</p>
                )}
              </Grid2>
            </>
          )}

          <Grid2 xs={6} sx={{ paddingLeft: "8px" }}>
            <p style={printStyle}>{props.children[1].street}</p>
          </Grid2>
          <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
            {props.children[1].phone && (
              <p style={printStyle}>{`${props.children[1].phone}`}</p>
            )}
          </Grid2>
          <Grid2 xs={6} sx={{ paddingLeft: "8px" }}>
            <p style={printStyle}>{props.children[1].city}</p>
          </Grid2>
          <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
            {props.children[1].altPhoneName && (
              <p style={printStyle}>{`${props.children[1].altPhoneName}`}</p>
            )}
          </Grid2>
          <Grid2 xs={6} sx={{ paddingLeft: "8px" }} />
          <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
            {props.children[1].altphone && (
              <p style={printStyle}>{`${props.children[1].altphone}`}</p>
            )}
          </Grid2>
          <Grid2 xs={6} sx={{ paddingLeft: "8px" }}>
            {/*Work Selector*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Issue"
              value={props.children[1].issue}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={6} sx={{ paddingRight: "8px" }}>
            {/*Slotted Time*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Slotted Time"
              value={props.children[1].timeAlotted}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingLeft: "8px" }}>
            {/*Tech Lead*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Tech Lead"
              value={props.children[1].techLead}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/*Tech helper*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Tech Helper"
              value={props.children[1].techHelper}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingRight: "8px" }}>
            {/*Payment*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Payment"
              value={props.children[1].payment}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2 xs={12} sx={{ paddingLeft: "8px", paddingRight: "8px" }}>
            {/* Notes */}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Notes (4 lines max for printable view)"
              rows="4"
              fullWidth
              multiline
              value={props.children[1].notes}
            />
          </Grid2>
          <Grid2 xs={4} sx={{ paddingLeft: "8px" }}>
            {/*Time Of Day*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Requested"
              value={props.children[1].timeOfDay}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
          <Grid2
            xs={4}
            sx={{ paddingLeft: "8px", paddingRight: "8px" }}
          ></Grid2>
          <Grid2 xs={4} sx={{ paddingRight: "8px" }}>
            {/*Job Number*/}
            <TextField
              margin="dense"
              size="small"
              variant="outlined"
              label="Job Number"
              value={props.children[1].jobNumber}
              inputProps={{
                style: { fontSize: 14 },
              }}
              fullWidth
            />
          </Grid2>
        </Grid2>
      </Paper>
    </Grid2>
  );
};

export default PrintDailySlip;
