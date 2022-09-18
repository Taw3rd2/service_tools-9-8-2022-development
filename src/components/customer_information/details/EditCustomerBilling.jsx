import { useState } from "react";
import { TextField } from "@mui/material";

import "../../../global_style/style.css";
import { ArrowUpward, Close } from "@mui/icons-material";
import { updateCustomer } from "../customerInformationFunctions";

const EditCustomerBilling = ({ customer, closeModalOne }) => {
  const [customerValues, setCustomerValues] = useState({
    billingorg: customer.billingorg ? customer.billingorg : "",
    billingPrimaryName: customer.billingPrimaryName
      ? customer.billingPrimaryName
      : "",
    billingAlternateName: customer.billingAlternateName
      ? customer.billingAlternateName
      : "",
    billingOtherName: customer.billingOtherName
      ? customer.billingOtherName
      : "",
    billingPrimaryPhone: customer.billingPrimaryPhone
      ? customer.billingPrimaryPhone
      : "",
    billingAlternatePhone: customer.billingAlternatePhone
      ? customer.billingAlternatePhone
      : "",
    billingOtherPhone: customer.billingOtherPhone
      ? customer.billingOtherPhone
      : "",
    billingPrimaryEmail: customer.billingPrimaryEmail
      ? customer.billingPrimaryEmail
      : "",
    billingAlternateEmail: customer.billingAlternateEmail
      ? customer.billingAlternateEmail
      : "",
    billingOtherEmail: customer.billingOtherEmail
      ? customer.billingOtherEmail
      : "",
    billingstreet: customer.billingstreet ? customer.billingstreet : "",
    billingcity: customer.billingcity ? customer.billingstreet : "",
    billingstate: customer.billingstate ? customer.billingstate : "",
    billingzip: customer.billingzip ? customer.billingzip : "",
  });

  const handleValueChange = (name) => (event) => {
    setCustomerValues({
      ...customerValues,
      [name]: event.target.value,
    });
  };

  const submitBillingChanges = (event) => {
    event.preventDefault();
    updateCustomer(customer, customerValues, closeModalOne);
  };

  return (
    <form onSubmit={submitBillingChanges} autoComplete="new-password">
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            value={customerValues.billingorg}
            label="Organization Name"
            fullWidth
            onChange={handleValueChange("billingorg")}
            inputProps={{ tabIndex: "1" }}
            autoFocus
            required
          />
        </div>
        <div className="doubleRowInput"></div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingPrimaryName}
            label="Primary Contact Name"
            fullWidth
            onChange={handleValueChange("billingPrimaryName")}
            inputProps={{ tabIndex: "2" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingAlternateName}
            label="Alternate Contact Name"
            fullWidth
            onChange={handleValueChange("billingAlternateName")}
            inputProps={{ tabIndex: "5" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingOtherName}
            label="Other Contact Name"
            fullWidth
            onChange={handleValueChange("billingOtherName")}
            inputProps={{ tabIndex: "8" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingPrimaryPhone}
            label="Primary Phone Number"
            fullWidth
            onChange={handleValueChange("billingPrimaryPhone")}
            inputProps={{ tabIndex: "3" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingAlternatePhone}
            label="Alternate Phone Number"
            fullWidth
            onChange={handleValueChange("billingAlternatePhone")}
            inputProps={{ tabIndex: "6" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingOtherPhone}
            label="Other Phone Number"
            fullWidth
            onChange={handleValueChange("billingOtherPhone")}
            inputProps={{ tabIndex: "9" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingPrimaryEmail}
            label="Primary Email"
            fullWidth
            onChange={handleValueChange("billingPrimaryEmail")}
            inputProps={{ tabIndex: "4" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingAlternateEmail}
            label="Alternate Email"
            fullWidth
            onChange={handleValueChange("billingAlternateEmail")}
            inputProps={{ tabIndex: "7" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingOtherEmail}
            label="Other Email"
            fullWidth
            onChange={handleValueChange("billingOtherEmail")}
            inputProps={{ tabIndex: "10" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <TextField
            value={customerValues.billingstreet}
            label="Billing Street Address"
            fullWidth
            onChange={handleValueChange("billingstreet")}
            inputProps={{ tabIndex: "11" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingcity}
            label="City"
            fullWidth
            onChange={handleValueChange("billingcity")}
            inputProps={{ tabIndex: "12" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingstate}
            label="State"
            fullWidth
            onChange={handleValueChange("billingstate")}
            inputProps={{ tabIndex: "13" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.billingzip}
            label="Zip Code"
            fullWidth
            onChange={handleValueChange("billingzip")}
            inputProps={{ tabIndex: "14" }}
          />
        </div>
      </div>
      <div className="buttonBar">
        <button className="standardButton" type="submit" tabIndex={15}>
          <ArrowUpward />
          <span className="iconSeperation">Save Changes</span>
        </button>
        <button
          className="standardButton"
          type="button"
          onClick={() => closeModalOne()}
          tabIndex={16}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </form>
  );
};

export default EditCustomerBilling;
