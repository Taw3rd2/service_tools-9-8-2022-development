import { useState } from "react";
import { useSyncedNestedDocument } from "../../../firebase/firestore.utils";

import { getFormattedDate } from "../../../utilities/dateUtils";

import EquipmentGallery from "../gallery/EquipmentGallery";
import EquipmentStatistics from "../statistics/EquipmentStatistics";
import {
  BarChart,
  Camera,
  Close,
  DeleteForever,
  Edit,
} from "@mui/icons-material";
import "../../../global_style/style.css";
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

  const handleOpeningImageViewer = (fileName, url) => {
    const image = {
      id: "main",
      imageUrl: url,
      imageName: fileName,
    };
    openImageViewer(image, selectedEquipment);
  };

  return (
    <div className="equipmentDetailsContainer">
      <div className="mainContent" style={{ paddingBottom: "8px" }}>
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
              {unit.equipmentInstallDate
                ? getFormattedDate(unit.equipmentInstallDate)
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
              onClick={() =>
                handleOpeningImageViewer(
                  unit.equipmentImageFileName,
                  unit.equipmentImageDownloadUrl
                )
              }
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
        <div className="buttonBar" style={{ marginRight: "4px" }}>
          <button
            type="button"
            className="deleteButton"
            onClick={() => openDeleteCustomerEquipment(unit)}
          >
            <DeleteForever />
            <span className="iconSeperation">Delete</span>
          </button>
          <button
            type="button"
            className="standardButton"
            onClick={() => handleStatbarOpen(unit)}
          >
            <BarChart />
            <span className="iconSeperation">Stats</span>
          </button>
          <button
            type="button"
            className="standardButton"
            onClick={() => handleSidebarOpen(unit)}
          >
            <Camera />
            <span className="iconSeperation">Gallery</span>
          </button>
          <button
            type="button"
            className="standardButton"
            onClick={() => closeBasicSecondModal()}
          >
            <Close />
            <span className="iconSeperation">Close</span>
          </button>
        </div>
      </div>
      {sidebarOpen && (
        <div className="sidebar effect-1" id="equipment-gallery">
          <EquipmentGallery
            selectedEquipment={unit}
            openImageViewer={openImageViewer}
          />
        </div>
      )}
      {statbarOpen && (
        <div className="sidebar effect-2" id="equipment-statbar">
          <EquipmentStatistics
            customer={customer}
            selectedEquipment={unit}
            openEditSingleField={openEditSingleField}
          />
        </div>
      )}
    </div>
  );
};

export default CustomerEquipmentDetails;
