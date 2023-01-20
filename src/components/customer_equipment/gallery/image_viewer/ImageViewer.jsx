import React, { useRef } from "react";
import PanAndZoomImage from "../../../pan_zoom_image/PanAndZoomImage";
import { useReactToPrint } from "react-to-print";
import { Close, DeleteForever, Print } from "@mui/icons-material";
import "../../../../global_style/style.css";

const ImageViewer = ({
  src,
  selectedEquipment,
  closeImageViewer,
  openDeleteGalleryImage,
}) => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log("the ref: ", componentRef.current);

  return (
    <div style={{ backgroundColor: "teal", padding: "8px" }}>
      <div className="imageContainer" ref={componentRef}>
        <PanAndZoomImage src={src.imageUrl} />
      </div>
      <div className="buttonBar">
        <button type="button" className="standardButton" onClick={handlePrint}>
          <Print />
          <span className="iconSeperation">Print</span>
        </button>

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
