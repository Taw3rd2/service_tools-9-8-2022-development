import React from "react";

import { useSyncedNestedCollection } from "../../../firebase/firestore.utils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  Paper,
  Table,
  TableHead,
  TableCell,
  TableBody,
  TableContainer,
  TableRow,
} from "@mui/material";

import { AddCircleOutline, Close } from "@mui/icons-material";

import {
  defaultTableButton,
  defaultBodyTableCell,
  getDefaultHeadTableCell,
  greenBodyTableCell,
  redBodyTableCell,
} from "../../../theme/Theme";
import {
  getFormattedDate,
  getDateFromString,
  getUnixFromDate,
} from "../../../utilities/dateUtils";

const MaintenanceListContent = ({
  customer,
  openMaintenanceDetails,
  openCreateMaintenance,
  closeBasicModal,
}) => {
  const maintenance = useSyncedNestedCollection(
    "customers",
    customer.id,
    "Maintenance"
  );

  const getStyledTableCell = (stringValue) => {
    const dateValue = getDateFromString(stringValue);
    if (getUnixFromDate(dateValue) < getUnixFromDate(new Date())) {
      return (
        <TableCell align="center" sx={redBodyTableCell}>
          {stringValue}
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" sx={greenBodyTableCell}>
          {stringValue}
        </TableCell>
      );
    }
  };

  const getCompletedTableCell = (stringValue) => {
    if (stringValue === "Not done yet") {
      return (
        <TableCell align="center" sx={redBodyTableCell}>
          <strong>{stringValue}</strong>
        </TableCell>
      );
    } else {
      return (
        <TableCell align="center" sx={greenBodyTableCell}>
          <strong>{stringValue}</strong>
        </TableCell>
      );
    }
  };

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
              aria-label="maintenance-list-table"
            >
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Contract Number
                  </TableCell>
                  <TableCell align="left" sx={getDefaultHeadTableCell(350)}>
                    Equipment Name
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Start Date
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Sale Price
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Expiration Date
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Maintenance Completed
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={getDefaultHeadTableCell("100px")}
                  >
                    Details
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {maintenance.map((maint) => (
                  <TableRow
                    key={maint.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      openMaintenanceDetails(maint);
                    }}
                  >
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {maint.mNumber}
                    </TableCell>
                    <TableCell align="left" sx={defaultBodyTableCell}>
                      {maint.equipmentName}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {getFormattedDate(maint.saleDate)}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {maint.salePrice}
                    </TableCell>
                    {getStyledTableCell(getFormattedDate(maint.expirationDate))}
                    {getCompletedTableCell(
                      getFormattedDate(maint.completedDate)
                    )}
                    <TableCell align="center">
                      <Button variant="outlined">Details</Button>
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
          onClick={() => openCreateMaintenance()}
        >
          Create New Maintenance
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

export default MaintenanceListContent;
