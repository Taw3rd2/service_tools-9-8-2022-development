import { Close, DeleteForever } from "@mui/icons-material";
import "../../../../global_style/style.css";
import { deleteEquipmentGalleryImage } from "../../customerEquipmentFunctions";

const DeleteGalleryImage = ({
  customer,
  selectedEquipment,
  selectedImage,
  closeImageViewer,
  closeDelete,
}) => {
  const deleteSelectedGalleryImage = () => {
    deleteEquipmentGalleryImage(
      customer,
      selectedEquipment,
      selectedImage,
      closeImageViewer,
      closeDelete
    );
  };
  return (
    <div className="container">
      <div className="deleteWarningText">Unrecoverable Delete!</div>
      <div className="buttonBar">
        {selectedImage !== undefined && (
          <button
            type="button"
            className="deleteButton"
            onClick={() => deleteSelectedGalleryImage()}
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

export default DeleteGalleryImage;
