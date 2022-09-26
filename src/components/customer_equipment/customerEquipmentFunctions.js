import {
  arrayRemove,
  deleteField,
  doc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, getStorage, ref } from "firebase/storage";
import { deleteDocument } from "../../firebase/firestore.utils";

export const removeImageFromStorage = (equipmentImgName) => {
  const storage = getStorage();
  const storageRef = ref(storage);
  const customerEquipmentImages = ref(storageRef, "customerEquipmentImages");

  const equipmentPictureReference = ref(
    customerEquipmentImages,
    equipmentImgName
  );

  deleteObject(equipmentPictureReference)
    .then(() => {
      console.log("Deleted the equipment picture");
    })
    .catch((error) => {
      console.log("Firebase error: ", error);
    });
};

export const deleteEquipmentGalleryImage = async (
  customer,
  selectedEquipment,
  selectedImage,
  activateDeleteCompletionNotification,
  activateDeleteFailureNotification,
  closeImageViewer,
  closeDelete
) => {
  const db = getFirestore();
  const documentReference = doc(
    db,
    "customers",
    customer.id,
    "Equipment",
    selectedEquipment.equipmentName
  );

  if (selectedImage.id === "main") {
    await updateDoc(documentReference, {
      equipmentImageFileName: deleteField(),
      equipmentImageDownloadUrl: deleteField(),
    })
      .then(() => {
        removeImageFromStorage(selectedImage.imageName);
        activateDeleteCompletionNotification();
        closeImageViewer();
        closeDelete();
      })
      .catch((error) => {
        activateDeleteFailureNotification();
        console.log("Image Delete Error: ", error);
      });
  } else {
    await updateDoc(documentReference, {
      equipmentGallery: arrayRemove(selectedImage),
    })
      .then(() => {
        removeImageFromStorage(selectedImage.imageName);
        activateDeleteCompletionNotification();
        closeImageViewer();
        closeDelete();
      })
      .catch((error) => {
        activateDeleteFailureNotification();
        console.log("error: ", error);
      });
  }
};

export const deleteCustomerEquipment = (
  customer,
  selectedEquipment,
  activateDeleteCompletionNotification,
  activateDeleteFailureNotification,
  closeDetails,
  closeDelete
) => {
  console.log("selectedEquipment: ", selectedEquipment);

  if (selectedEquipment.equipmentImageFileName) {
    console.log("there is a equipment picture to delete");
    removeImageFromStorage(selectedEquipment.equipmentImageFileName);
  }

  const db = getFirestore();
  const documentReference = doc(
    db,
    "customers",
    customer.id,
    "Equipment",
    selectedEquipment.equipmentName
  );
  deleteDocument(documentReference)
    .then(() => {
      activateDeleteCompletionNotification();
      closeDetails();
      closeDelete();
    })
    .catch((error) => {
      activateDeleteFailureNotification();
      console.log("Firebase Error: ", error);
    });
};
