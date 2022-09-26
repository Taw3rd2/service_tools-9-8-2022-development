import { useContext, useState } from "react";
import { ToastContext } from "../../../context/toastContext";

import { BasicSelect } from "../../basic_components/select/BasicSelect";

import {
  submitNoteToFirestore,
  updateNoteToFirestore,
} from "../customerNoteFunctions";
import { useSyncedCollection } from "../../../firebase/firestore.utils";
import {
  getFormattedDate,
  getFormattedDateAndTime,
  getFormattedTime,
} from "../../../utilities/dateUtils";
import { ArrowUpward, Close, DeleteForever } from "@mui/icons-material";
import "../../../global_style/style.css";

const CustomerNote = ({
  customer,
  selectedNote,
  closeModalOne,
  openDeleteCustomerNote,
}) => {
  const { dispatch } = useContext(ToastContext);
  const dispatchers = useSyncedCollection("dispatchers");
  const types = [
    { name: "Phone", id: 0 },
    { name: "Note", id: 1 },
  ];

  const [isSelectOperatorMenuOpen, setSelectOperatorMenuOpen] = useState(false);
  const [isSelectTypeMenuOpen, setSelectTypeMenuOpen] = useState(false);

  const [customerNoteValues, setCustomerNoteValues] = useState({
    currentTime:
      selectedNote !== undefined
        ? selectedNote.currentTime.toDate()
        : new Date(),
    details: selectedNote !== undefined ? selectedNote.details : "",
    operator: selectedNote !== undefined ? selectedNote.operator : "Thomas",
    type: selectedNote !== undefined ? selectedNote.type : "Note",
  });

  const handleNoteChange = (prop) => (event) => {
    setCustomerNoteValues({
      ...customerNoteValues,
      [prop]: event.target.value,
    });
  };

  const handleSelectChange = (prop) => (value) => {
    setCustomerNoteValues({
      ...customerNoteValues,
      [prop]: value.name,
    });
  };

  const submitNote = (e) => {
    e.preventDefault();
    if (selectedNote !== undefined) {
      if (
        selectedNote.details === customerNoteValues.details &&
        selectedNote.operator === customerNoteValues.operator &&
        selectedNote.type === customerNoteValues.type
      ) {
        closeModalOne();
      } else {
        const updatedNote = {
          currentTime: new Date(),
          details: customerNoteValues.details,
          operator: customerNoteValues.operator,
          type: customerNoteValues.type,
        };
        updateNoteToFirestore(
          customer,
          selectedNote.id,
          updatedNote,
          activateSuccessNotification,
          activateFailureNotification,
          closeModalOne
        );
      }
    } else {
      submitNoteToFirestore(
        customer,
        customerNoteValues,
        activateSuccessNotification,
        activateFailureNotification,
        closeModalOne
      );
    }
  };

  const activateSuccessNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "SUCCESS",
        title: "Customer Note",
        message: "Customer note added in the cloud",
      },
    });
  };

  const activateFailureNotification = () => {
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: getFormattedDateAndTime(new Date()),
        type: "ERROR",
        title: "Customer Note",
        message: "There was an error updating",
      },
    });
  };

  return (
    <div className="container" style={{ width: "100%" }}>
      <div
        className="time"
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "22px",
        }}
      >
        {selectedNote !== undefined
          ? getFormattedDateAndTime(selectedNote.currentTime)
          : `${getFormattedDate(new Date())} ${getFormattedTime(new Date())}`}
      </div>
      <div
        className="typeAndOperatorRow"
        style={{
          display: "flex",
          gap: "16px",
          marginTop: "16px",
        }}
      >
        <BasicSelect
          isMenuOpen={isSelectOperatorMenuOpen}
          setMenuOpen={setSelectOperatorMenuOpen}
          menuItems={dispatchers}
          item={customerNoteValues.operator}
          setItem={handleSelectChange("operator")}
        />
        <BasicSelect
          isMenuOpen={isSelectTypeMenuOpen}
          setMenuOpen={setSelectTypeMenuOpen}
          menuItems={types}
          item={customerNoteValues.type}
          setItem={handleSelectChange("type")}
        />
      </div>

      <textarea
        className="textarea"
        placeholder="Notes"
        value={customerNoteValues.details}
        onChange={handleNoteChange("details")}
      />

      <div className="buttonBar">
        {selectedNote !== undefined && (
          <button
            type="button"
            className="deleteButton"
            onClick={() => openDeleteCustomerNote(selectedNote)}
          >
            <DeleteForever />
            <span className="iconSeperation">Delete</span>
          </button>
        )}
        <button
          type="button"
          className="standardButton"
          onClick={(e) => submitNote(e)}
        >
          <ArrowUpward />
          <span className="iconSeperation">Save Note</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeModalOne()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default CustomerNote;
