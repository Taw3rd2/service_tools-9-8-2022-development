import React, { useState } from "react";

import { useSyncedCollection } from "../../../firebase/firestore.utils";
import {
  submitNoteToFirestore,
  updateNoteToFirestore,
} from "../customerNoteFunctions";
import {
  getFormattedDate,
  getFormattedDateAndTime,
  getFormattedTime,
} from "../../../utilities/dateUtils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import {
  defaultRedButton,
  defaultTableButton,
  lightTheme,
} from "../../../theme/Theme";
import { ArrowUpward, Close, DeleteForever } from "@mui/icons-material";

const CustomerNote = ({
  customer,
  closeCustomerNote,
  selectedNote,
  openDeleteCustomerNote,
}) => {
  const dispatchers = useSyncedCollection("dispatchers");
  const [customerNoteValues, setCustomerNoteValues] = useState({
    currentTime:
      selectedNote !== undefined
        ? selectedNote.currentTime.toDate()
        : new Date(),
    details: selectedNote !== undefined ? selectedNote.details : "",
    operator: selectedNote !== undefined ? selectedNote.operator : "Thomas",
    type: selectedNote !== undefined ? selectedNote.type : "Note",
  });
  const handleNoteChange = (prop) => (event) => {
    setCustomerNoteValues({
      ...customerNoteValues,
      [prop]: event.target.value,
    });
  };

  const submitNote = (e) => {
    e.preventDefault();
    //if there is NO change to the
    //note type, operator, or details, return and close
    //if there is a change, update the date
    if (selectedNote !== undefined) {
      //Existing Note
      if (
        selectedNote.details === customerNoteValues.details &&
        selectedNote.operator === customerNoteValues.operator &&
        selectedNote.type === customerNoteValues.type
      ) {
        console.log("There is nothing to save..");
        closeCustomerNote();
      } else {
        console.log("Save this existing note with a new date");
        const updatedNote = {
          currentTime: new Date(),
          details: customerNoteValues.details,
          operator: customerNoteValues.operator,
          type: customerNoteValues.type,
        };
        updateNoteToFirestore(
          customer,
          selectedNote.id,
          updatedNote,
          closeCustomerNote
        );
      }
    } else {
      console.log("Savew this new note");
      submitNoteToFirestore(customer, customerNoteValues, closeCustomerNote);
    }
  };

  return (
    <form
      onSubmit={submitNote}
      autoComplete="new password"
      style={{ padding: "8px" }}
    >
      <Grid2 container spacing={2} sx={{ marginTop: "8px" }}>
        <Grid2 xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          {selectedNote !== undefined ? (
            <Typography variant="h5">
              {getFormattedDateAndTime(selectedNote.currentTime)}
            </Typography>
          ) : (
            <Typography variant="h5">
              {getFormattedDate(new Date())} {getFormattedTime(new Date())}
            </Typography>
          )}
        </Grid2>
        <Grid2 xs={6}>
          <FormControl fullWidth>
            <InputLabel
              id="select-note-type"
              sx={{ color: lightTheme.palette.primary.light }}
            >
              Note Type
            </InputLabel>
            <Select
              labelId="select-note-type"
              id="note_type"
              value={customerNoteValues.type}
              label="Note Type"
              onChange={handleNoteChange("type")}
            >
              <MenuItem key={0} value={"Phone"}>
                Phone
              </MenuItem>
              <MenuItem key={1} value={"Note"}>
                Note
              </MenuItem>
            </Select>
          </FormControl>
        </Grid2>
        <Grid2 xs={6}>
          {dispatchers.length > 0 && (
            <FormControl fullWidth>
              <InputLabel
                id="select-operator"
                sx={{ color: lightTheme.palette.primary.light }}
              >
                Operator
              </InputLabel>
              <Select
                labelId="select-operator"
                id="operator"
                value={customerNoteValues.operator}
                label="Operator"
                color="primary"
                onChange={handleNoteChange("operator")}
              >
                {dispatchers
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((dispatcher, index) => (
                    <MenuItem key={index} value={dispatcher.name}>
                      {dispatcher.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          )}
        </Grid2>
        <Grid2 xs={12}>
          <TextField
            label="Note Details"
            variant="outlined"
            value={customerNoteValues.details}
            fullWidth
            sx={{ input: { color: "primary" } }}
            onChange={handleNoteChange("details")}
            multiline={true}
            rows="5"
            required
          />
        </Grid2>
      </Grid2>
      <Grid2
        container
        alignItems="flex-start"
        justifyContent="flex-end"
        direction="row"
      >
        {selectedNote !== undefined && (
          <Button
            sx={defaultRedButton}
            color="primary"
            type="button"
            variant="outlined"
            onClick={() => openDeleteCustomerNote(selectedNote)}
            startIcon={<DeleteForever />}
          >
            Delete
          </Button>
        )}
        <Button
          sx={defaultTableButton}
          color="primary"
          type="submit"
          variant="outlined"
          startIcon={<ArrowUpward />}
        >
          Save
        </Button>
        <Button
          sx={defaultTableButton}
          color="primary"
          type="button"
          variant="outlined"
          onClick={() => closeCustomerNote()}
          startIcon={<Close />}
        >
          Close
        </Button>
      </Grid2>
    </form>
  );
};

export default CustomerNote;
