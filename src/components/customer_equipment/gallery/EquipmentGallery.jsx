import "./equipmentGallery.css";

const EquipmentGallery = ({ selectedEquipment, openImageViewer }) => {
  return (
    <div className="gallery">
      <div className="galleryTitle">
        {`${selectedEquipment.equipmentName} Gallery`}
      </div>
      <div className="row">
        {selectedEquipment.equipmentGallery ? (
          selectedEquipment.equipmentGallery.length > 0 &&
          selectedEquipment.equipmentGallery.map((pic, index) => (
            <div className="column" key={index}>
              <img
                src={pic.imageUrl}
                alt="equipment"
                className="img"
                key={index}
                onClick={() => openImageViewer(pic.imageUrl)}
              />
            </div>
          ))
        ) : (
          <div className="noImageGallery">No Pictures Saved</div>
        )}
      </div>
    </div>
  );
};

export default EquipmentGallery;
