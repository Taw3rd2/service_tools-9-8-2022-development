import { useSyncedCollection } from "../../../../firebase/firestore.utils";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import "../../../../global_style/style.css";
import { Add, DeleteForever, Edit } from "@mui/icons-material";

const PaymentList = ({ openPaymentDetails, openDeletePayment }) => {
  const payments = useSyncedCollection("payments");

  return (
    <div className="settingsCard">
      <div className="settingsCardTitle">Payments</div>
      <TableContainer
        component={Paper}
        sx={{ overflow: "auto", maxHeight: 275 }}
      >
        <Table stickyHeader size="small">
          <TableHead>
            <TableRow>
              <TableCell
                align="left"
                sx={{ width: 25, fontSize: 20, fontWeight: "bold" }}
              >
                #
              </TableCell>
              <TableCell align="left" sx={{ fontSize: 20, fontWeight: "bold" }}>
                Payment
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Edit
              </TableCell>
              <TableCell
                align="center"
                sx={{ fontSize: 20, fontWeight: "bold" }}
              >
                Delete
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {payments
              .sort((a, b) => a.item.localeCompare(b.item))
              .map((payment, index) => (
                <TableRow key={payment.id} sx={{ cursor: "pointer" }}>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="left" sx={{ fontSize: 20 }}>
                    {payment.item}
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="standardButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openPaymentDetails(payment)}
                    >
                      <Edit />
                      <span className="iconSeperation">Edit</span>
                    </button>
                  </TableCell>
                  <TableCell align="center">
                    <button
                      type="button"
                      className="deleteButton"
                      style={{ margin: "0 auto" }}
                      onClick={() => openDeletePayment(payment)}
                    >
                      <DeleteForever />
                      <span className="iconSeperation">Delete</span>
                    </button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="buttonBar">
        <button
          type="button"
          className="standardButton"
          onClick={() => openPaymentDetails()}
        >
          <Add />
          <span className="iconSeperation">Add Payment</span>
        </button>
      </div>
    </div>
  );
};

export default PaymentList;
