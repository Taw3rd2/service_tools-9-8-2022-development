import { deleteCustomerNote } from "../customerNoteFunctions";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { Close, DeleteForever } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { defaultRedButton, defaultTableButton } from "../../../theme/Theme";

const DeleteCustomerNote = ({
  customer,
  selectedNote,
  closeDetails,
  closeDelete,
}) => {
  return (
    <div style={{ padding: "8px" }}>
      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="body1" gutterBottom>
            Unrecoverable Delete!
          </Typography>
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
          startIcon={<DeleteForever />}
          sx={defaultRedButton}
          onClick={() =>
            deleteCustomerNote(
              customer,
              selectedNote,
              closeDetails,
              closeDelete
            )
          }
        >
          Confirm Delete
        </Button>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<Close />}
          sx={defaultTableButton}
          onClick={() => closeDelete()}
        >
          Close
        </Button>
      </Grid2>
    </div>
  );
};

export default DeleteCustomerNote;
