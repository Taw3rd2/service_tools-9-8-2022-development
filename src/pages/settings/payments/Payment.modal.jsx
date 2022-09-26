import React, { useContext, useState } from "react";
import { getFirestore, collection, doc } from "firebase/firestore";
import { ToastContext } from "../../../context/toastContext";

import {
  createUnNamedDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import {
  Backdrop,
  Button,
  Fade,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { ArrowUpward, Close } from "@mui/icons-material";

import { ThemeProvider } from "@mui/material";
import { lightTheme } from "../../../theme/Theme";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  backgroundColor: lightTheme.palette.background.paper,
  border: "2px solid #000",
  boxShadow: 24,
  padding: "16px",
};

const Payment = ({ isPaymentModalOpen, closePaymentModal, payment }) => {
  const { dispatch } = useContext(ToastContext);
  const db = getFirestore();

  const [item, setItem] = useState(payment ? payment.item : "");

  const onSubmit = (e) => {
    e.preventDefault();
    const data = { item };
    if (payment) {
      console.log("payment item: ", item);
      updateDocument(doc(db, "payments", payment.id), data)
        .then(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "SUCCESS",
              title: "Update Payment",
              message: "Payment items updated in the cloud",
            },
          });
          closePaymentModal();
        })
        .catch((error) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "ERROR",
              title: "Update Payment",
              message: "There was an error updating",
            },
          });
          console.log("Firebase error: ", error);
        });
    } else {
      createUnNamedDocument(collection(db, "payments"), data)
        .then(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "SUCCESS",
              title: "Add Payment Item",
              message: "Payment items added in the cloud",
            },
          });
          closePaymentModal();
        })
        .catch((error) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedDateAndTime(new Date()),
              type: "ERROR",
              title: "Adde Payment Item",
              message: "There was a error adding payment item",
            },
          });
          console.log("Firebase error: ", error);
        });
    }
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <Modal
        aria-labelledby="payment-modal"
        aria-describedby="modal for payment edits"
        open={isPaymentModalOpen}
        onClose={closePaymentModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}
      >
        <Fade in={isPaymentModalOpen}>
          <div style={style}>
            <Grid2 container spacing={2}>
              <Grid2 xs={12}>
                <Typography variant="h5" color="primary">
                  {payment ? `Edit Payment ${payment.item}` : "New Payment"}
                </Typography>
              </Grid2>
            </Grid2>
            <form onSubmit={onSubmit} autoComplete="new password">
              <Grid2 container spacing={2} sc={{ marginTop: "8px" }}>
                <Grid2 xs={12}>
                  <TextField
                    label="Payment Type"
                    value={item}
                    fullWidth
                    color="primary"
                    sx={{ marginTop: "16px" }}
                    onChange={(event) => setItem(event.target.value)}
                    required
                  />
                </Grid2>
              </Grid2>
              <Grid2
                container
                alignItems="flex-start"
                justifyContent="flex-end"
                direction="row"
                sx={{ marginTop: "24px" }}
              >
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="submit"
                  variant="outlined"
                  startIcon={<ArrowUpward />}
                >
                  Submit
                </Button>
                <Button
                  sx={{
                    marginLeft: "8px",
                  }}
                  color="primary"
                  type="button"
                  variant="outlined"
                  onClick={() => closePaymentModal()}
                  startIcon={<Close />}
                >
                  Close
                </Button>
              </Grid2>
            </form>
          </div>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default Payment;
