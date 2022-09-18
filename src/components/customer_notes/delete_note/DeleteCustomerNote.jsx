import { deleteCustomerNote } from "../customerNoteFunctions";
import { Close, DeleteForever } from "@mui/icons-material";

const DeleteCustomerNote = ({
  customer,
  selectedNote,
  closeDetails,
  closeDelete,
}) => {
  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete!</div>
      <div className="buttonBar">
        {selectedNote !== undefined && (
          <button
            type="button"
            className="deleteButton"
            onClick={() =>
              deleteCustomerNote(
                customer,
                selectedNote,
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

export default DeleteCustomerNote;
