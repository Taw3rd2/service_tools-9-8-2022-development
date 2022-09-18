import "../../../global_style/style.css";

const ModalOne = ({
  modalOneSize,
  modalOneTitle,
  modalOneContent,
  closeModalOne,
}) => {
  const onBackgroundClick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById("modalOneContainer")) {
      closeModalOne();
    }
  };

  return (
    <div
      className="modalContainer"
      id="modalOneContainer"
      style={{ zIndex: 10 }}
      onClick={(e) => onBackgroundClick(e)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal" style={{ width: modalOneSize }}>
          <div className="modalTitle">{modalOneTitle}</div>
          <div className="modalContent">{modalOneContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalOne;
