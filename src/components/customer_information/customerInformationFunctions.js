import { collection, doc, getFirestore } from "firebase/firestore";
import {
  createUnNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../firebase/firestore.utils";

export const deleteCustomer = (
  customer,
  handleCustomerSelected,
  activateCreateCompletionNotification,
  activateCreateFailureNotification,
  closeDetails,
  closeDelete
) => {
  const db = getFirestore();

  deleteDocument(doc(db, "customers", customer.id))
    .then(() => {
      handleCustomerSelected({ id: "" });
      activateCreateCompletionNotification();
      closeDetails();
      closeDelete();
    })
    .catch((error) => {
      activateCreateFailureNotification();
      console.log("Delete Customer Error: ", error);
    });
};

export const updateCustomer = (
  customer,
  updatedValueSet,
  activateUpdateSuccessNotification,
  activateUpateFailureNotification,
  closeEditor
) => {
  const db = getFirestore();

  updateDocument(doc(db, "customers", customer.id), updatedValueSet)
    .then(() => {
      activateUpdateSuccessNotification();
      closeEditor();
    })
    .catch((error) => {
      activateUpateFailureNotification();
      console.log("Update Failure: ", error);
    });
};

export const addCustomerToFirestore = (
  customer,
  activateCreateCompletionNotification,
  activateCreateFailureNotification,
  closeModalOne
) => {
  const db = getFirestore();

  createUnNamedDocument(collection(db, "customers"), customer)
    .then(() => {
      activateCreateCompletionNotification();
      closeModalOne();
    })
    .catch((error) => {
      activateCreateFailureNotification();
      console.log(error);
    });
};
