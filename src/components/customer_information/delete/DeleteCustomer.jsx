import { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";
import { deleteCustomer } from "../customerInformationFunctions";
import { Close, DeleteForever } from "@mui/icons-material";
import "../../../global_style/style.css";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

const DeleteCustomer = ({
  customer,
  handleCustomerSelected,
  closeDetails,
  closeDelete,
}) => {
  const { dispatch } = useContext(ToastContext);

  const activateDeleteCompletionNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Delete Customer",
        message: "Customer was removed from the cloud",
      },
    });
  };

  const activateDeleteFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Delete Customer",
        message: "There was an error deleting the customer",
      },
    });
  };

  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete</div>
      <ul>
        <li>All customer information</li>
        <li>All customer equipment</li>
        <li>All customer warranty information</li>
        <li>All customer maintenance information</li>
        <li>All customer equipment pictures</li>
      </ul>
      <div className="buttonBar">
        {customer !== undefined && (
          <button
            type="button"
            className="deleteButton"
            onClick={() =>
              deleteCustomer(
                customer,
                handleCustomerSelected,
                activateDeleteCompletionNotification,
                activateDeleteFailureNotification,
                closeDetails,
                closeDelete
              )
            }
          >
            <DeleteForever />
            <span className="iconSeperation">Confirm Unrecoverable Delete</span>
          </button>
        )}
        <button
          type="button"
          className="standardButton"
          onClick={() => closeDelete()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteCustomer;
