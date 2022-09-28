import React, { useContext } from "react";
import { ToastContext } from "../../../context/toastContext";

import { deleteMaintenance } from "../maintenanceFunctions";
import { getFormattedDateAndTime } from "../../../utilities/dateUtils";

import { Close, DeleteForever } from "@mui/icons-material";

import "../../../global_style/style.css";

const DeleteMaintenanceContent = ({
  customer,
  selectedMaintenance,
  closeDetailsModal,
  closeDeleteModal,
}) => {
  const { dispatch } = useContext(ToastContext);

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Delete Maintenance",
        message: "Removed maintenance from the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Delete Maintenance",
        message: "There was an error removing",
      },
    });
  };
  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete</div>
      <ul>
        <li>All Maintenance information for this unit</li>
      </ul>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() =>
            deleteMaintenance(
              customer,
              selectedMaintenance,
              activateSuccessNotification,
              activateFailureNotification,
              closeDetailsModal,
              closeDeleteModal
            )
          }
        >
          <DeleteForever />
          <span className="iconSeperation">Confirm Delete</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeDeleteModal()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteMaintenanceContent;
