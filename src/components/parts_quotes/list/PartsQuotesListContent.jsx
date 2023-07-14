import React from "react";

import { db, useSyncedCollection } from "../../../firebase/firestore.utils";

import { getFormattedDate } from "../../../utilities/dateUtils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Table,
  TableContainer,
} from "@mui/material";
import { AddCircleOutline, Close } from "@mui/icons-material";

import {
  defaultTableButton,
  defaultBodyTableCell,
  getDefaultHeadTableCell,
} from "../../../theme/Theme";
import { collection } from "firebase/firestore";

const PartsQuotesListContent = ({
  customer,
  openPartQuoteDetails,
  openCreatePartsQuote,
  closeBasicModal,
}) => {
  const quoteList = useSyncedCollection(
    collection(db, "customers", customer.id, "partsQuotes")
  );
  return (
    <div style={{ padding: "8px" }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <TableContainer
            component={Paper}
            sx={{ overflow: "auto", maxHeight: 440, marginTop: "8px" }}
          >
            <Table
              stickyHeader
              size="small"
              aria-label="parts-quote-list-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Date Started
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Equipment
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Date Quoted
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Amount
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Accepted
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {quoteList.map((quote) => (
                  <TableRow
                    key={quote.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => openPartQuoteDetails(quote)}
                  >
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {getFormattedDate(quote.quoteDate)}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {quote.equipmentName}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {getFormattedDate(quote.quoteDate)}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      $$$
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {quote.accepted}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
          onClick={() => openCreatePartsQuote()}
        >
          Create New Parts Quote
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          sx={defaultTableButton}
          onClick={() => closeBasicModal()}
        >
          Close
        </Button>
      </Grid2>
    </div>
  );
};

export default PartsQuotesListContent;
