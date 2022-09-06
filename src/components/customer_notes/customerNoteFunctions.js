import { collection, doc, getFirestore } from "firebase/firestore";
import {
  createUnNamedDocument,
  deleteDocument,
  updateDocument,
} from "../../firebase/firestore.utils";

export const submitNoteToFirestore = (
  customer,
  note,
  closeCustomerNoteModal
) => {
  const db = getFirestore();
  createUnNamedDocument(
    collection(db, "customers", customer.id, "Activity"),
    note
  )
    .then(() => closeCustomerNoteModal())
    .catch((error) => console.log("firebase error: ", error));
};

export const updateNoteToFirestore = (
  customer,
  noteId,
  note,
  closeCustomerNote
) => {
  const db = getFirestore();
  console.log("current note details: ", note);
  updateDocument(doc(db, "customers", customer.id, "Activity", noteId), note)
    .then(() => closeCustomerNote())
    .catch((error) => console.log("firebase error", error));
};

export const deleteCustomerNote = (
  customer,
  selectedNote,
  closeDetails,
  closeDelete
) => {
  console.log("selectedNote: ", selectedNote);
  const db = getFirestore();

  deleteDocument(doc(db, "customers", customer.id, "Activity", selectedNote.id))
    .then(() => {
      closeDetails();
      closeDelete();
    })
    .catch((error) => console.log("Firestore error: ", error));
};
