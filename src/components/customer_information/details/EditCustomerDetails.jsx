import { useContext, useState } from "react";
import { ToastContext } from "../../../context/toastContext";
import { updateCustomer } from "../customerInformationFunctions";
import { ArrowUpward, Close, DeleteForever } from "@mui/icons-material";
import { Checkbox, TextField } from "@mui/material";

import "../../../global_style/style.css";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const EditCustomerDetails = ({
  customer,
  openDeleteCustomer,
  closeModalOne,
}) => {
  const { dispatch } = useContext(ToastContext);

  const [lastNameError, setLastNameError] = useState(false);
  const [customerValues, setCustomerValues] = useState({
    billingiscommercial: customer.billingiscommercial
      ? customer.billingiscommercial
      : false,
    noService: customer.noService ? customer.noService : false,
    firstname: customer.firstname ? customer.firstname : "",
    lastname: customer.lastname ? customer.lastname : "",
    street: customer.street ? customer.street : "",
    city: customer.city ? customer.city : "",
    state: customer.state ? customer.state : "",
    zip: customer.zip ? customer.zip : "",
    phoneName: customer.phoneName ? customer.phoneName : "",
    altPhoneName: customer.altPhoneName ? customer.altPhoneName : "",
    otherPhoneName: customer.otherPhoneName ? customer.otherPhoneName : "",
    phone: customer.phone ? customer.phone : "",
    altphone: customer.altphone ? customer.altphone : "",
    otherPhone: customer.otherPhone ? customer.otherPhone : "",
    email: customer.email ? customer.email : "",
  });

  const handleValueChange = (name) => (event) => {
    setCustomerValues({
      ...customerValues,
      [name]: event.target.value,
    });
  };

  const handleCheckChange = (name) => (event) => {
    setCustomerValues({
      ...customerValues,
      [name]: event.target.checked,
    });
  };

  const submitUpdate = (event) => {
    event.preventDefault();
    if (customerValues.lastname === "") {
      setLastNameError(true);
      return;
    } else {
      setLastNameError(false);
      updateCustomer(
        customer,
        customerValues,
        activateUpdateSuccessNotification,
        activateUpdateFailureNotification,
        closeModalOne
      );
    }
  };

  const activateUpdateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Update Customer Information",
        message: "Customer information updated in the cloud",
      },
    });
  };

  const activateUpdateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Update Customer Information",
        message: "There was an error updating",
      },
    });
  };

  return (
    <form onSubmit={submitUpdate} autoComplete="new-password">
      <div className="row">
        <div className="doubleRowInput">
          <h3>
            Commercial:
            <Checkbox
              name="billingiscommercial"
              color="primary"
              checked={customerValues.billingiscommercial}
              onChange={handleCheckChange("billingiscommercial")}
            />
          </h3>
        </div>
        <div className="doubleRowInput">
          <h3>
            No Service:
            <Checkbox
              name="noService"
              color="primary"
              checked={customerValues.noService}
              onChange={handleCheckChange("noService")}
            />
          </h3>
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            value={customerValues.firstname}
            label="First Name"
            fullWidth
            autoFocus
            onChange={handleValueChange("firstname")}
            inputProps={{ tabIndex: "1" }}
          />
        </div>
        {lastNameError ? (
          <div className="doubleRowInput">
            <TextField
              error
              value={customerValues.lastname}
              label="Last Name"
              fullWidth
              required
              onChange={handleValueChange("lastname")}
              inputProps={{ tabIndex: "2" }}
            />
          </div>
        ) : (
          <div className="doubleRowInput">
            <TextField
              value={customerValues.lastname}
              label="Last Name"
              required
              fullWidth
              onChange={handleValueChange("lastname")}
              inputProps={{ tabIndex: "2" }}
            />
          </div>
        )}
      </div>
      <div className="row">
        <div className="singleRowInput">
          <TextField
            value={customerValues.street}
            label="Street Address"
            fullWidth
            onChange={handleValueChange("street")}
            inputProps={{ tabIndex: "3" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.city}
            label="City"
            fullWidth
            onChange={handleValueChange("city")}
            inputProps={{ tabIndex: "4" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.state}
            label="State"
            fullWidth
            onChange={handleValueChange("state")}
            inputProps={{ tabIndex: "5" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.zip}
            label="Zip"
            fullWidth
            onChange={handleValueChange("zip")}
            inputProps={{ tabIndex: "6" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.phoneName}
            label="Primary Contact Name"
            fullWidth
            onChange={handleValueChange("phoneName")}
            inputProps={{ tabIndex: "7" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.altPhoneName}
            label="Secondary Contact Name"
            fullWidth
            onChange={handleValueChange("altPhoneName")}
            inputProps={{ tabIndex: "9" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.otherPhoneName}
            label="Other Contact Name"
            fullWidth
            onChange={handleValueChange("otherPhoneName")}
            inputProps={{ tabIndex: "11" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            value={customerValues.phone}
            label="Primary Phone Number"
            fullWidth
            onChange={handleValueChange("phone")}
            inputProps={{ tabIndex: "8" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.altphone}
            label="Secondary Phone Number"
            fullWidth
            onChange={handleValueChange("altphone")}
            inputProps={{ tabIndex: "10" }}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            value={customerValues.otherPhone}
            label="Other Phone Number"
            fullWidth
            onChange={handleValueChange("otherPhone")}
            inputProps={{ tabIndex: "12" }}
          />
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <TextField
            value={customerValues.email}
            label="Email Address"
            fullWidth
            onChange={handleValueChange("email")}
            inputProps={{ tabIndex: "13" }}
          />
        </div>
      </div>
      <div className="buttonBar">
        <button
          className="deleteButton"
          type="button"
          onClick={() => openDeleteCustomer()}
          tabIndex={13}
        >
          <DeleteForever />
          <span className="iconSeperation">Delete Customer</span>
        </button>
        <button className="standardButton" type="submit" tabIndex={14}>
          <ArrowUpward />
          <span className="iconSeperation">Save Changes</span>
        </button>
        <button
          className="standardButton"
          type="button"
          onClick={() => closeModalOne()}
          tabIndex={15}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </form>
  );
};

export default EditCustomerDetails;
