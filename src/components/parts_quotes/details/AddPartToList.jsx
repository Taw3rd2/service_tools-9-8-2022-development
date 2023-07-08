import { ArrowUpward, Close } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

const AddPartToList = ({ quoteValues, setQuoteValues, closeModalOne }) => {
  const [partValues, setPartValues] = useState({
    quantity: 1,
    partNumber: "",
    partDescription: "",
    partVendor: "",
    vendorContact: "",
    partCost: 0.0,
  });

  const handlePartValueChange = (prop) => (event) => {
    setPartValues({ ...partValues, [prop]: event.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const newPart = {
      quantity: partValues.quantity,
      partNumber: partValues.partNumber,
      partDescription: partValues.partDescription,
      partVendor: partValues.partVendor,
      vendorContact: partValues.vendorContact,
      partCost: partValues.partCost,
    };
    const newPartsList = quoteValues.partsList;
    newPartsList.push(newPart);
    setQuoteValues({ ...quoteValues, partsList: newPartsList });
    closeModalOne();
  };

  return (
    <form onSubmit={onSubmit} autoComplete="new password">
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            label="Quantity"
            type="number"
            fullWidth
            value={partValues.quantity}
            onChange={handlePartValueChange("quantity")}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Part Number"
            type="text"
            fullWidth
            value={partValues.partNumber}
            onChange={handlePartValueChange("partNumber")}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Description"
            type="text"
            fullWidth
            value={partValues.partDescription}
            onChange={handlePartValueChange("partDescription")}
          />
        </div>
      </div>
      <div className="row">
        <div className="tripleRowInput">
          <TextField
            label="Vendor"
            fullWidth
            value={partValues.partVendor}
            onChange={handlePartValueChange("partVendor")}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Contact"
            fullWidth
            value={partValues.vendorContact}
            onChange={handlePartValueChange("vendorContact")}
          />
        </div>
        <div className="tripleRowInput">
          <TextField
            label="Cost"
            type="number"
            fullWidth
            value={partValues.partCost}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            onChange={handlePartValueChange("partCost")}
          />
        </div>
      </div>
      <div className="buttonBar">
        <button type="submit" className="standardButton">
          <ArrowUpward />
          <span className="iconSeperation">Submit</span>
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
    </form>
  );
};

export default AddPartToList;
