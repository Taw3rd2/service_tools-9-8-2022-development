import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import CustomerExport from "../export_to_excel/CustomerExport";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";

import CustomerAutocomplete from "./CustomerAutocomplete.component";

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
      <Grid2 container justifyContent="center" spacing={1}>
        <Typography variant="h4" color="primary">
          Search {customers.length} Customers
        </Typography>{" "}
      </Grid2>
      <Grid2 container justifyContent="center" spacing={2}>
        <Grid2 xs={6}>
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
          <CustomerAutocomplete
            customers={customers}
            selectedSearchParameter={selectedSearchParameter}
            handleCustomerSelected={handleCustomerSelected}
          />
        </Grid2>
        <Grid2 xs={6}>
          <Stack spacing={2} direction="column">
            <Button
              sx={{
                marginTop: "73px",
              }}
              color="primary"
              variant="outlined"
              size="large"
              fullWidth
              onClick={() => openCreateCustomer()}
            >
              Add New Customer
            </Button>
            <CustomerExport customers={customers} />
          </Stack>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default CustomerSearch;
