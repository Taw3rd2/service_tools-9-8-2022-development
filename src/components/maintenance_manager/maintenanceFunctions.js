import { doc, getFirestore } from "firebase/firestore";
import {
  createNamedDocument,
  updateDocument,
  deleteDocument,
} from "../../firebase/firestore.utils";
import { getFormattedDate } from "../../utilities/dateUtils";

export const addMaintenance = (
  customer,
  selectedEquipment,
  maintenanceValues,
  equipment,
  activateSuccessNotification,
  activateFailureNotification,
  closeModal
) => {
  const db = getFirestore();
  const firstUpdate = {
    equipmentContract: getFormattedDate(maintenanceValues.expirationDate),
  };

  Object.keys(selectedEquipment).forEach((item) => {
    let newMaint = {
      key: item,
      customerId: `${customer.id}`,
      customerLastName: `${customer.lastname}`,
      mNumber: `${maintenanceValues.mNumber} - ${equipment[item].equipmentName}`,
      salePrice: maintenanceValues.salePrice,
      saleDate: maintenanceValues.saleDate,
      expirationDate: maintenanceValues.expirationDate,
      completedDate: null,
      equipment: equipment[item].equipmentName,
      equipmentName: equipment[item].equipmentName,
      equipmentBrand: equipment[item].equipmentBrand,
      equipmentModel: equipment[item].equipmentModel,
      equipmentSerial: equipment[item].equipmentSerial,
    };

    updateDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Equipment",
        `${equipment[item].equipmentName}`
      ),
      firstUpdate
    )
      .then(() => console.log("Android part set"))
      .catch((error) => {
        activateFailureNotification();
        console.log("firebase error", error);
      });

    createNamedDocument(
      doc(
        db,
        "customers",
        customer.id,
        "Maintenance",
        `${maintenanceValues.mNumber} - ${equipment[item].equipmentName}`
      ),
      newMaint
    )
      .then(() => {
        activateSuccessNotification();
        console.log("Document set");
        closeModal();
      })
      .catch((error) => {
        activateFailureNotification();
        console.log("firebase error", error);
      });
  });
};

export const updateMaintenance = (
  customer,
  maintenanceValues,
  activateSuccessNotification,
  activateFailureNotification,
  closeModal
) => {
  const db = getFirestore();
  const androidUpdate = {
    equipmentContract: getFormattedDate(maintenanceValues.expirationDate),
  };
  const updatedMaintenance = {
    key: maintenanceValues.key,
    customerId: maintenanceValues.customerId,
    customerLastName: maintenanceValues.customerLastName,
    mNumber: maintenanceValues.mNumber,
    salePrice: maintenanceValues.salePrice,
    saleDate: maintenanceValues.saleDate,
    expirationDate: maintenanceValues.expirationDate,
    completedDate: maintenanceValues.completedDate,
    equipment: maintenanceValues.equipment,
    equipmentName: maintenanceValues.equipmentName,
    equipmentBrand: maintenanceValues.equipmentBrand,
    equipmentModel: maintenanceValues.equipmentModel,
    equipmentSerial: maintenanceValues.equipmentSerial,
  };

  updateDocument(
    doc(
      db,
      "customers",
      customer.id,
      "Equipment",
      maintenanceValues.equipmentName
    ),
    androidUpdate
  )
    .then(() => console.log("Android Part Updated"))
    .catch((error) => {
      activateFailureNotification();
      console.log("Android Update Error: ", error);
    });

  updateDocument(
    doc(db, "customers", customer.id, "Maintenance", maintenanceValues.mNumber),
    updatedMaintenance
  )
    .then(() => {
      activateSuccessNotification();
      console.log("Maintenance Updated");
      closeModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("Maintenance Update Error ", error);
    });
};

export const deleteMaintenance = (
  customer,
  selectedMaintenance,
  activateSuccessNotification,
  activateFailureNotification,
  closeDetailsModal,
  closeDeleteModal
) => {
  const db = getFirestore();
  updateDocument(
    doc(
      db,
      "customers",
      customer.id,
      "Equipment",
      selectedMaintenance.equipmentName
    ),
    { equipmentContract: "" }
  )
    .then(() => {
      closeDetailsModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log(error);
    });

  deleteDocument(
    doc(
      db,
      "customers",
      customer.id,
      "Maintenance",
      selectedMaintenance.mNumber
    )
  )
    .then(() => {
      activateSuccessNotification();
      closeDeleteModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log(error);
    });
};
