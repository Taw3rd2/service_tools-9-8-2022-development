import { Switch, TextField } from "@mui/material";
import React from "react";

const SiteInfo = ({
  customerValues,
  handleCustomerValueChange,
  handleCustomerCheckChange,
}) => {
  return (
    <div>
      {customerValues.iscommercial ? (
        <>
          <div className="row">
            <div className="singleRowInput">
              <div className="columnHeaderText">Customer Information</div>
            </div>
          </div>
          <div className="row" style={{ alignItems: "center" }}>
            <div className="doubleRowInput">Commercial</div>

            <div style={{ marginLeft: "auto" }}>
              <Switch
                checked={customerValues.iscommercial}
                onChange={handleCustomerCheckChange("iscommercial")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
          <div className="buttonBarStack">
            <TextField
              label="Tenant or Business Name"
              size="small"
              value={customerValues.customerLastName}
              fullWidth
              onChange={handleCustomerValueChange("customerLastName")}
              inputProps={{ tabIndex: "1" }}
            />
            <TextField
              label="Customer Address"
              size="small"
              value={customerValues.customerStreet}
              fullWidth
              onChange={handleCustomerValueChange("customerStreet")}
              inputProps={{ tabIndex: "2" }}
            />
            <TextField
              label="Customer City"
              size="small"
              value={customerValues.customerCity}
              fullWidth
              onChange={handleCustomerValueChange("customerCity")}
              inputProps={{ tabIndex: "3" }}
            />
            <TextField
              label="Customer State"
              size="small"
              value={customerValues.customerState}
              fullWidth
              onChange={handleCustomerValueChange("customerState")}
              inputProps={{ tabIndex: "4" }}
            />
            <TextField
              label="Customer Zip"
              size="small"
              value={customerValues.customerZip}
              fullWidth
              onChange={handleCustomerValueChange("customerZip")}
              inputProps={{ tabIndex: "5" }}
            />
          </div>
        </>
      ) : (
        <>
          <div className="row">
            <div className="singleRowInput">
              <div className="columnHeaderText">Customer Information</div>
            </div>
          </div>
          <div className="row" style={{ alignItems: "center" }}>
            <div className="doubleRowInput">Commercial</div>

            <div style={{ marginLeft: "auto" }}>
              <Switch
                checked={customerValues.iscommercial}
                onChange={handleCustomerCheckChange("iscommercial")}
                inputProps={{ "aria-label": "controlled" }}
              />
            </div>
          </div>
          <div className="buttonBarStack">
            <TextField
              label="Customer First Name"
              size="small"
              value={customerValues.customerFirstName}
              fullWidth
              onChange={handleCustomerValueChange("customerFirstName")}
              inputProps={{ tabIndex: "1" }}
            />
            <TextField
              label="Customer Last Name"
              size="small"
              value={customerValues.customerLastName}
              fullWidth
              onChange={handleCustomerValueChange("customerLastName")}
              inputProps={{ tabIndex: "2" }}
            />
            <TextField
              label="Customer Address"
              size="small"
              value={customerValues.customerStreet}
              fullWidth
              onChange={handleCustomerValueChange("customerStreet")}
              inputProps={{ tabIndex: "3" }}
            />
            <TextField
              label="Customer City"
              size="small"
              value={customerValues.customerFirstName}
              fullWidth
              onChange={handleCustomerValueChange("customerCity")}
              inputProps={{ tabIndex: "4" }}
            />
            <TextField
              label="Customer State"
              size="small"
              value={customerValues.customerState}
              fullWidth
              onChange={handleCustomerValueChange("customerState")}
              inputProps={{ tabIndex: "5" }}
            />
            <TextField
              label="Customer Zip"
              size="small"
              value={customerValues.customerZip}
              fullWidth
              onChange={handleCustomerValueChange("customerZip")}
              inputProps={{ tabIndex: "6" }}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SiteInfo;
