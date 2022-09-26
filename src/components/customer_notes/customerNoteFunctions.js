import { collection, doc, getFirestore } from "firebase/firestore";
import {
  createUnNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../firebase/firestore.utils";

export const submitNoteToFirestore = (
  customer,
  note,
  activateSuccessNotification,
  activateFailureNotification,
  closeCustomerNoteModal
) => {
  const db = getFirestore();
  createUnNamedDocument(
    collection(db, "customers", customer.id, "Activity"),
    note
  )
    .then(() => {
      activateSuccessNotification();
      closeCustomerNoteModal();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("firebase error: ", error);
    });
};

export const updateNoteToFirestore = (
  customer,
  noteId,
  note,
  activateSuccessNotification,
  activateFailureNotification,
  closeCustomerNote
) => {
  const db = getFirestore();
  updateDocument(doc(db, "customers", customer.id, "Activity", noteId), note)
    .then(() => {
      activateSuccessNotification();
      closeCustomerNote();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("firebase error", error);
    });
};

export const deleteCustomerNote = (
  customer,
  selectedNote,
  activateSuccessNotification,
  activateFailureNotification,
  closeDetails,
  closeDelete
) => {
  const db = getFirestore();

  deleteDocument(doc(db, "customers", customer.id, "Activity", selectedNote.id))
    .then(() => {
      activateSuccessNotification();
      closeDetails();
      closeDelete();
    })
    .catch((error) => {
      activateFailureNotification();
      console.log("Firestore error: ", error);
    });
};
