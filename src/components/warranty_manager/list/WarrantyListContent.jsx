import React from "react";

import { useSyncedNestedCollection } from "../../../firebase/firestore.utils";

import {
  getDateFromString,
  getUnixFromDate,
  getWarrantyFormattedDate,
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
} from "@mui/material";
import {
  defaultBodyTableCell,
  defaultTableButton,
  getDefaultHeadTableCell,
  greenBodyTableCell,
  redBodyTableCell,
} from "../../../theme/Theme";
import { AddCircleOutline, Close } from "@mui/icons-material";

const WarrantyListContent = ({
  customer,
  openWarrantyDetails,
  openCreateWarranty,
  closeBasicModal,
}) => {
  const equipment = useSyncedNestedCollection(
    "customers",
    customer.id,
    "Equipment"
  );

  const newWarranties = [];

  equipment.forEach((unit) => {
    let warr = {
      key: "",
      equipment: "",
      equipmentName: "",
      equipmentBrand: "",
      equipmentModel: "",
      equipmentSerial: "",
      jobNumber: "",
      startDate: "",
      partsExpirationDate: "",
      laborExpirationDate: "",
    };

    if (typeof unit.warranty != "undefined") {
      warr.id = unit.id;
      warr.key = unit.warranty.key;
      warr.equipment = unit.warranty.equipment;
      warr.equipmentBrand = unit.warranty.equipmentBrand;
      warr.equipmentModel = unit.warranty.equipmentModel;
      warr.equipmentSerial = unit.warranty.equipmentSerial;
      warr.equipmentName = unit.warranty.equipmentName;
      warr.jobNumber = unit.warranty.jobNumber;
      warr.startDate = unit.warranty.startDate;
      warr.partsExpirationDate = unit.warranty.partsExpirationDate;
      warr.laborExpirationDate = unit.warranty.laborExpirationDate;
      newWarranties.push(warr);
    }
  });

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

  return (
    <div style={{ padding: "8px" }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <TableContainer
            component={Paper}
            sx={{ overflow: "auto", maxHeight: 440, marginTop: "8px" }}
          >
            <Table stickyHeader size="small" aria-label="warranty-list-table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Job Number
                  </TableCell>
                  <TableCell align="left" sx={getDefaultHeadTableCell(350)}>
                    Equipment
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Start Date
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Parts Expiration
                  </TableCell>
                  <TableCell align="center" sx={getDefaultHeadTableCell(150)}>
                    Labor Expiration
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
                {newWarranties.map((warranty) => (
                  <TableRow
                    key={warranty.id}
                    sx={{ cursor: "pointer" }}
                    onClick={() => openWarrantyDetails(warranty)}
                  >
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {warranty.jobNumber}
                    </TableCell>
                    <TableCell align="left" sx={defaultBodyTableCell}>
                      {warranty.equipmentName}
                    </TableCell>
                    <TableCell align="center" sx={defaultBodyTableCell}>
                      {getWarrantyFormattedDate(warranty.startDate)}
                    </TableCell>
                    {getStyledTableCell(
                      getWarrantyFormattedDate(warranty.partsExpirationDate)
                    )}
                    {getStyledTableCell(
                      getWarrantyFormattedDate(warranty.laborExpirationDate)
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
          onClick={() => openCreateWarranty()}
        >
          Add New Warranty
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

export default WarrantyListContent;
