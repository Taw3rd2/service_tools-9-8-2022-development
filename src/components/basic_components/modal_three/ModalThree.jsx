import "../../../global_style/style.css";

const ModalThree = ({
  modalThreeSize,
  modalThreeTitle,
  modalThreeContent,
  closeModalThree,
}) => {
  const onBackgroundClick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById("modalThreeContainer")) {
      closeModalThree();
    }
  };

  return (
    <div
      className="modalContainer"
      id="modalThreeContainer"
      style={{ zIndex: 30 }}
      onClick={(e) => onBackgroundClick(e)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal" style={{ width: modalThreeSize }}>
          <div className="modalTitle">{modalThreeTitle}</div>
          <div className="modalContent">{modalThreeContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalThree;
