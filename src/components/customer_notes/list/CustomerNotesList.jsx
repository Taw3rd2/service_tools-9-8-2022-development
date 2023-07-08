import React, { useEffect, useState } from "react";

import { collection, getFirestore, onSnapshot } from "firebase/firestore";

import NoCustomerLoaded from "../../customer_information/views/NoCustomerLoaded.view";

import {
  getFormattedTime,
  getFormattedDate,
  getUnixFromDate,
} from "../../../utilities/dateUtils";

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
          border: "1px solid teal",
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
                    backgroundColor: "teal",
                    color: "white",
                  }}
                >
                  Operator
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    backgroundColor: "teal",
                    color: "white",
                  }}
                >
                  Type
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    backgroundColor: "teal",
                    color: "white",
                  }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="left"
                  sx={{
                    minWidth: "40px",
                    backgroundColor: "teal",
                    color: "white",
                  }}
                >
                  Time
                </TableCell>
                <TableCell
                  align="left"
                  sx={{ backgroundColor: "teal", color: "white" }}
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
                    hover
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
        <div className="buttonBar">
          {customer.id ? (
            <Button
              variant="outlined"
              startIcon={<NoteAdd />}
              onClick={() => openCreateCustomerNote()}
            >
              Add New Note
            </Button>
          ) : (
            <Button
              disabled
              variant="outlined"
              startIcon={<NoteAdd />}
              onClick={() => openCreateCustomerNote()}
            >
              Add New Note
            </Button>
          )}
        </div>
      </div>
    );
  }
};

export default CustomerNotesList;
