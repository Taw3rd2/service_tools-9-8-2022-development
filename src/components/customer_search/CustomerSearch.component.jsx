import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import CustomerExport from "../export_to_excel/CustomerExport";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import CustomerAutocomplete from "./CustomerAutocomplete.component";

import "../../global_style/style.css";
import { AddCircleOutline } from "@mui/icons-material";

const CustomerSearch = ({ openCreateCustomer, handleCustomerSelected }) => {
  const db = getFirestore();
  const [customers, setCustomers] = useState([]);

  useEffect(
    () =>
      onSnapshot(collection(db, "customers"), (snapshot) =>
        setCustomers(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        )
      ),
    [db]
  );

  const [selectedSearchParameter, setSelectedSearchParameter] =
    useState("lastname");
  const handleSearchParameterChange = (event) => {
    setSelectedSearchParameter(event.target.value);
  };

  return (
    <div>
      <div className="containerRow">
        <div className="searchCustomers">
          Search {customers.length} Customers
        </div>
      </div>
      <div className="row">
        <div
          className="doubleRowInput"
          style={{
            margin: "0 8px",
          }}
        >
          <FormControl>
            <FormLabel id="customer_search_parameters_radio_group">
              Refine customer search
            </FormLabel>
            <RadioGroup
              row
              defaultValue="lastname"
              aria-labelledby="customer_search_parameters_radio_group"
              name="customer_search_radio_buttons_group"
              onChange={handleSearchParameterChange}
              color="primary"
            >
              <FormControlLabel
                value="lastname"
                control={<Radio color="primary" />}
                label="Last Name"
              />
              <FormControlLabel
                value="street"
                control={<Radio color="primary" />}
                label="Street"
              />
              <FormControlLabel
                value="city"
                control={<Radio color="primary" />}
                label="City"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="doubleRowInput"></div>
      </div>
      <div className="row">
        <div className="doubleRowInput">
          <CustomerAutocomplete
            customers={customers}
            selectedSearchParameter={selectedSearchParameter}
            handleCustomerSelected={handleCustomerSelected}
          />
        </div>
        <div className="doubleRowInput">
          <div className="buttonBarStack">
            <button
              type="button"
              className="standardButton"
              onClick={() => openCreateCustomer()}
              style={{ background: "white" }}
            >
              <AddCircleOutline />
              <span className="iconSeperation">Add New Customer</span>
            </button>
            <CustomerExport customers={customers} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerSearch;
