import { Edit } from "@mui/icons-material";

import "./equipmentStatistics.css";

const EquipmentStatistics = ({
  customer,
  selectedEquipment,
  openEditSingleField,
}) => {
  return (
    <div className="statistics">
      <div className="statisticsTitle">Equipment Statistics</div>
      <div className="statCards">
        <div className="warrantyCard">
          <div className="statLabel">Parts Warranty</div>
          <div className="warrantyText">
            {selectedEquipment.equipmentWarranty
              ? selectedEquipment.equipmentWarranty
              : "None On Record"}
          </div>
          <div className="statLabel">Labor Warranty</div>
          <div className="warrantyText">
            {selectedEquipment.laborWarranty
              ? selectedEquipment.laborWarranty
              : "None On Record"}
          </div>
        </div>
        <div className="maintenanceCard">
          <div className="statLabel">Maintenance Expiration</div>
          <div className="statText">
            {selectedEquipment.equipmentContract
              ? selectedEquipment.equipmentContract
              : "None On Record"}
          </div>
        </div>
      </div>
      <div className="statCards">
        <div
          className="statCard"
          onClick={() =>
            openEditSingleField(
              customer.id,
              selectedEquipment.equipmentName,
              "Fuel or Freon",
              "equipmentFuel",
              selectedEquipment.equipmentFuel
            )
          }
        >
          <div className="labelContainer">
            <div className="statLabel">Fuel or Freon</div>
            <span className="editIcon">{<Edit />}</span>
          </div>

          <div className="statText">
            {selectedEquipment.equipmentFuel
              ? selectedEquipment.equipmentFuel
              : "Not Recorded"}
          </div>
        </div>
        <div
          className="statCard"
          onClick={() =>
            openEditSingleField(
              customer.id,
              selectedEquipment.equipmentName,
              "Voltage",
              "equipmentVoltage",
              selectedEquipment.equipmentVoltage
            )
          }
        >
          <div className="labelContainer">
            <div className="statLabel">Voltage</div>
            <span className="editIcon">{<Edit />}</span>
          </div>
          <div className="statText">
            {selectedEquipment.equipmentVoltage
              ? selectedEquipment.equipmentVoltage
              : "Not Recorded"}
          </div>
        </div>
      </div>
      <div className="statCards">
        <div
          className="statCard"
          onClick={() =>
            openEditSingleField(
              customer.id,
              selectedEquipment.equipmentName,
              "Efficiency",
              "equipmentEff",
              selectedEquipment.equipmentEff
            )
          }
        >
          <div className="labelContainer">
            <div className="statLabel">Efficiency</div>
            <span className="editIcon">{<Edit />}</span>
          </div>

          <div className="statText">
            {selectedEquipment.equipmentEff
              ? selectedEquipment.equipmentEff
              : "Not Recorded"}
          </div>
        </div>
        <div
          className="statCard"
          onClick={() =>
            openEditSingleField(
              customer.id,
              selectedEquipment.equipmentName,
              "Size",
              "equipmentBtu",
              selectedEquipment.equipmentBtu
            )
          }
        >
          <div className="labelContainer">
            <div className="statLabel">Size</div>
            <span className="editIcon">{<Edit />}</span>
          </div>
          <div className="statText">
            {selectedEquipment.equipmentBtu
              ? selectedEquipment.equipmentBtu
              : "Not Recorded"}
          </div>
        </div>
      </div>
      <div className="equipmentNotesContainer">
        <div
          className="equipmentNotesCard"
          onClick={() =>
            openEditSingleField(
              customer.id,
              selectedEquipment.equipmentName,
              "Equipment Notes",
              "equipmentNotes",
              selectedEquipment.equipmentNotes
            )
          }
        >
          <div className="labelContainer">
            <div className="statLabel">Equipment Notes</div>
            <span className="editIcon">{<Edit />}</span>
          </div>

          <div className="notesText">
            {selectedEquipment.equipmentNotes
              ? selectedEquipment.equipmentNotes
              : "No Notes"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatistics;
