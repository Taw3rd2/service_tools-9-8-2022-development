import BlankEquipmentSheet from "./BlankEquipmentSheet";
import EquipmentDetails from "./EquipmentDetails";
import PricingDetails from "../pricing_details/PricingDetails";
import DefaultAdditions from "../additions_list/DefaultAdditions";
import DefaultMaterial from "../material_list/DefaultMaterial";
import "../../../../global_style/style.css";
import DefaultLabor from "../labor_list/DefaultLabor";

const EquipmentWorksheet = ({
  selectedEquipmentId,
  selectedEquipmentValues,
  setSelectedEquipmentValues,
  clearSelectedEquipment,
  openDeleteEquipment,
  openAddMaterialList,
  openEditLaborList,
  openEditMaterialList,
  openJobMaterialPicker,
  openAddLaborToJob,
  openAddAdditionsToJob,
  openEditAdditionsList,
  material,
  setMaterial,
  labor,
  setLabor,
  additions,
  setAdditions,
}) => {
  return (
    <div>
      <div className="row">
        <div className="singleRowInput">
          <div className="worksheetTitle">Equipment Worksheet</div>
        </div>
      </div>
      <div className="row" style={{ border: "2px solid black" }}>
        <div className="singleRowInput">
          {selectedEquipmentId ? (
            <EquipmentDetails
              selectedEquipmentId={selectedEquipmentId}
              selectedEquipmentValues={selectedEquipmentValues}
              setSelectedEquipmentValues={setSelectedEquipmentValues}
              clearSelectedEquipment={clearSelectedEquipment}
              openDeleteEquipment={openDeleteEquipment}
              openAddMaterialList={openAddMaterialList}
              openEditLaborList={openEditLaborList}
              openEditMaterialList={openEditMaterialList}
              openEditAdditionsList={openEditAdditionsList}
            />
          ) : (
            <BlankEquipmentSheet />
          )}
        </div>
      </div>
      <div className="row">
        <div className="singleRowInput">
          <div className="worksheetTitle">Job Worksheet</div>
        </div>
      </div>
      <div className="row" style={{ border: "2px solid black" }}>
        <div className="singleRowInput">
          <div className="row">
            <div
              className="singleRowInput"
              style={{ marginLeft: "8px", marginRight: "8px" }}
            >
              <div className="worksheetTitle">Material List</div>
            </div>
          </div>
          <div
            className="row worksheetBorder"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          >
            <div className="singleRowInput">
              <DefaultMaterial
                selectedEquipmentId={selectedEquipmentId}
                material={material}
                setMaterial={setMaterial}
                openJobMaterialPicker={openJobMaterialPicker}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="singleRowInput"
              style={{ marginLeft: "8px", marginRight: "8px" }}
            >
              <div className="worksheetTitle">Labor List</div>
            </div>
          </div>
          <div
            className="row worksheetBorder"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          >
            <div className="singleRowInput">
              <DefaultLabor
                selectedEquipmentId={selectedEquipmentId}
                labor={labor}
                setLabor={setLabor}
                openAddLaborToJob={openAddLaborToJob}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="singleRowInput"
              style={{ marginLeft: "8px", marginRight: "8px" }}
            >
              <div className="worksheetTitle">Additions List</div>
            </div>
          </div>
          <div
            className="row worksheetBorder"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          >
            <div className="singleRowInput">
              <DefaultAdditions
                selectedEquipmentId={selectedEquipmentId}
                additions={additions}
                setAdditions={setAdditions}
                openAddAdditionsToJob={openAddAdditionsToJob}
              />
            </div>
          </div>
          <div className="row">
            <div
              className="singleRowInput"
              style={{ marginLeft: "8px", marginRight: "8px" }}
            >
              <div className="worksheetTitle">Pricing Details</div>
            </div>
          </div>
          <div
            className="row worksheetBorder"
            style={{ marginLeft: "8px", marginRight: "8px" }}
          >
            <div className="singleRowInput">
              <PricingDetails
                labor={labor}
                material={material}
                additions={additions}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EquipmentWorksheet;
