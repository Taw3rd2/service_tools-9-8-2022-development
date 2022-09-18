import "../../../global_style/style.css";

const ModalFour = ({
  modalFourSize,
  modalFourTitle,
  modalFourContent,
  closeModalFour,
}) => {
  const onBackgroundClick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById("modalFourContainer")) {
      closeModalFour();
    }
  };

  return (
    <div
      className="modalContainer"
      id="modalFourContainer"
      style={{ zIndex: 40 }}
      onClick={(e) => onBackgroundClick(e)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal" style={{ width: modalFourSize }}>
          <div className="modalTitle">{modalFourTitle}</div>
          <div className="modalContent">{modalFourContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalFour;
