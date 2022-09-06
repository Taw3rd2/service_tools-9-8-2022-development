import { useSyncedNestedDocument } from "../../../firebase/firestore.utils";

import EquipmentGallery from "../gallery/EquipmentGallery";
import EquipmentStatistics from "../statistics/EquipmentStatistics";
import {
  BarChart,
  Camera,
  Close,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import { useState } from "react";

import { getFormattedDate } from "../../../utilities/dateUtils";
import "./customerEquipmentDetails.css";

const CustomerEquipmentDetails = ({
  customer,
  selectedEquipment,
  closeBasicSecondModal,
  openDeleteCustomerEquipment,
  openImageViewer,
  openEditSingleField,
}) => {
  const unit = useSyncedNestedDocument(
    "customers",
    customer.id,
    "Equipment",
    selectedEquipment.equipmentName
  );

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const handleSidebarOpen = () => {
    if (statbarOpen) {
      setStatbarOpen(false);
    }
    setSidebarOpen(!sidebarOpen);
  };

  const [statbarOpen, setStatbarOpen] = useState(false);
  const handleStatbarOpen = () => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
    setStatbarOpen(!statbarOpen);
  };

  return (
    <div className="container">
      <div className="mainContent">
        <div className="cardHeader">
          {selectedEquipment.equipmentName !== undefined && (
            <div className="avatar">
              {Array.from(selectedEquipment.equipmentName)[0]}
            </div>
          )}
          <div className="cardHeaderMiddle">
            <div className="equipmentName">
              {selectedEquipment.equipmentName}
            </div>
            <div className="installDate">
              {selectedEquipment.equipmentInstallDate
                ? getFormattedDate(selectedEquipment.equipmentInstallDate)
                : "No Install Date Set"}
            </div>
          </div>
          <div
            className="icon"
            onClick={() =>
              openEditSingleField(
                customer.id,
                unit.equipmentName,
                "Equipment Install Date",
                "equipmentInstallDate",
                unit.equipmentInstallDate
                  ? unit.equipmentInstallDate.toDate()
                  : null
              )
            }
          >
            <Edit />
          </div>
        </div>
        <div className="equipmentImage">
          {unit.equipmentImageDownloadUrl !== undefined ? (
            <img
              src={unit.equipmentImageDownloadUrl}
              alt="primary equipment"
              className="img"
              onClick={() => openImageViewer(unit.equipmentImageDownloadUrl)}
            />
          ) : (
            <div className="noImageLoaded">No Image Loaded</div>
          )}
        </div>
        <div className="equipmentBrand">{unit.equipmentBrand}</div>
        <div className="modelSerial">
          <div className="modelSerialText">
            <div className="modelSerialLabel">Equipment Model</div>
            <div className="modelSerialNumber">{unit.equipmentModel}</div>
          </div>
          <div
            className="icon"
            onClick={() =>
              openEditSingleField(
                customer.id,
                unit.equipmentName,
                "Model Number",
                "equipmentModel",
                unit.equipmentModel
              )
            }
          >
            <Edit />
          </div>
        </div>
        <div className="modelSerial">
          <div className="modelSerialText">
            <div className="modelSerialLabel">Equipment Serial</div>
            <div className="modelSerialNumber">{unit.equipmentSerial}</div>
          </div>
          <div
            className="icon"
            onClick={() =>
              openEditSingleField(
                customer.id,
                unit.equipmentName,
                "Serial Number",
                "equipmentSerial",
                unit.equipmentSerial
              )
            }
          >
            <Edit />
          </div>
        </div>
        <div className="buttonBar">
          <button
            className="deleteButton"
            onClick={() => openDeleteCustomerEquipment(unit)}
          >
            <DeleteForever /> Delete
          </button>
          <button
            className="standardButton"
            onClick={() => handleStatbarOpen(unit)}
          >
            <BarChart /> Stats
          </button>
          <button
            className="standardButton"
            onClick={() => handleSidebarOpen(unit)}
          >
            <Camera /> Gallery
          </button>
          <button
            className="standardButton"
            onClick={() => closeBasicSecondModal()}
          >
            <Close /> Close
          </button>
        </div>
      </div>
      <div
        className={sidebarOpen ? "sidebar effect-1" : "sidebarActive effect-1"}
        id="gallery-sidebar"
      >
        <EquipmentGallery
          selectedEquipment={unit}
          openImageViewer={openImageViewer}
        />
      </div>
      <div
        className={statbarOpen ? "sidebar effect-1" : "sidebarActive effect-1"}
        id="gallery-sidebar"
      >
        <EquipmentStatistics
          customer={customer}
          selectedEquipment={unit}
          openEditSingleField={openEditSingleField}
        />
      </div>
    </div>
  );
};

export default CustomerEquipmentDetails;
