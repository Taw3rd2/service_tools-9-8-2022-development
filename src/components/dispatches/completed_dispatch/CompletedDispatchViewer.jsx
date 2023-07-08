import { Close } from "@mui/icons-material";
import { TextField } from "@mui/material";
import { getFormattedDate } from "../../../utilities/dateUtils";

const CompletedDispatchViewer = ({ selectedDispatch, closeModalOne }) => {
  return (
    <>
      <div className="row" style={{ marginTop: "16px" }}>
        <div className="tripleRowInput">
          <TextField
            label="Date Completed"
            fullWidth
            value={getFormattedDate(selectedDispatch.start)}
            color="primary"
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Lead Source"
            fullWidth
            value={selectedDispatch.leadSource}
            color="primary"
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Dispatcher"
            fullWidth
            value={selectedDispatch.takenBy}
            color="primary"
          />
        </div>
      </div>
      {selectedDispatch.firstname ? (
        <div className="row">
          <div className="doubleRowInput">
            <TextField
              label="First Name"
              fullWidth
              value={selectedDispatch.firstname}
              color="primary"
            />
          </div>
          <div className="doubleRowInput">
            <TextField
              label="Last Name"
              fullWidth
              value={selectedDispatch.lastname}
              color="primary"
            />
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="singleRowInput">
            <TextField
              label="Organization"
              fullWidth
              value={selectedDispatch.lastname}
              color="primary"
            />
          </div>
        </div>
      )}

      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Job Address"
            fullWidth
            value={selectedDispatch.street}
            color="primary"
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="City, State, Zip Code"
            fullWidth
            value={selectedDispatch.city}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Primary Contact"
            fullWidth
            value={selectedDispatch.phoneName}
            color="primary"
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Alternate Contact"
            fullWidth
            value={selectedDispatch.altPhoneName}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Primary Phone Number"
            fullWidth
            value={selectedDispatch.phone}
            color="primary"
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Alternate Phone Number"
            fullWidth
            value={selectedDispatch.altphone}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Selected Work Ordered"
            fullWidth
            value={selectedDispatch.issue}
            color="primary"
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Slotted Time"
            fullWidth
            value={selectedDispatch.timeAlotted}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="tripleRowInput">
          <TextField
            label="Tech Lead"
            fullWidth
            value={selectedDispatch.techLead}
            color="primary"
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Tech Helper"
            fullWidth
            value={selectedDispatch.techHelper}
            color="primary"
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Billing Type"
            fullWidth
            value={selectedDispatch.payment}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="singleRowInput">
          <TextField
            label="Notes"
            fullWidth
            value={selectedDispatch.notes}
            color="primary"
          />
        </div>
      </div>

      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Time Of Day"
            fullWidth
            value={selectedDispatch.timeOfDay}
            color="primary"
          />
        </div>
        <div className="doubleRowInput">
          <TextField
            label="Job Number"
            fullWidth
            value={selectedDispatch.jobNumber}
            color="primary"
          />
        </div>
      </div>

      <div className="buttonBar">
        <button
          type="button"
          className="standardButton"
          onClick={() => closeModalOne()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </>
  );
};

export default CompletedDispatchViewer;
