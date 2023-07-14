import { db, useSyncedCollection } from "../../../firebase/firestore.utils";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../global_style/style.css";
import {
  defaultBodyTableCell,
  getDefaultHeadTableCell,
  greenBodyTableCell,
  redBodyTableCell,
} from "../../../theme/Theme";
import {
  getDateFromString,
  getUnixFromDate,
} from "../../../utilities/dateUtils";
import { AddCircleOutline, Close } from "@mui/icons-material";
import { collection } from "firebase/firestore";

const CustomerEquipmentList = ({
  customer,
  openCustomerEquipmentDetails,
  openCreateCustomerEquipment,
  closeModalOne,
}) => {
  const equipment = useSyncedCollection(
    collection(db, "customers", customer.id, "Equipment")
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

  return (
    <div>
      <TableContainer sx={{ overflow: "auto", maxHeight: 440 }}>
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell align="left" sx={getDefaultHeadTableCell(0)}>
                Equipment Name
              </TableCell>
              <TableCell align="left" sx={getDefaultHeadTableCell(0)}>
                Brand
              </TableCell>
              <TableCell align="left" sx={getDefaultHeadTableCell(0)}>
                Model
              </TableCell>
              <TableCell align="left" sx={getDefaultHeadTableCell(0)}>
                Serial
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Maintenance Expiration
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Parts Expiration
              </TableCell>
              <TableCell align="center" sx={getDefaultHeadTableCell(0)}>
                Labor Expiration
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {equipment.map((unit, index) => (
              <TableRow
                key={index}
                onClick={() => openCustomerEquipmentDetails(unit)}
                sx={{ cursor: "pointer" }}
                hover
              >
                <TableCell align="left" sx={defaultBodyTableCell}>
                  {unit.equipmentName}
                </TableCell>
                <TableCell align="left" sx={defaultBodyTableCell}>
                  {unit.equipmentBrand}
                </TableCell>
                <TableCell align="left" sx={defaultBodyTableCell}>
                  {unit.equipmentModel}
                </TableCell>
                <TableCell align="left" sx={defaultBodyTableCell}>
                  {unit.equipmentSerial}
                </TableCell>
                {getStyledTableCell(unit.equipmentContract)}
                {getStyledTableCell(unit.equipmentWarranty)}
                {getStyledTableCell(unit.laborWarranty)}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <div className="buttonBar">
        <button
          type="button"
          className="standardButton"
          onClick={() => openCreateCustomerEquipment()}
        >
          <AddCircleOutline />
          <span className="iconSeperation">Add New Equipment</span>
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

export default CustomerEquipmentList;
