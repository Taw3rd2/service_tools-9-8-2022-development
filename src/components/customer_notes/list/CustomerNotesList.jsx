import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import NoCustomerLoaded from "../../customer_information/views/NoCustomerLoaded.view";

import {
  getFormattedTime,
  getFormattedDate,
  getUnixFromDate,
} from "../../../utilities/dateUtils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { NoteAdd } from "@mui/icons-material";
import { lightTheme } from "../../../theme/Theme";

const CustomerNotesList = ({
  customer,
  openCreateCustomerNote,
  openCustomerNoteDetails,
}) => {
  const setNoCustomerLoaded = () => {
    console.log("No Customer Loaded");
  };

  const db = getFirestore();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (customer === null || customer.id === "") {
      setNoCustomerLoaded();
    } else {
      setNotes([]);
      const unsubscribe = onSnapshot(
        collection(db, "customers", customer.id, "Activity"),
        (snapshot) => {
          setNotes(
            snapshot.docs.map((doc) => ({
              ...doc.data(),
              id: doc.id,
              sortingDate: getUnixFromDate(doc.data().currentTime.toDate()),
            }))
          );
        },
        (error) => {
          console.log(error.message);
        }
      );
      return () => unsubscribe();
    }
  }, [db, customer]);

  if (customer === null || customer.id === "") {
    return <NoCustomerLoaded />;
  } else {
    return (
      <div
        style={{
          flexGrow: 1,
          border: "1px solid black",
          backgroundColor: "lightgray",
          margin: "4px",
          padding: "8px",
        }}
      >
        {customer.firstname ? (
          <Typography variant="h5" gutterBottom color="primary">
            {customer.firstname} {customer.lastname} Notes
          </Typography>
        ) : (
          <Typography variant="h5" gutterBottom color="primary">
            {customer.lastname} Notes
          </Typography>
        )}
        <TableContainer
          component={Paper}
          sx={{ overflow: "auto", maxHeight: 275 }}
        >
          <Table stickyHeader size="small" aria-label="customer-notes-table">
            <TableHead>
              <TableRow>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    background: lightTheme.palette.primary.light,
                    color: lightTheme.palette.primary.contrastText,
                  }}
                >
                  Operator
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    background: lightTheme.palette.primary.light,
                    color: lightTheme.palette.primary.contrastText,
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    background: lightTheme.palette.primary.light,
                    color: lightTheme.palette.primary.contrastText,
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    background: lightTheme.palette.primary.light,
                    color: lightTheme.palette.primary.contrastText,
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    background: lightTheme.palette.primary.light,
                    color: lightTheme.palette.primary.contrastText,
                  }}
                >
                  Note
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {notes
                .sort((a, b) => (a.sortingDate < b.sortingDate ? 1 : -1))
                .map((note) => (
                  <TableRow
                    key={note.id}
                    onClick={() => openCustomerNoteDetails(note)}
                    sx={{ cursor: "pointer" }}
                  >
                    <TableCell align="left">{note.operator}</TableCell>
                    <TableCell align="left">{note.type}</TableCell>
                    <TableCell align="left">
                      {getFormattedDate(note.currentTime)}
                    </TableCell>
                    <TableCell align="left">
                      {getFormattedTime(note.currentTime)}
                    </TableCell>
                    <TableCell align="left">{note.details}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2
          container
          alignItems="flex-start"
          justifyContent="flex-end"
          direction="row"
        >
          {customer.id ? (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<NoteAdd />}
              sx={{
                marginTop: "16px",
                background: lightTheme.palette.primary.contrastText,
              }}
              onClick={() => openCreateCustomerNote({})}
            >
              Add New Note
            </Button>
          ) : (
            <Button
              variant="outlined"
              color="primary"
              startIcon={<NoteAdd />}
              sx={{
                marginTop: "16px",
                background: lightTheme.palette.primary.contrastText,
              }}
              disabled
            >
              Add New Note
            </Button>
          )}
        </Grid2>
      </div>
    );
  }
};

export default CustomerNotesList;
