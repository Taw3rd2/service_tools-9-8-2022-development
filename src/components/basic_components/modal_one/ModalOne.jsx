import "./modalOne.css";

const ModalOne = ({
  modalOneSize,
  modalOneTitle,
  modalOneContent,
  closeModalOne,
}) => {
  const onBackgroundClick = (e) => {
    e.preventDefault();
    if (e.target === document.getElementById("modalContainer")) {
      closeModalOne();
    }
  };

  return (
    <div
      className="modalContainer"
      id="modalContainer"
      onClick={(e) => onBackgroundClick(e)}
    >
      <div className="modal" style={{ width: modalOneSize }}>
        <div className="modalTitle">{modalOneTitle}</div>
        <div className="modalContent">{modalOneContent}</div>
      </div>
    </div>
  );
};

export default ModalOne;
