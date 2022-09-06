import "./modalOne.css";

const ModalOne = ({ modalSize, modalTitle, modalContent, closeModalOne }) => {
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
      <div className="modal" style={{ width: modalSize }}>
        <div className="modalTitle">{modalTitle}</div>
        <div className="modalContent">{modalContent}</div>
      </div>
    </div>
  );
};

export default ModalOne;
