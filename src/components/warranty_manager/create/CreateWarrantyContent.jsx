import React, { useState } from "react";

import { useSyncedNestedCollection } from "../../../firebase/firestore.utils";
import { addWarranty } from "../warrantyFunctions";

import EquipmentPicker from "../../equipment_picker/EquipmentPicker";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, TextField, Typography } from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const CreateWarrantyContent = ({ customer, closeModalTwo }) => {
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
  const defaultLaborWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 1)
  );
  const defaultPartsWarrantyExpiration = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  );

  const [warrantyValues, setWarrantyValues] = useState({
    jobNumber: "",
    startDate: todaysDate,
    partsExpirationDate: defaultPartsWarrantyExpiration,
    laborExpirationDate: defaultLaborWarrantyExpiration,
  });

  const handleWarrantyChange = (prop) => (event) => {
    setWarrantyValues({ ...warrantyValues, [prop]: event.target.value });
  };

  const handleWarrantyDateChange = (prop, value) => {
    setWarrantyValues({ ...warrantyValues, [prop]: value });
  };

  const submitNewWarranty = (e) => {
    e.preventDefault();

    if (selectedEquipment === undefined || selectedEquipment.length === 0) {
      console.log("No equipment was selected to apply a warranty");
      setEquipmentError(true);
    } else {
      setEquipmentError(false);
      addWarranty(
        customer,
        selectedEquipment,
        warrantyValues,
        equipment,
        closeModalTwo
      );
    }
  };

  return (
    <div>
      <EquipmentPicker
        equipment={equipment}
        selectedEquipment={selectedEquipment}
        handleCheckChange={handleCheckChange}
      />
      <form autoComplete="new password" onSubmit={submitNewWarranty}>
        <Grid2 container spacing={2} sx={{ marginTop: "8px" }}>
          <Grid2 xs={6}>
            <TextField
              label="Job Number"
              variant="outlined"
              value={warrantyValues.jobNumber}
              fullWidth
              sx={{ input: { color: "primary" } }}
              onChange={handleWarrantyChange("jobNumber")}
            />
          </Grid2>
          <Grid2 xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Start Date"
                fullWidth
                value={warrantyValues.startDate}
                onChange={(newValue) => {
                  handleWarrantyDateChange("startDate", newValue);
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
                label="Parts Expiration Date"
                fullWidth
                value={warrantyValues.partsExpirationDate}
                onChange={(newValue) => {
                  handleWarrantyDateChange("partsExpirationDate", newValue);
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
                label="Labor Expiration Date"
                fullWidth
                value={warrantyValues.laborExpirationDate}
                onChange={(newValue) => {
                  handleWarrantyDateChange("laborExpirationDate", newValue);
                }}
                color="primary"
                renderInput={(params) => (
                  <TextField {...params} sx={{ width: "100%" }} />
                )}
              />
            </LocalizationProvider>
          </Grid2>
        </Grid2>
        {equipment.length === 0 ? (
          <Grid2
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
            sx={{ marginTop: "24px" }}
          >
            <Button
              sx={{
                marginLeft: "8px",
              }}
              color="primary"
              type="button"
              variant="outlined"
              onClick={() => closeModalTwo()}
              startIcon={<Close />}
            >
              Close
            </Button>
          </Grid2>
        ) : (
          <Grid2
            container
            alignItems="flex-start"
            justifyContent="flex-end"
            direction="row"
            sx={{ marginTop: "24px" }}
          >
            <Button
              sx={{
                marginLeft: "8px",
              }}
              color="primary"
              type="submit"
              variant="outlined"
              startIcon={<AddCircleOutline />}
            >
              Submit
            </Button>
            <Button
              sx={{
                marginLeft: "8px",
              }}
              color="primary"
              type="button"
              variant="outlined"
              onClick={() => closeModalTwo()}
              startIcon={<Close />}
            >
              Close
            </Button>
          </Grid2>
        )}
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

export default CreateWarrantyContent;
