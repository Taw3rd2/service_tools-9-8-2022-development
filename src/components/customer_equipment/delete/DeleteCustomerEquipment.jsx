import { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";
import { deleteCustomerEquipment } from "../customerEquipmentFunctions";
import { Close, DeleteForever } from "@mui/icons-material";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

import "../../../global_style/style.css";

const DeleteCustomerEquipment = ({
  customer,
  selectedEquipment,
  closeDetails,
  closeDelete,
}) => {
  console.log("selectedEquipment: ", selectedEquipment);
  const { dispatch } = useContext(ToastContext);

  const activateDeleteCompletionNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Equipment Delete",
        message: "Equipment was deleted from the cloud",
      },
    });
  };

  const activateDeleteFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Equipment Delete",
        message: "There was an error deleting the equipment",
      },
    });
  };

  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete</div>
      <ul>
        <li>All equipment information</li>
        <li>All equipment warranty information</li>
        <li>All equipment pictures</li>
      </ul>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() =>
            deleteCustomerEquipment(
              customer,
              selectedEquipment,
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

export default DeleteCustomerEquipment;
