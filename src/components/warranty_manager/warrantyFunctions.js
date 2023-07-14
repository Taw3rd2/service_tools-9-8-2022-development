import { deleteField, doc } from "firebase/firestore";
import { db, updateDocument } from "../../firebase/firestore.utils";
import { getFormattedDate } from "../../utilities/dateUtils";

export const addWarranty = (
  customer,
  selectedEquipment,
  warrantyValues,
  equipment,
  activateSuccessNotification,
  activateFailureNotification,
  closeBasicModal
) => {
  if (selectedEquipment === undefined || selectedEquipment.length === 0) {
    alert("No Equipment Selected..");
  } else {
    Object.keys(selectedEquipment).forEach((item) => {
      const newWarr = {
        key: equipment[item].equipmentName,
        equipmentWarranty: getFormattedDate(warrantyValues.partsExpirationDate),
        laborWarranty: getFormattedDate(warrantyValues.laborExpirationDate),
        warranty: {
          key: equipment[item].equipmentName,
          jobNumber: warrantyValues.jobNumber,
          startDate: warrantyValues.startDate,
          partsExpirationDate: warrantyValues.partsExpirationDate,
          laborExpirationDate: warrantyValues.laborExpirationDate,
          equipment: equipment[item].equipmentName,
          equipmentName: equipment[item].equipmentName,
          equipmentBrand: equipment[item].equipmentBrand,
          equipmentModel: equipment[item].equipmentModel,
          equipmentSerial: equipment[item].equipmentSerial,
        },
      };
      updateDocument(
        doc(
          db,
          "customers",
          customer.id,
          "Equipment",
          equipment[item].equipmentName
        ),
        newWarr
      )
        .then(() => {
          activateSuccessNotification();
          closeBasicModal();
        })
        .catch((error) => {
          activateFailureNotification();
          console.log("Firebase Error: ", error);
        });
    });
  }
};

export const updateWarranty = (
  customer,
  warrantyValues,
  activateSuccessNotification,
  activateFailureNotification,
  closeModal
) => {
  console.log("updatedWarranty: ", warrantyValues);
  updateDocument(
    doc(db, "customers", customer.id, "Equipment", warrantyValues.key),
    warrantyValues
  )
    .then(() => {
      activateSuccessNotification();
      closeModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("Firebase error: ", error);
    });
};

export const deleteWarranty = (
  customer,
  selectedWarranty,
  activateSuccessNotification,
  activateFailureNotification,
  closeDetails,
  closeDelete
) => {
  console.log("selectedWarranty", selectedWarranty);

  updateDocument(
    doc(
      db,
      "customers",
      customer.id,
      "Equipment",
      selectedWarranty.equipmentName
    ),
    { equipmentWarranty: "", laborWarranty: "", warranty: deleteField() }
  )
    .then(() => {
      activateSuccessNotification();
      console.log("Removed String Representations, and Objects");
      closeDelete();
      closeDetails();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("Firebase Error: ", error);
    });
};
