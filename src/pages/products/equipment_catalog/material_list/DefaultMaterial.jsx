import Material from "./Material";

const DefaultMaterial = ({
  selectedEquipmentId,
  material,
  setMaterial,
  openJobMaterialPicker,
}) => {
  if (selectedEquipmentId === null) {
    return (
      <div className="worksheetDate" style={{ margin: "8px" }}>
        There is no unit selected
      </div>
    );
  } else {
    return (
      <Material
        material={material}
        setMaterial={setMaterial}
        openJobMaterialPicker={openJobMaterialPicker}
      />
    );
  }
};

export default DefaultMaterial;
