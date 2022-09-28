import React, { useContext, useState } from "react";
import { ToastContext } from "../../../context/toastContext";

import { updateMaintenance } from "../maintenanceFunctions";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { InputAdornment, TextField } from "@mui/material";
import { Close, DeleteForever, Update } from "@mui/icons-material";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const MaintenanceDetailsContent = ({
  customer,
  selectedMaintenance,
  openDeleteMaintenance,
  closeModalTwo,
}) => {
  const { dispatch } = useContext(ToastContext);
  const [salePrice, setSalePrice] = useState(
    selectedMaintenance.salePrice ? selectedMaintenance.salePrice : ""
  );
  const [saleDate, setSaleDate] = useState(
    selectedMaintenance.saleDate
      ? selectedMaintenance.saleDate.toDate()
      : new Date()
  );
  const [expirationDate, setExpirationDate] = useState(
    selectedMaintenance.expirationDate
      ? selectedMaintenance.expirationDate.toDate()
      : new Date()
  );
  const [completedDate, setCompletedDate] = useState(
    selectedMaintenance.completedDate === null
      ? null
      : selectedMaintenance.completedDate.toDate()
  );

  const onUpdateMaintenance = (e) => {
    e.preventDefault();
    const maintenanceValues = {
      key: selectedMaintenance.key,
      customerId: selectedMaintenance.customerId,
      customerLastName: selectedMaintenance.customerLastName,
      mNumber: selectedMaintenance.mNumber,
      salePrice,
      saleDate,
      expirationDate,
      completedDate,
      equipment: selectedMaintenance.equipment,
      equipmentName: selectedMaintenance.equipmentName,
      equipmentBrand: selectedMaintenance.equipmentBrand,
      equipmentModel: selectedMaintenance.equipmentModel,
      equipmentSerial: selectedMaintenance.equipmentSerial,
    };

    updateMaintenance(
      customer,
      maintenanceValues,
      activateSuccessNotification,
      activateFailureNotification,
      closeModalTwo
    );
  };

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Update Maintenance",
        message: "Maintenance updated in the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Update Mainteance",
        message: "There was an error updating",
      },
    });
  };

  return (
    <form onSubmit={onUpdateMaintenance} autoComplete="new password">
      <div className="row">
        <div className="doubleRowInput">
          <TextField
            label="Sale Price"
            variant="outlined"
            value={salePrice}
            fullWidth
            sx={{ input: { color: "primary" } }}
            onChange={(event) => setSalePrice(event.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            required
          />
        </div>
        <div className="doubleRowInput">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Sale Date"
              fullWidth
              value={saleDate}
              onChange={(newValue) => {
                setSaleDate(newValue);
              }}
              color="primary"
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "100%" }} />
              )}
              required
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Expiration Date"
              fullWidth
              value={expirationDate}
              onChange={(newValue) => {
                setExpirationDate(newValue);
              }}
              color="primary"
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "100%" }} />
              )}
              required
            />
          </LocalizationProvider>
        </div>
        <div className="doubleRowInput">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Date Completed"
              fullWidth
              value={completedDate}
              onChange={(newValue) => {
                setCompletedDate(newValue);
              }}
              color="primary"
              renderInput={(params) => (
                <TextField {...params} sx={{ width: "100%" }} />
              )}
            />
          </LocalizationProvider>
        </div>
      </div>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() => openDeleteMaintenance(selectedMaintenance)}
        >
          <DeleteForever />
          <span className="iconSeperation">Delete</span>
        </button>
        <button type="submit" className="standardButton">
          <Update />
          <span className="iconSeperation">Update</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeModalTwo()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </form>
  );
};

export default MaintenanceDetailsContent;
