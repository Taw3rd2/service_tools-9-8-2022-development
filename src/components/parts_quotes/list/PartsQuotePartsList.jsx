import { TableCell, TableRow, tableCellClasses } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import {
  toCurrency,
  toMarkUp,
  toRetailWithQuantity,
  toTax,
} from "../../../utilities/currencyUtils";
import { Add, Save } from "@mui/icons-material";
import BasicTable from "../../basic_components/BasicTable";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    fontSize: 18,
  },
}));

const PartsQuotePartsList = ({ quoteValues, openAddPartToList, saveQuote }) => {
  const tableHead = (
    <>
      <StyledTableCell align="left">Qty</StyledTableCell>
      <StyledTableCell align="left">Part number</StyledTableCell>
      <StyledTableCell align="left">Description</StyledTableCell>
      <StyledTableCell align="left">Vendor</StyledTableCell>
      <StyledTableCell align="left">Contact</StyledTableCell>
      <StyledTableCell align="left">Cost Each</StyledTableCell>
      <StyledTableCell align="left">Tax Each</StyledTableCell>
      <StyledTableCell align="left">Retail Each</StyledTableCell>
      <StyledTableCell align="left">Total</StyledTableCell>
    </>
  );

  const tableBody = (
    <>
      {quoteValues.partsList.length > 0 &&
        quoteValues.partsList
          .sort((a, b) => a.partNumber.localeCompare(b.partNumber))
          .map((part, index) => (
            <TableRow
              key={index}
              //onClick={() => openPartDetails(part)}
              sx={
                index % 2
                  ? {
                      background: "#d9d9d9",
                      cursor: "pointer",
                    }
                  : {
                      background: "white",
                      cursor: "pointer",
                    }
              }
            >
              <TableCell sx={{ width: 25 }} align="left">
                {part.quantity}
              </TableCell>
              <TableCell align="left">{part.partNumber}</TableCell>
              <TableCell align="left">{part.partDescription}</TableCell>
              <TableCell align="left">{part.partVendor}</TableCell>
              <TableCell align="left">{part.vendorContact}</TableCell>
              <TableCell align="left">{toCurrency(part.partCost)}</TableCell>
              <TableCell align="left">{toTax(part.partCost)}</TableCell>
              <TableCell align="left">{toMarkUp(part.partCost)}</TableCell>
              <TableCell align="left">
                {toRetailWithQuantity(part.partCost, part.quantity)}
              </TableCell>
            </TableRow>
          ))}
    </>
  );

  const additionalButtons = (
    <>
      <button
        type="button"
        className="standardButton"
        style={{ margin: "8px" }}
        onClick={() => saveQuote()}
      >
        <Save />
        <span className="iconSeperation">Save Quote</span>
      </button>
      <button
        type="button"
        className="standardButton"
        style={{ margin: "8px" }}
        onClick={() => openAddPartToList()}
      >
        <Add />
        <span className="iconSeperation">Add New Part</span>
      </button>
    </>
  );

  return (
    <BasicTable
      tableHead={tableHead}
      tableBody={tableBody}
      height={"237px"}
      additionalButtons={additionalButtons}
    />
  );
};

export default PartsQuotePartsList;
