import React, { useContext, useState } from "react";
import { ToastContext } from "../../../context/toastContext";

import { useSyncedNestedCollection } from "../../../firebase/firestore.utils";

import { addMaintenance } from "../maintenanceFunctions";

import EquipmentPicker from "../../equipment_picker/EquipmentPicker";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { Close, AddCircleOutline } from "@mui/icons-material";
import { defaultTableButton } from "../../../theme/Theme";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const CreateMaintenanceContent = ({ customer, closeModalTwo }) => {
  const { dispatch } = useContext(ToastContext);

  const equipment = useSyncedNestedCollection(
    "customers",
    customer.id,
    "Equipment"
  );
  const [selectedEquipment, setSelectedEquipment] = useState([]);
  const [equipmentError, setEquipmentError] = useState(false);

  const handleCheckChange = (name) => (event) => {
    setSelectedEquipment({
      ...selectedEquipment,
      [name]: event.target.checked,
    });
  };

  const todaysDate = new Date();
  const defaultExpirationDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );

  const [maintenanceValues, setMaintenanceValues] = useState({
    mNumber: "",
    salePrice: "",
    saleDate: todaysDate,
    expirationDate: defaultExpirationDate,
  });

  const handleMaintenanceChange = (prop) => (event) => {
    setMaintenanceValues({ ...maintenanceValues, [prop]: event.target.value });
  };

  const handleMaintenanceDateChange = (prop, value) => {
    setMaintenanceValues({ ...maintenanceValues, [prop]: value });
  };

  const submitNewMaintenance = (e) => {
    e.preventDefault();

    if (selectedEquipment === undefined || selectedEquipment.length === 0) {
      console.log("No equipment was selected to apply a maintenance");
      setEquipmentError(true);
    } else {
      setEquipmentError(false);
      addMaintenance(
        customer,
        selectedEquipment,
        maintenanceValues,
        equipment,
        activateSuccessNotification,
        activateFailureNotification,
        closeModalTwo
      );
    }
  };

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Create Maintenance",
        message: "Equipment maintenance added to the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Create Maintenance",
        message: "There was an error creating",
      },
    });
  };

  return (
    <div>
      <EquipmentPicker
        equipment={equipment}
        selectedEquipment={selectedEquipment}
        handleCheckChange={handleCheckChange}
      />
      <form autoComplete="new password" onSubmit={submitNewMaintenance}>
        <Grid2 container spacing={2} sx={{ marginTop: "8px" }}>
          <Grid2 xs={6}>
            <TextField
              label="M-Number"
              variant="outlined"
              value={maintenanceValues.mNumber}
              fullWidth
              sx={{ input: { color: "primary" } }}
              onChange={handleMaintenanceChange("mNumber")}
              required
            />
          </Grid2>
          <Grid2 xs={6}>
            <TextField
              label="Sale Price"
              variant="outlined"
              value={maintenanceValues.salePrice}
              fullWidth
              sx={{ input: { color: "primary" } }}
              onChange={handleMaintenanceChange("salePrice")}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              required
            />
          </Grid2>
          <Grid2 xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Sale Date"
                fullWidth
                value={maintenanceValues.saleDate}
                onChange={(newValue) => {
                  handleMaintenanceDateChange("saleDate", newValue);
                }}
                color="primary"
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </Grid2>
          <Grid2 xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Expiration Date"
                fullWidth
                value={maintenanceValues.expirationDate}
                onChange={(newValue) => {
                  handleMaintenanceDateChange("expirationDate", newValue);
                }}
                color="primary"
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </Grid2>
        </Grid2>
        <Grid2
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          <Button
            variant="outlined"
            color="primary"
            startIcon={<AddCircleOutline />}
            sx={defaultTableButton}
            type="submit"
          >
            Submit New Maintenance
          </Button>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Close />}
            sx={defaultTableButton}
            onClick={() => closeModalTwo()}
          >
            Close
          </Button>
        </Grid2>
        {equipmentError && (
          <Grid2 container spacing={2}>
            <Grid2 xs={12}>
              <Typography
                variant="subtitle1"
                gutterBottom
                sx={{ color: "red" }}
              >
                Please select the equipment you want attached to the maintenance
                then submit...
              </Typography>
            </Grid2>
          </Grid2>
        )}
      </form>
    </div>
  );
};

export default CreateMaintenanceContent;
