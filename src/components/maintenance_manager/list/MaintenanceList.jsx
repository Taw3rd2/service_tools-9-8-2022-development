import { AddCircleOutline, Close } from "@mui/icons-material";
import { useSyncedNestedCollection } from "../../../firebase/firestore.utils";
import {
  getDateFromString,
  getFormattedDate,
  getUnixFromDate,
} from "../../../utilities/dateUtils";

import "../../../global_style/style.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  defaultBodyTableCell,
  getDefaultHeadTableCell,
  greenBodyTableCell,
  redBodyTableCell,
} from "../../../theme/Theme";

const MaintenanceList = ({
  customer,
  openMaintenanceDetails,
  openCreateMaintenance,
  closeModalOne,
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
    <div>
      <TableContainer sx={{ overflow: "auto", maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Contract Number
              </TableCell>
              <TableCell align="left" sx={getDefaultHeadTableCell(0)}>
                Equipment Name
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Start Date
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Sale Price
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Expiration Date
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Maintenance Completed
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
                {getCompletedTableCell(getFormattedDate(maint.completedDate))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="buttonBar">
        <button
          type="button"
          className="standardButton"
          onClick={() => openCreateMaintenance()}
        >
          <AddCircleOutline />
          <span className="iconSeperation">Create New Maintenance</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeModalOne()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default MaintenanceList;
