import { TextField } from "@mui/material";

import { getFormattedDate } from "../../../utilities/dateUtils";

import "../../../global_style/style.css";

const PrintDailySlip = (props) => {
  const dispatch = props.children[1];

  return (
    <div className="printSlipsContainer">
      <div className="viewSlipsRow">
        <div className="tripleRowInput">
          {/* Service Date */}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Service Date"
            value={getFormattedDate(dispatch.dateScheduled)}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="tripleRowInput">
          {/* Lead Source */}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Lead Source"
            value={dispatch.leadSource}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="tripleRowInput">
          {/* Call Taken By */}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Dispatcher"
            value={dispatch.takenBy}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
      </div>
      {dispatch.firstname ? (
        <div className="viewSlipsRow">
          <div className="singleRowInput">
            <div className="viewSlipsPrimaryText">
              {dispatch.firstname} {dispatch.lastname}
            </div>
          </div>
        </div>
      ) : (
        <div className="viewSlipsRow">
          <div className="singleRowInput">
            <div className="viewSlipsPrimaryText">{dispatch.lastname}</div>
          </div>
        </div>
      )}
      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {dispatch.phoneName || dispatch.phone ? (
            <>
              <div className="viewSlipsCaptionText">Primary Contact</div>
              <div className="viewSlipsPrimaryText">
                {dispatch.phoneName && `${dispatch.phoneName}: `}
                {dispatch.phone && `${dispatch.phone}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {dispatch.altPhoneName || dispatch.altphone ? (
            <>
              <div className="viewSlipsCaptionText">Alternate Contact</div>
              <div className="viewSlipsPrimaryText">
                {dispatch.altPhoneName && `${dispatch.altPhoneName}: `}
                {dispatch.altphone && `${dispatch.altphone}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {dispatch.otherPhoneName || dispatch.otherPhone ? (
            <>
              <div className="viewSlipsCaptionText">Other Contact</div>
              <div className="viewSlipsPrimaryText">
                {dispatch.otherPhoneName && `${dispatch.otherPhoneName}: `}
                {dispatch.otherPhone && `${dispatch.otherPhone}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {dispatch.street ? (
            <>
              <div className="viewSlipsCaptionText">Address</div>
              <div className="viewSlipsSecondaryText">
                {dispatch.street && `${dispatch.street}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {dispatch.city ? (
            <>
              <div className="viewSlipsSecondaryText">
                {dispatch.city && `${dispatch.city}`}
              </div>
            </>
          ) : null}
        </div>
      </div>

      <div className="viewSlipsRow" style={{ marginTop: "8px" }}>
        <div className="doubleRowInput">
          {/*Work Selector*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Issue"
            value={dispatch.issue}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="doubleRowInput">
          {/*Slotted Time*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Slotted Time"
            value={dispatch.timeAlotted}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="tripleRowInput">
          {/*Tech Lead*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Tech Lead"
            value={dispatch.techLead}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="tripleRowInput">
          {/*Tech helper*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Tech Helper"
            value={dispatch.techHelper}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="tripleRowInput">
          {/*Payment*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Payment"
            value={dispatch.payment}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="singleRowInput">
          {/* Notes */}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Notes (4 lines max for printable view)"
            rows="4"
            fullWidth
            multiline
            value={dispatch.notes}
          />
        </div>
      </div>

      <div className="viewSlipsRow">
        <div className="tripleRowInput">
          {/*Time Of Day*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Requested"
            value={dispatch.timeOfDay}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
        <div className="tripleRowInput"></div>
        <div className="tripleRowInput">
          {/*Job Number*/}
          <TextField
            margin="dense"
            size="small"
            variant="outlined"
            label="Job Number"
            value={dispatch.jobNumber}
            inputProps={{
              style: { fontSize: 14 },
            }}
            fullWidth
          />
        </div>
      </div>
    </div>
  );
};

export default PrintDailySlip;
