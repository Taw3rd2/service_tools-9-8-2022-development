import "../../../global_style/style.css";

const ModalTwo = ({
  modalTwoSize,
  modalTwoTitle,
  modalTwoContent,
  closeModalTwo,
}) => {
  const onBackgroundClick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById("modalTwoContainer")) {
      closeModalTwo();
    }
  };

  return (
    <div
      className="modalContainer"
      id="modalTwoContainer"
      style={{ zIndex: 20 }}
      onClick={(e) => onBackgroundClick(e)}
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal" style={{ width: modalTwoSize }}>
          <div className="modalTitle">{modalTwoTitle}</div>
          <div className="modalContent">{modalTwoContent}</div>
        </div>
      </div>
    </div>
  );
};

export default ModalTwo;
