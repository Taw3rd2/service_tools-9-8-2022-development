import { useState } from "react";
import { addCustomerToFirestore } from "../customerInformationFunctions";
import "../../../global_style/style.css";
import { Checkbox, TextField } from "@mui/material";
import { Close, PersonAdd } from "@mui/icons-material";

const CreateCustomer = ({ closeModalOne }) => {
  const [customerValues, setCustomerValues] = useState({
    cnotes: "",
    squarefootage: "",
    firstname: "",
    lastname: "",
    street: "",
    city: "",
    state: "MI",
    zip: "",
    email: "",
    phoneName: "",
    altPhoneName: "",
    otherPhoneName: "",
    phone: "",
    altphone: "",
    otherPhone: "",
    billingorg: null,
    billingPrimaryName: null,
    billingAlternateName: null,
    billingOtherName: null,
    billingPrimaryPhone: null,
    billingAlternatePhone: null,
    billingOtherPhone: null,
    billingPrimaryEmail: null,
    billingAlternateEmail: null,
    billingOtherEmail: null,
    billingstreet: null,
    billingcity: null,
    billingstate: null,
    billingzip: null,
    billingiscommercial: false,
  });

  const handleCustomerChange = (prop) => (event) => {
    setCustomerValues({ ...customerValues, [prop]: event.target.value });
  };

  const handleCommercialChange = (name) => (event) => {
    setCustomerValues({
      ...customerValues,
      [name]: event.target.checked,
    });
  };

  const submitCustomer = (event) => {
    event.preventDefault();
    addCustomerToFirestore(customerValues, closeModalOne);
  };

  return (
    <form onSubmit={submitCustomer} autoComplete="new-password">
      <div className="row">
        <div className="doubleRowInput">
          <h3>
            Commercial:
            <Checkbox
              name="billingiscommercial"
              color="primary"
              checked={customerValues.billingiscommercial}
              onChange={handleCommercialChange("billingiscommercial")}
              style={{ marginBottom: "4px" }}
            />
          </h3>
        </div>
        <div className="doubleRowInput"></div>
      </div>
      {customerValues.billingiscommercial ? (
        <div>
          <div className="row">
            <div className="singleRowInput">
              <TextField
                label="Job Site Business Name or Tennant's Name"
                name="lastname"
                value={customerValues.lastname}
                onChange={handleCustomerChange("lastname")}
                inputProps={{ tabIndex: "1" }}
                autoFocus
                fullWidth
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="singleRowInput">
              <TextField
                label="Job Site Street Address"
                name="street"
                value={customerValues.street}
                onChange={handleCustomerChange("street")}
                inputProps={{ tabIndex: "2" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="Job Site City"
                name="city"
                value={customerValues.city}
                onChange={handleCustomerChange("city")}
                inputProps={{ tabIndex: "3" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site State"
                name="state"
                value={customerValues.state}
                onChange={handleCustomerChange("state")}
                inputProps={{ tabIndex: "4" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site Zip Code"
                name="zip"
                value={customerValues.zip}
                onChange={handleCustomerChange("zip")}
                inputProps={{ tabIndex: "5" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="singleRowInput">
              <TextField
                label="Job Site Contact Email"
                name="email"
                value={customerValues.email}
                onChange={handleCustomerChange("email")}
                inputProps={{ tabIndex: "6" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="Job Site Primary Contact"
                name="phoneName"
                value={customerValues.phoneName}
                onChange={handleCustomerChange("phoneName")}
                inputProps={{ tabIndex: "7" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site Alternate Contact"
                name="altPhoneName"
                value={customerValues.altPhoneName}
                onChange={handleCustomerChange("altPhoneName")}
                inputProps={{ tabIndex: "9" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site Other Contact"
                name="otherPhoneName"
                value={customerValues.otherPhoneName}
                onChange={handleCustomerChange("otherPhoneName")}
                inputProps={{ tabIndex: "11" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="Job Site Primary Phone"
                name="phone"
                value={customerValues.phone}
                onChange={handleCustomerChange("phone")}
                inputProps={{ tabIndex: "8" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site Alternate Phone"
                name="altphone"
                value={customerValues.altphone}
                onChange={handleCustomerChange("altphone")}
                inputProps={{ tabIndex: "10" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Job Site Other Phone"
                name="otherPhone"
                value={customerValues.otherPhone}
                onChange={handleCustomerChange("otherPhone")}
                inputProps={{ tabIndex: "12" }}
                fullWidth
              />
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row">
            <div className="doubleRowInput">
              <TextField
                label="First Name"
                name="firstname"
                value={customerValues.firstname}
                onChange={handleCustomerChange("firstname")}
                inputProps={{ tabIndex: "1" }}
                autoFocus
                fullWidth
              />
            </div>
            <div className="doubleRowInput">
              <TextField
                label="Last Name"
                name="lastname"
                value={customerValues.lastname}
                onChange={handleCustomerChange("lastname")}
                inputProps={{ tabIndex: "2" }}
                fullWidth
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="singleRowInput">
              <TextField
                label="Street Address"
                name="street"
                value={customerValues.street}
                onChange={handleCustomerChange("street")}
                inputProps={{ tabIndex: "3" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="City"
                name="city"
                value={customerValues.city}
                onChange={handleCustomerChange("city")}
                inputProps={{ tabIndex: "4" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="State"
                name="state"
                value={customerValues.state}
                onChange={handleCustomerChange("state")}
                inputProps={{ tabIndex: "5" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Zip Code"
                name="zip"
                value={customerValues.zip}
                onChange={handleCustomerChange("zip")}
                inputProps={{ tabIndex: "6" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="singleRowInput">
              <TextField
                label="Email"
                name="email"
                value={customerValues.email}
                onChange={handleCustomerChange("email")}
                inputProps={{ tabIndex: "7" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="Primary Phone Name"
                name="phoneName"
                value={customerValues.phoneName}
                onChange={handleCustomerChange("phoneName")}
                inputProps={{ tabIndex: "8" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Alternate Phone Name"
                name="altPhoneName"
                value={customerValues.altPhoneName}
                onChange={handleCustomerChange("altPhoneName")}
                inputProps={{ tabIndex: "10" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Other Phone Name"
                name="otherPhoneName"
                value={customerValues.otherPhoneName}
                onChange={handleCustomerChange("otherPhoneName")}
                inputProps={{ tabIndex: "12" }}
                fullWidth
              />
            </div>
          </div>
          <div className="row">
            <div className="tripleRowInput">
              <TextField
                label="Primary Phone Number"
                name="phone"
                value={customerValues.phone}
                onChange={handleCustomerChange("phone")}
                inputProps={{ tabIndex: "9" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Alternate Phone Number"
                name="altphone"
                value={customerValues.altphone}
                onChange={handleCustomerChange("altphone")}
                inputProps={{ tabIndex: "11" }}
                fullWidth
              />
            </div>
            <div className="tripleRowInput">
              <TextField
                label="Other Phone Number"
                name="otherPhone"
                value={customerValues.otherPhone}
                onChange={handleCustomerChange("otherPhone")}
                inputProps={{ tabIndex: "13" }}
                fullWidth
              />
            </div>
          </div>
        </div>
      )}
      <div className="buttonBar">
        <button className="standardButton" type="submit" tabIndex={14}>
          <PersonAdd /> <span className="iconSeperation">Add New Customer</span>
        </button>
        <button
          className="standardButton"
          type="button"
          onClick={() => closeModalOne()}
          tabIndex={15}
        >
          <Close /> <span className="iconSeperation">Close</span>
        </button>
      </div>
    </form>
  );
};

export default CreateCustomer;
