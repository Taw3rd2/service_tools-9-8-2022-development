import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
//import CustomerExport from "../export_to_excel/CustomerExport";
import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

import CustomerAutocomplete from "./CustomerAutocomplete.component";

import "../../global_style/style.css";
import { AddCircleOutline, BuildCircleOutlined } from "@mui/icons-material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

const CustomerSearch = ({
  handleCustomerSelected,
  openCreateCustomer,
  openMaintenanceList,
}) => {
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
      <Grid container spacing={2}>
        <Grid xs={6} display="flex" flexDirection="column" alignItems="center">
          <FormControl>
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
          <CustomerAutocomplete
            customers={customers}
            selectedSearchParameter={selectedSearchParameter}
            handleCustomerSelected={handleCustomerSelected}
          />
        </Grid>
        <Grid xs={6}>
          <Button
            variant="outlined"
            startIcon={<AddCircleOutline />}
            onClick={() => openCreateCustomer()}
            fullWidth
            sx={{ marginTop: "42px" }}
          >
            Add New Customer
          </Button>
          <Button
            variant="outlined"
            startIcon={<BuildCircleOutlined />}
            onClick={() => openMaintenanceList()}
            fullWidth
            sx={{ marginTop: "8px" }}
          >
            Maintenance Customer List
          </Button>
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerSearch;
