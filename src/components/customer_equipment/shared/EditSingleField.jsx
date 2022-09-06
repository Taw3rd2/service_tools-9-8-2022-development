import React, { useState } from "react";

import { doc, getFirestore, updateDoc } from "firebase/firestore";

import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";

import { Button, TextField } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { ArrowUpward, Close } from "@mui/icons-material";

const EditSingleField = ({
  customerId,
  equipmentId,
  fieldName,
  fieldKey,
  fieldValue,
  closeEditSingleField,
}) => {
  const defaultFieldValue =
    fieldKey === "equipmentInstallDate" ? new Date() : "";

  const [val, setVal] = useState(fieldValue ? fieldValue : defaultFieldValue);

  const handleDateChange = (value) => {
    setVal(value);
  };

  const submitToFirestore = async (event) => {
    event.preventDefault();

    const db = getFirestore();
    const documentReference = doc(
      db,
      "customers",
      customerId,
      "Equipment",
      equipmentId
    );

    await updateDoc(documentReference, { [fieldKey]: val })
      .then(() => {
        closeEditSingleField();
      })
      .catch((error) => {
        console.log("Firebase error: ", error);
      });
  };

  return (
    <form
      onSubmit={submitToFirestore}
      autoComplete="new password"
      style={{ padding: "16px" }}
    >
      {fieldKey === "equipmentInstallDate" ? (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label={fieldName}
            fullWidth
            value={val}
            onChange={(newValue) => {
              handleDateChange(newValue);
            }}
            color="primary"
            required
            renderInput={(params) => (
              <TextField {...params} sx={{ width: "100%" }} />
            )}
          />
        </LocalizationProvider>
      ) : (
        <TextField
          value={val}
          label={fieldName}
          fullWidth
          required
          onChange={(e) => setVal(e.target.value)}
        />
      )}

      <Grid2
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
        sx={{ marginTop: "24px" }}
      >
        <Button
          sx={{ marginLeft: "8px" }}
          type="submit"
          size="medium"
          variant="outlined"
          color="primary"
          startIcon={<ArrowUpward />}
        >
          Update
        </Button>
        <Button
          sx={{ marginLeft: "8px" }}
          size="medium"
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          onClick={() => closeEditSingleField()}
        >
          Close
        </Button>
      </Grid2>
    </form>
  );
};

export default EditSingleField;