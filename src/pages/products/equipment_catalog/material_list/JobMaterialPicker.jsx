import { useState } from "react";
import { db, useSyncedCollection } from "../../../../firebase/firestore.utils";
import BasicTable from "../../../../components/basic_components/BasicTable";
import { Checkbox, TableCell, tableCellClasses, TableRow } from "@mui/material";
import { styled } from "@mui/material/styles";
import "../../../../global_style/style.css";
import { toCurrency } from "../../../../utilities/currencyUtils";
import { ArrowUpward, Close } from "@mui/icons-material";
import BasicSearchBar from "../../../../components/basic_components/BasicSearchBar";
import BasicDisabledSearchBar from "../../../../components/basic_components/BasicDisabledSearchBar";
import { collection } from "firebase/firestore";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.primary.main,
    fontSize: 18,
  },
}));

const JobMaterialPicker = ({ material, setMaterial, closeModalTwo }) => {
  const parts = useSyncedCollection(collection(db, "parts"));

  //set a place to activate and deactivate the search bar
  const [activeSearchBar, setActiveSearchBar] = useState(true);

  //Search Bar
  const [selectedParts, setSelectedParts] = useState([]);
  const [searchableParts, setSerchableParts] = useState(parts);
  const [query, setQuery] = useState("");
  const partsCatalogSearch = async (queryInput) => {
    const filteredParts = parts.filter((part) => {
      return (
        part.partNumber.toLowerCase().includes(queryInput.toLowerCase()) ||
        part.partDescription.toLowerCase().includes(queryInput.toLowerCase()) ||
        part.crossReference.some((el) =>
          el.partNumber.toLowerCase().includes(queryInput.toLowerCase())
        )
      );
    });
    setQuery(queryInput);
    setSerchableParts(filteredParts);
  };

  const clearSearchQuery = () => {
    setQuery("");
    setSerchableParts(parts);
  };

  const handleCheckChange = (name) => (event) => {
    setActiveSearchBar(false);
    setSelectedParts({
      ...selectedParts,
      [name]: event.target.checked,
    });
  };

  const addSelectedPartsToMaterialList = () => {
    if (selectedParts.length < 1) {
      closeModalTwo();
    } else {
      const newArr = material;
      if (searchableParts.length > 0) {
        Object.keys(selectedParts).forEach((item) => {
          let partToBeAdded = {
            category: searchableParts[item].category,
            crossReference: searchableParts[item].crossReference,
            partCost: searchableParts[item].partCost,
            partDataDate: searchableParts[item].partDataDate,
            partDataServicer: searchableParts[item].partDataServicer,
            partDescription: searchableParts[item].partDescription,
            partLabor: searchableParts[item].partLabor,
            partNotes: searchableParts[item].partNotes,
            partNumber: searchableParts[item].partNumber,
            partVendor: searchableParts[item].partVendor,
            quantity: searchableParts[item].quantity,
            url: searchableParts[item].url,
          };
          newArr.push(partToBeAdded);
        });
      } else {
        Object.keys(selectedParts).forEach((item) => {
          let partToBeAdded = {
            category: parts[item].category,
            crossReference: parts[item].crossReference,
            partCost: parts[item].partCost,
            partDataDate: parts[item].partDataDate,
            partDataServicer: parts[item].partDataServicer,
            partDescription: parts[item].partDescription,
            partLabor: parts[item].partLabor,
            partNotes: parts[item].partNotes,
            partNumber: parts[item].partNumber,
            partVendor: parts[item].partVendor,
            quantity: parts[item].quantity,
            url: parts[item].url,
          };
          newArr.push(partToBeAdded);
        });
      }
      setMaterial(newArr);
    }
    closeModalTwo();
  };

  const tableHead = (
    <>
      <StyledTableCell align="left">#</StyledTableCell>
      <StyledTableCell align="left">Part number</StyledTableCell>
      <StyledTableCell align="left">Description</StyledTableCell>
      <StyledTableCell align="left">Hi Temp Cost</StyledTableCell>
      <StyledTableCell align="left">Vendor</StyledTableCell>
      <StyledTableCell align="left">Add?</StyledTableCell>
    </>
  );

  const searchBody = (
    <>
      {searchableParts.length > 0 &&
        searchableParts
          .sort((a, b) => a.partNumber.localeCompare(b.partNumber))
          .map((part, index) => (
            <TableRow
              key={index}
              sx={
                index % 2
                  ? {
                      background: "#e8eded",
                      cursor: "pointer",
                    }
                  : {
                      background: "white",
                      cursor: "pointer",
                    }
              }
              onClick={handleCheckChange(index)}
            >
              <TableCell sx={{ width: 25 }} align="left">
                {index + 1}
              </TableCell>
              <TableCell align="left">{part.partNumber}</TableCell>
              <TableCell align="left">{part.partDescription}</TableCell>
              <TableCell align="left">
                {toCurrency(part.partCost / 100)}
              </TableCell>
              <TableCell align="left">{part.partVendor}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={selectedParts.index}
                  value={index}
                  onChange={handleCheckChange(index)}
                />
              </TableCell>
            </TableRow>
          ))}
    </>
  );

  const emptySearchBody = (
    <>
      {parts.length > 0 &&
        parts
          .sort((a, b) => a.partNumber.localeCompare(b.partNumber))
          .map((part, index) => (
            <TableRow
              key={index}
              sx={
                index % 2
                  ? {
                      background: "#e8eded",
                      cursor: "pointer",
                    }
                  : {
                      background: "white",
                      cursor: "pointer",
                    }
              }
              onClick={handleCheckChange(index)}
            >
              <TableCell sx={{ width: 25 }} align="left">
                {index + 1}
              </TableCell>
              <TableCell align="left">{part.partNumber}</TableCell>
              <TableCell align="left">{part.partDescription}</TableCell>
              <TableCell align="left">
                {toCurrency(part.partCost / 100)}
              </TableCell>
              <TableCell align="left">{part.partVendor}</TableCell>
              <TableCell align="center">
                <Checkbox
                  checked={selectedParts.index}
                  value={index}
                  onChange={handleCheckChange(index)}
                />
              </TableCell>
            </TableRow>
          ))}
    </>
  );

  const additionalButtons = (
    <>
      {activeSearchBar ? (
        <button
          type="button"
          className="standardButton"
          style={{ margin: "8px" }}
          onClick={() => addSelectedPartsToMaterialList()}
        >
          <ArrowUpward />
          <span className="iconSeperation">
            Save Selected And Add To Material List
          </span>
        </button>
      ) : (
        <button
          type="button"
          className="standardGoButton"
          style={{ margin: "8px" }}
          onClick={() => addSelectedPartsToMaterialList()}
        >
          <ArrowUpward />
          <span className="iconSeperation">
            Save Selected And Add To Material List
          </span>
        </button>
      )}
      <button
        type="button"
        className="standardButton"
        style={{ margin: "8px" }}
        onClick={() => closeModalTwo()}
      >
        <Close />
        <span className="iconSeperation">Close</span>
      </button>
    </>
  );

  return (
    <div className="worksheetContainer">
      {activeSearchBar ? (
        <BasicSearchBar
          value={query}
          setValue={partsCatalogSearch}
          searchLabel={`${parts.length} Parts`}
          clearSearchQuery={clearSearchQuery}
        />
      ) : (
        <BasicDisabledSearchBar
          value={query}
          searchLabel={`${parts.length} Parts`}
        />
      )}
      <BasicTable
        tableHead={tableHead}
        tableBody={query === "" ? emptySearchBody : searchBody}
        height={"400px"}
        additionalButtons={additionalButtons}
      />
    </div>
  );
};

export default JobMaterialPicker;
