import Additions from "./Additions";

const DefaultAdditions = ({
  selectedEquipmentId,
  additions,
  setAdditions,
  openAddAdditionsToJob,
}) => {
  if (selectedEquipmentId === null) {
    return (
      <div className="worksheetDate" style={{ margin: "8px" }}>
        There is no unit selected
      </div>
    );
  } else {
    return (
      <Additions
        additions={additions}
        setAdditions={setAdditions}
        openAddAdditionsToJob={openAddAdditionsToJob}
      />
    );
  }
};

export default DefaultAdditions;
