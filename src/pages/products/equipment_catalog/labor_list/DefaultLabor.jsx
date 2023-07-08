import Labor from "./Labor";

const DefaultLabor = ({
  selectedEquipmentId,
  labor,
  setLabor,
  openAddLaborToJob,
}) => {
  if (selectedEquipmentId === null) {
    return (
      <div className="worksheetDate" style={{ margin: "8px" }}>
        There is no unit selected
      </div>
    );
  } else {
    return (
      <Labor
        selectedEquipmentId={selectedEquipmentId}
        labor={labor}
        setLabor={setLabor}
        openAddLaborToJob={openAddLaborToJob}
      />
    );
  }
};

export default DefaultLabor;
