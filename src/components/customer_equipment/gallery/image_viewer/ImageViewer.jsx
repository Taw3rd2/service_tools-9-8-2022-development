import PanAndZoomImage from "../../../pan_zoom_image/PanAndZoomImage";
import { Close, DeleteForever } from "@mui/icons-material";
import "../../../../global_style/style.css";

const ImageViewer = ({
  src,
  selectedEquipment,
  closeImageViewer,
  openDeleteGalleryImage,
}) => {
  return (
    <div style={{ backgroundColor: "teal", padding: "8px" }}>
      <div className="imageContainer">
        <PanAndZoomImage src={src.imageUrl} />
      </div>
      <div className="buttonBar">
        <button
          type="button"
          className="deleteButton"
          onClick={() => openDeleteGalleryImage(src, selectedEquipment)}
        >
          <DeleteForever />
          <span className="iconSeperation">Delete Image</span>
        </button>
        <button
          type="button"
          className="standardButton"
          onClick={() => closeImageViewer()}
        >
          <Close />
          <span className="iconSeperation">Close</span>
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
