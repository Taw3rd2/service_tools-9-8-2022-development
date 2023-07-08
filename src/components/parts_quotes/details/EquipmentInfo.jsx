import { Switch, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";

const EquipmentInfo = ({
  equipmentValues,
  handleEquipmentValueChange,
  quoteValues,
  handleQuoteCheckChange,
  handleQuoteDateChange,
  handleQuoteValueChange,
}) => {
  return (
    <div>
      <div className="row">
        <div className="singleRowInput">
          <div className="columnHeaderText">Equipment Information</div>
        </div>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="doubleRowInput">Not Model Specific</div>
        <div style={{ marginLeft: "auto" }}>
          <Switch
            checked={quoteValues.notModelSpecific}
            onChange={handleQuoteCheckChange("notModelSpecific")}
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
      </div>
      {quoteValues.notModelSpecific ? (
        <div className="buttonBarStack">
          <TextField
            label="Equipment Name"
            size="small"
            value={equipmentValues.equipmentName}
            fullWidth
            onChange={handleEquipmentValueChange("equipmentName")}
            inputProps={{ tabIndex: "7" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Quote Date"
              value={quoteValues.quoteDate}
              onChange={handleQuoteDateChange("quoteDate")}
              color="primary"
              inputProps={{ tabIndex: "8" }}
              renderInput={(params) => (
                <TextField size="small" fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Job Number"
            size="small"
            value={quoteValues.jobNumber}
            fullWidth
            onChange={handleQuoteValueChange("jobNumber")}
            inputProps={{ tabIndex: "9" }}
          />
        </div>
      ) : (
        <div className="buttonBarStack">
          <TextField
            label="Equipment Name"
            size="small"
            value={equipmentValues.equipmentName}
            fullWidth
            required
            onChange={handleEquipmentValueChange("equipmentName")}
            inputProps={{ tabIndex: "7" }}
          />
          <TextField
            label="Equipment Brand"
            size="small"
            value={equipmentValues.equipmentBrand}
            fullWidth
            onChange={handleEquipmentValueChange("equipmentBrand")}
            inputProps={{ tabIndex: "8" }}
          />
          <TextField
            label="Equipment Model"
            size="small"
            value={equipmentValues.equipmentModel}
            fullWidth
            onChange={handleEquipmentValueChange("equipmentModel")}
            inputProps={{ tabIndex: "9" }}
          />
          <TextField
            label="Equipment Serial"
            size="small"
            value={equipmentValues.equipmentSerial}
            fullWidth
            onChange={handleEquipmentValueChange("equipmentSerial")}
            inputProps={{ tabIndex: "10" }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Quote Date"
              value={quoteValues.quoteDate}
              onChange={handleQuoteDateChange("quoteDate")}
              color="primary"
              inputProps={{ tabIndex: "11" }}
              renderInput={(params) => (
                <TextField size="small" fullWidth {...params} />
              )}
            />
          </LocalizationProvider>
          <TextField
            label="Job Number"
            size="small"
            value={quoteValues.jobNumber}
            fullWidth
            onChange={handleQuoteValueChange("jobNumber")}
            inputProps={{ tabIndex: "12" }}
          />
        </div>
      )}
    </div>
  );
};

export default EquipmentInfo;
