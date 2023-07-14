import { useContext } from "react";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firestore.utils";
import { ToastContext } from "../../../context/toastContext";
import { getFormattedExactTime } from "../../../utilities/dateUtils";
import { Close, DeleteForever } from "@mui/icons-material";
import "../../../global_style/style.css";

const DeleteDispatch = ({ selectedDispatch, closeModalOne, closeModalTwo }) => {
  const { dispatch } = useContext(ToastContext);

  const removeSecondDispatch = async () => {
    if (selectedDispatch.extendedProps.techHelperId) {
      await deleteDoc(
        doc(db, "events", selectedDispatch.extendedProps.techHelperId)
      )
        .then(() => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedExactTime(new Date()),
              type: "INFO",
              title: "Delete Helper Dispatch",
              message: "Deleted the Tech Helper Dispatch",
            },
          });
        })
        .catch((error) => {
          dispatch({
            type: "ADD_NOTIFICATION",
            payload: {
              id: getFormattedExactTime(new Date()),
              type: "ERROR",
              title: "Delete Dispatch",
              message: "There was a error removing the helper dispatch",
            },
          });
          console.log("firebbase error: ", error);
        });
    }
  };

  const removeDispatches = async () => {
    await removeSecondDispatch();
    await deleteDoc(doc(db, "events", selectedDispatch.id))
      .then(() => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedExactTime(new Date()),
            type: "SUCCESS",
            title: "Delete Dispatch",
            message: "Removed the dispatch from the cloud",
          },
        });
        closeModalTwo();
        closeModalOne();
      })
      .catch((error) => {
        dispatch({
          type: "ADD_NOTIFICATION",
          payload: {
            id: getFormattedExactTime(new Date()),
            type: "ERROR",
            title: "Delete Dispatch",
            message: "There was a error removing the dispatch",
          },
        });
        console.log("firebase error: ", error);
      });
  };

  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete!</div>
      <ul>
        <li>This will permanently remove the dispatch from the history</li>
        {selectedDispatch.extendedProps.techHelperId && (
          <div>
            <li>
              This includes{" "}
              <strong>{selectedDispatch.extendedProps.techHelper}'s</strong>{" "}
              dispatch!
            </li>
            <li>
              If you need to keep {selectedDispatch.extendedProps.techHelper}'s
              dispatch, Open the dispatch you want to keep, and set the tech
              helper to "NONE".
            </li>
          </div>
        )}
      </ul>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() => removeDispatches()}
        >
          <DeleteForever />
          <span className="iconSeperation">Confirm Delete</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeModalTwo()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default DeleteDispatch;
