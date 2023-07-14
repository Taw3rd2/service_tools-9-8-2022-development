import { doc } from "firebase/firestore";
import { db, deleteDocument } from "../../firebase/firestore.utils";

export const deletePartsQuote = (customer, partsQuote, closeDeleteModals) => {
  deleteDocument(
    doc(db, "customers", customer.id, "partsQuotes", partsQuote.id)
  ).then(() => {
    console.log("Quote Deleted");
    closeDeleteModals();
  });
};
