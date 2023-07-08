import { doc, getFirestore } from "firebase/firestore";
import {
  deleteDocument,
  updateDocument,
} from "../../../firebase/firestore.utils";

export const deleteMaintenance = (
  selectedMaintenance,
  unit,
  activateSuccessNotification,
  activateFailureNotification,
  closeDetailsModal,
  closeDeleteModal
) => {
  const db = getFirestore();

  //android
  updateDocument(
    doc(
      db,
      "customers",
      selectedMaintenance.customerId,
      "Equipment",
      unit.equipmentName
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

  deleteDocument(doc(db, "maintenance", selectedMaintenance.id))
    .then(() => {
      activateSuccessNotification();
      closeDeleteModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log(error);
    });
};
