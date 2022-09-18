import { Close, DeleteForever } from "@mui/icons-material";
import { deleteCustomer } from "../customerInformationFunctions";
import "../../../global_style/style.css";

const DeleteCustomer = ({
  customer,
  handleCustomerSelected,
  closeDetails,
  closeDelete,
}) => {
  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete</div>
      <div className="buttonBar">
        {customer !== undefined && (
          <button
            type="button"
            className="deleteButton"
            onClick={() =>
              deleteCustomer(
                customer,
                handleCustomerSelected,
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
