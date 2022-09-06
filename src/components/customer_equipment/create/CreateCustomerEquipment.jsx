import React, { useState } from "react";

import { getFormattedDate } from "../../../utilities/dateUtils";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";
import { red } from "@mui/material/colors";

import EquipmentAddonCard from "../shared/EquipmentAddonCard";
import { doc, getFirestore } from "firebase/firestore";
import { createNamedDocument } from "../../../firebase/firestore.utils";

const CreateCustomerEquipment = ({ customer, closeBasicSecondModal }) => {
  const [equipmentValues, setEquipmentValues] = useState({
    equipmentName: "",
    equipmentInstallDate: null,
    equipmentBrand: "",
    equipmentModel: "",
    equipmentSerial: "",
    equipmentFuel: "",
    equipmentVoltage: "",
    equipmentEff: "",
    equipmentBtu: "",
  });

  const equipmentWarranty = "";
  const equipmentLabor = "";
  const equipmentContract = "";
  const equipmentNotes = "";
  const db = getFirestore();

  const submitNewEquipment = (e) => {
    e.preventDefault();
    const newEquipment = {
      customerId: customer.id,
      equipmentWarranty,
      equipmentLabor,
      equipmentContract,
      equipmentNotes,
      equipmentBrand: equipmentValues.equipmentBrand,
      equipmentBtu: equipmentValues.equipmentBtu,
      equipmentEff: equipmentValues.equipmentEff,
      equipmentFuel: equipmentValues.equipmentFuel,
      equipmentModel: equipmentValues.equipmentModel,
      equipmentName: equipmentValues.equipmentName,
      equipmentSerial: equipmentValues.equipmentSerial,
      equipmentVoltage: equipmentValues.equipmentVoltage,
    };
    const equipmentDocumentRef = doc(
      db,
      "customers",
      customer.id,
      "Equipment",
      equipmentValues.equipmentName
    );
    createNamedDocument(equipmentDocumentRef, newEquipment)
      .then(() => {
        closeBasicSecondModal();
      })
      .catch((error) => console.log("Firestore Error: ", error));
  };

  const handleEquipmentChange = (prop) => (event) => {
    setEquipmentValues({ ...equipmentValues, [prop]: event.target.value });
  };

  const handleInstallDateChange = (prop, value) => {
    setEquipmentValues({ ...equipmentValues, [prop]: value });
  };

  return (
    <div>
      <form onSubmit={submitNewEquipment} autoComplete="new password">
        <Grid2 container spacing={2}>
          <Grid2 xs={6}>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Name"
                value={equipmentValues.equipmentName}
                onChange={handleEquipmentChange("equipmentName")}
                inputProps={{ tabIndex: "1" }}
                fullWidth
                required
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Brand"
                value={equipmentValues.equipmentBrand}
                onChange={handleEquipmentChange("equipmentBrand")}
                inputProps={{ tabIndex: "2" }}
                fullWidth
                required
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Model"
                value={equipmentValues.equipmentModel}
                onChange={handleEquipmentChange("equipmentModel")}
                inputProps={{ tabIndex: "3" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Serial"
                value={equipmentValues.equipmentSerial}
                onChange={handleEquipmentChange("equipmentSerial")}
                inputProps={{ tabIndex: "4" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Size"
                value={equipmentValues.equipmentBtu}
                onChange={handleEquipmentChange("equipmentBtu")}
                inputProps={{ tabIndex: "5" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Efficiency"
                value={equipmentValues.equipmentEff}
                onChange={handleEquipmentChange("equipmentEff")}
                inputProps={{ tabIndex: "6" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Fuel or Freon Type"
                value={equipmentValues.equipmentFuel}
                onChange={handleEquipmentChange("equipmentFuel")}
                inputProps={{ tabIndex: "7" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <TextField
                label="Equipment Voltage"
                value={equipmentValues.equipmentVoltage}
                onChange={handleEquipmentChange("equipmentVoltage")}
                inputProps={{ tabIndex: "8" }}
                fullWidth
              />
            </Grid2>
            <Grid2 xs={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Equipment Installation Date"
                  fullWidth
                  value={equipmentValues.equipmentInstallDate}
                  onChange={(newValue) => {
                    handleInstallDateChange("equipmentInstallDate", newValue);
                  }}
                  color="primary"
                  renderInput={(params) => (
                    <TextField {...params} sx={{ width: "100%" }} />
                  )}
                  inputProps={{ tabIndex: "9" }}
                />
              </LocalizationProvider>
            </Grid2>
          </Grid2>
          <Grid2 xs={6}>
            <Card sx={{ maxWidth: 345, marginTop: "8px" }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="new equipment">
                    {equipmentValues.equipmentName.length < 1
                      ? ""
                      : Array.from(equipmentValues.equipmentName)[0]}
                  </Avatar>
                }
                title={equipmentValues.equipmentName}
                subheader={
                  equipmentValues.equipmentInstallDate
                    ? getFormattedDate(equipmentValues.equipmentInstallDate)
                    : "No Install Date Entered"
                }
              />
              <Typography
                variant="h5"
                color="primary"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                {equipmentValues.equipmentBrand}
              </Typography>
              <CardContent>
                <Typography variant="caption" color="primary">
                  Model Number
                </Typography>
                <Typography variant="h6">
                  {equipmentValues.equipmentModel}
                </Typography>

                <Typography variant="caption" color="primary">
                  Serial Number
                </Typography>
                <Typography variant="h6">
                  {equipmentValues.equipmentSerial}
                </Typography>

                <Grid2 container spacing={1}>
                  <Grid2 xs={12}>
                    <Typography
                      variant="body2"
                      color="primary"
                      sx={{ display: "flex", justifyContent: "center" }}
                    >
                      Additional Information
                    </Typography>
                  </Grid2>
                  <Grid2 xs={6}>
                    <EquipmentAddonCard
                      cardName="Fuel / Freon Type"
                      cardValue={equipmentValues.equipmentFuel}
                    />
                  </Grid2>
                  <Grid2 xs={6}>
                    <EquipmentAddonCard
                      cardName="Voltage"
                      cardValue={equipmentValues.equipmentVoltage}
                    />
                  </Grid2>
                  <Grid2 xs={6}>
                    <EquipmentAddonCard
                      cardName="Efficiency"
                      cardValue={equipmentValues.equipmentEff}
                    />
                  </Grid2>
                  <Grid2 xs={6}>
                    <EquipmentAddonCard
                      cardName="Size"
                      cardValue={equipmentValues.equipmentBtu}
                    />
                  </Grid2>
                </Grid2>
              </CardContent>
            </Card>
          </Grid2>
        </Grid2>
        <Grid2
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
          sx={{ marginTop: "24px" }}
        >
          <Button
            sx={{ margin: "8px" }}
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<ArrowUpward />}
            type="submit"
            tabIndex={10}
          >
            Create
          </Button>
          <Button
            sx={{ margin: "8px" }}
            size="large"
            variant="outlined"
            color="primary"
            startIcon={<Close />}
            onClick={() => closeBasicSecondModal()}
            tabIndex={11}
          >
            Cancel
          </Button>
        </Grid2>
      </form>
    </div>
  );
};

export default CreateCustomerEquipment;
