import { collection, doc, getFirestore } from "firebase/firestore";
import {
  createUnNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../firebase/firestore.utils";

export const deleteCustomer = (
  customer,
  handleCustomerSelected,
  closeDetails,
  closeDelete
) => {
  const db = getFirestore();

  deleteDocument(doc(db, "customers", customer.id)).then(() => {
    handleCustomerSelected({ id: "" });
    closeDetails();
    closeDelete();
  });
};

export const updateCustomer = (customer, updatedValueSet, closeEditor) => {
  const db = getFirestore();

  updateDocument(doc(db, "customers", customer.id), updatedValueSet).then(() =>
    closeEditor()
  );
};

export const addCustomerToFirestore = (customer, closeModalOne) => {
  const db = getFirestore();
  createUnNamedDocument(collection(db, "customers"), customer)
    .then(() => closeModalOne())
    .catch((error) => console.log(error));
};
