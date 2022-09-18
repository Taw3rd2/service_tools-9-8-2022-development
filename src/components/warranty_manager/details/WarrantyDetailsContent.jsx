import React, { useState } from "react";

import { updateWarranty } from "../warrantyFunctions";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Button, TextField } from "@mui/material";
import { Close, DeleteForever, Update } from "@mui/icons-material";
import { getFormattedDate } from "../../../utilities/dateUtils";
import { defaultRedButton, defaultTableButton } from "../../../theme/Theme";

const WarrantyDetailsContent = ({
  customer,
  selectedWarranty,
  openDeleteWarranty,
  closeModalTwo,
}) => {
  const [jobNumber, setJobNumber] = useState(
    selectedWarranty ? selectedWarranty.jobNumber : ""
  );
  const [laborExpirationDate, setLaborExpirationDate] = useState(
    selectedWarranty.laborExpirationDate === null
      ? null
      : selectedWarranty.laborExpirationDate.toDate()
  );
  const [partsExpirationDate, setPartsExpirationDate] = useState(
    selectedWarranty
      ? selectedWarranty.partsExpirationDate.toDate()
      : new Date()
  );
  const [startDate, setStartDate] = useState(
    selectedWarranty ? selectedWarranty.startDate.toDate() : new Date()
  );

  const onWarrantyUpdate = (e) => {
    e.preventDefault();

    const warrantyValues = {
      key: selectedWarranty.equipmentName,
      equipmentWarranty: getFormattedDate(partsExpirationDate),
      laborWarranty: getFormattedDate(laborExpirationDate),
      warranty: {
        key: selectedWarranty.equipmentName,
        jobNumber,
        startDate,
        partsExpirationDate,
        laborExpirationDate,
        equipment: selectedWarranty.equipmentName,
        equipmentName: selectedWarranty.equipmentName,
        equipmentBrand: selectedWarranty.equipmentBrand,
        equipmentModel: selectedWarranty.equipmentModel,
        equipmentSerial: selectedWarranty.equipmentSerial,
      },
    };

    updateWarranty(customer, warrantyValues, closeModalTwo);
  };

  return (
    <form onSubmit={onWarrantyUpdate} autoComplete="new password">
      <Grid2 container spacing={2} sx={{ marginTop: "8px" }}>
        <Grid2 xs={6}>
          <TextField
            label="Job Number"
            variant="outlined"
            value={jobNumber}
            fullWidth
            sx={{ input: { color: "primary" } }}
            onChange={(event) => setJobNumber(event.target.value)}
          />
        </Grid2>
        <Grid2 xs={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Warranty Start Date"
              fullWidth
              value={startDate}
              onChange={(newValue) => {
                setStartDate(newValue);
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
              value={partsExpirationDate}
              onChange={(newValue) => {
                setPartsExpirationDate(newValue);
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
              value={laborExpirationDate}
              onChange={(newValue) => {
                setLaborExpirationDate(newValue);
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
          startIcon={<DeleteForever />}
          sx={defaultRedButton}
          onClick={() => openDeleteWarranty(selectedWarranty)}
        >
          Delete
        </Button>
        <Button
          sx={defaultTableButton}
          color="primary"
          type="submit"
          variant="outlined"
          startIcon={<Update />}
        >
          Update
        </Button>
        <Button
          sx={defaultTableButton}
          color="primary"
          variant="outlined"
          onClick={() => closeModalTwo()}
          startIcon={<Close />}
        >
          Close
        </Button>
      </Grid2>
    </form>
  );
};

export default WarrantyDetailsContent;
