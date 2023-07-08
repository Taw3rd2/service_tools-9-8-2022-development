import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { toCurrency } from "../../../utilities/currencyUtils";

const Totals = ({
  quoteValues,
  getTotalLabor,
  getTotalPartsCost,
  getTotalPartsTax,
  getTotalCustomerCost,
  getMaintenance,
  getRediagnostic,
  getShipping,
  getDiscount,
  getTotalQuote,
  setQuoteValues,
  getSubtotal,
}) => {
  // console.log("getTotalLabor", getTotalLabor());
  // console.log("getTotalPartsCost", getTotalPartsCost()); //incorrect
  // console.log("getTotalPartsTax", getTotalPartsTax());
  // console.log("getTotalCustomerCost", getTotalCustomerCost());
  // console.log("getMaintenance", getMaintenance());
  // console.log("getRediagnostic", getRediagnostic());
  // console.log("getShipping", getShipping());
  // console.log("getDiscount", getDiscount());
  // console.log("getTotalQuote", getTotalQuote());
  // console.log("getSubTotal", getSubtotal());

  return (
    <div>
      <div className="row">
        <div className="singleRowInput">
          <div className="columnHeaderText">Totals</div>
        </div>
      </div>
      <div className="smallRow" style={{ alignItems: "center" }}>
        <div className="tripleRowInput">Add Rediagnostic</div>
        <div className="tripleRowInput">
          <Switch
            checked={quoteValues.addRediagnostic}
            onChange={(e) =>
              setQuoteValues({
                ...quoteValues,
                addRediagnostic: e.target.checked,
              })
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <div className="tripleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getRediagnostic() / 100)}
        </div>
      </div>
      <div className="smallRow" style={{ alignItems: "center" }}>
        <div className="tripleRowInput">Add Maintenance</div>
        <div className="tripleRowInput">
          <Switch
            checked={quoteValues.addMaintenance}
            onChange={(e) =>
              setQuoteValues({
                ...quoteValues,
                addMaintenance: e.target.checked,
              })
            }
            inputProps={{ "aria-label": "controlled" }}
          />
        </div>
        <div className="tripleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getMaintenance() / 100)}
        </div>
      </div>
      <div className="smallRow">
        <div className="doubleRowInput">
          <div>Total Labor:</div>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getTotalLabor() / 100)}
        </div>
      </div>
      <div className="smallRow">
        <div className="doubleRowInput">
          <div>Total Material:</div>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getTotalPartsCost() / 100)}
        </div>
      </div>
      <div className="smallRow">
        <div className="doubleRowInput">
          <div>Total Tax:</div>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getTotalPartsTax() / 100)}
        </div>
      </div>
      <div className="smallRow">
        <div className="doubleRowInput">
          <div>Material Retail:</div>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getTotalCustomerCost() / 100)}
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <div>Subtotal:</div>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getSubtotal() / 100)}
        </div>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="doubleRowInput">
          <FormControl fullWidth>
            <InputLabel id="shipping-select-label">Shipping</InputLabel>
            <Select
              labelId="shipping-select-label"
              size="small"
              id="shipping-select"
              value={quoteValues.selectedShipping}
              label="Shipping"
              onChange={(e) =>
                setQuoteValues({
                  ...quoteValues,
                  selectedShipping: e.target.value,
                })
              }
            >
              <MenuItem value={"regular"}>Regular</MenuItem>
              <MenuItem value={"quick"}>Quick</MenuItem>
              <MenuItem value={"none"}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {toCurrency(getShipping() / 100)}
        </div>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <div className="doubleRowInput">
          <FormControl fullWidth>
            <InputLabel id="shipping-select-label">Discount</InputLabel>
            <Select
              labelId="discount-select-label"
              size="small"
              id="discount-select"
              value={quoteValues.selectedDiscount}
              label="Discount"
              onChange={(e) =>
                setQuoteValues({
                  ...quoteValues,
                  selectedDiscount: e.target.value,
                })
              }
            >
              <MenuItem value={"maintenance"}>10% Maintenance</MenuItem>
              <MenuItem value={"none"}>None</MenuItem>
            </Select>
          </FormControl>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          {`-${toCurrency(getDiscount() / 100)}`}
        </div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <strong>Total Quote:</strong>
        </div>
        <div className="doubleRowInput" style={{ textAlign: "end" }}>
          <strong>{toCurrency(getTotalQuote() / 100)}</strong>
        </div>
      </div>
    </div>
  );
};

export default Totals;
