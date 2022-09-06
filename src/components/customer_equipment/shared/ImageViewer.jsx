import PanAndZoomImage from "../../pan_zoom_image/PanAndZoomImage";
import { Close, DeleteForever } from "@mui/icons-material";
import "./ImageViewer.css";

const ImageViewer = ({ src, closeImageViewer }) => {
  return (
    <div className="main">
      <div className="imageContainer">
        <PanAndZoomImage src={src} />
      </div>
      <div className="buttonRow">
        <button className="deleteButton">
          <DeleteForever /> Delete
        </button>
        <button className="standardButton" onClick={() => closeImageViewer()}>
          <Close /> Close
        </button>
      </div>
    </div>
  );
};

export default ImageViewer;
